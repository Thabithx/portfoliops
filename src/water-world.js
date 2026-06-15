/**
 * WATER WORLD ENGINE — Experiences Section
 * WebGL fluid-simulation with stone flicking, ripple states, project cluster transitions
 */

(function () {
  'use strict';

  /* ─── Constants ─────────────────────────────────────────────── */
  const GRID_W = 180;
  const GRID_H = 100;
  const DAMPING = 0.985;
  const RIPPLE_STATES = 4;     // 0 = intro, 1-3 = project clusters
  const FLICK_THRESHOLD = 90;  // px/s velocity to trigger ripple skip
  const RIPPLE_STRENGTH = 2.8; // wave amplitude multiplier per flick

  /* ─── State ──────────────────────────────────────────────────── */
  let canvas, gl;
  let prog, uRes, uTime, uRipples;
  let currentState = 0;
  let ripplePositions = [];   // [{x, y, t, amp}] — up to 12 at once
  let stoneEl, hintEl;
  let stoneDragX = 0, stoneDragY = 0;
  let isDragging = false;
  let dragStartX = 0, dragStartY = 0;
  let dragLastX = 0, dragLastY = 0;
  let dragVelX = 0, dragVelY = 0;
  let stoneBaseLeft = 0.5; // 0–1 normalized X position
  let stoneBaseBottom = 0.4;
  let stoneFlickPhase = false; // while animating flick
  let stoneFlickT = 0, stoneFlickDuration = 0;
  let stoneFlickStartX = 0, stoneFlickEndX = 0;
  let stoneFlickStartY = 0, stoneFlickEndY = 0;
  let stoneFlickSkipCount = 0;
  let stoneFlickSkipTs = [];

  let lastTime = 0;
  let frameId;
  let initialized = false;

  /* ─── Shaders ─────────────────────────────────────────────────── */
  const VERT_SRC = `
    attribute vec2 a_pos;
    void main(){ gl_Position = vec4(a_pos, 0.0, 1.0); }
  `;

  const FRAG_SRC = `
    precision mediump float;

    uniform vec2  u_res;
    uniform float u_time;

    // Up to 12 ripples: xy=center(0-1), z=birth_time, w=amplitude
    uniform vec4  u_ripples[12];

    // ── Sky/Water split & colors ──────────────────────────────────
    vec3 skyTop    = vec3(0.02, 0.07, 0.20);
    vec3 skyBot    = vec3(0.06, 0.18, 0.42);
    vec3 waterDeep = vec3(0.01, 0.04, 0.14);
    vec3 waterShallow = vec3(0.04, 0.12, 0.28);
    vec3 rippleCol = vec3(1.00, 0.92, 0.55); // golden glow

    // Tiny noise for shimmer
    float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }
    float noise(vec2 p){
      vec2 i = floor(p); vec2 f = fract(p);
      f = f*f*(3.0-2.0*f);
      float a = hash(i), b = hash(i+vec2(1,0)), c = hash(i+vec2(0,1)), d = hash(i+vec2(1,1));
      return mix(mix(a,b,f.x), mix(c,d,f.x), f.y);
    }

    void main(){
      vec2 uv = gl_FragCoord.xy / u_res;
      float horizonY = 0.46; // screen-space fraction where sky meets water

      // ── Sky ──────────────────────────────────────────────────────
      if(uv.y > horizonY){
        float t = (uv.y - horizonY) / (1.0 - horizonY);
        vec3 sky = mix(skyBot, skyTop, t);

        // subtle star shimmer in upper sky
        float shimmer = step(0.995, hash(floor(uv * 200.0) + u_time * 0.01));
        sky += shimmer * 0.35;

        gl_FragColor = vec4(sky, 1.0);
        return;
      }

      // ── Water ─────────────────────────────────────────────────────
      // Reflect the sky UV
      vec2 reflUV = vec2(uv.x, horizonY + (horizonY - uv.y));

      // Micro wave distortion
      float waveOffset = 0.0;
      waveOffset += 0.004 * sin(uv.x * 18.0 + u_time * 1.2);
      waveOffset += 0.002 * sin(uv.x * 35.0 - u_time * 1.8 + uv.y * 10.0);
      waveOffset += noise(uv * 12.0 + u_time * 0.25) * 0.003;

      // ── Ripples from stone ──────────────────────────────────────
      float rippleTotal = 0.0;
      float glowTotal   = 0.0;

      for(int i = 0; i < 12; i++){
        vec4 rip = u_ripples[i];
        if(rip.z < 0.0) continue;

        float age    = u_time - rip.z;
        float maxAge = 4.5;
        if(age > maxAge) continue;

        float life = 1.0 - (age / maxAge);
        float speed = 0.28;
        float radius = age * speed;

        vec2 toCenter = uv - rip.xy;
        toCenter.x   *= u_res.x / u_res.y; // aspect correct
        float dist    = length(toCenter);

        float wave = sin((dist - radius) * 80.0) * exp(-dist * 3.5) * life * rip.w;
        rippleTotal += wave * 0.018;

        // golden halo at wave front
        float front = exp(-abs(dist - radius) * 120.0);
        glowTotal  += front * life * rip.w * 0.55;
      }

      vec2 distortedUV = reflUV + vec2(waveOffset + rippleTotal, waveOffset * 0.5 + rippleTotal * 0.4);

      // Sky reflection colour (simplified)
      float skyT = clamp((distortedUV.y - horizonY) / (1.0 - horizonY), 0.0, 1.0);
      vec3 reflColor = mix(skyBot, skyTop, skyT);

      // Water base tint
      float waterDepth = 1.0 - (uv.y / horizonY);
      vec3 water = mix(waterShallow, waterDeep, waterDepth);

      // Blend reflection
      float reflStrength = 0.55 + 0.15 * rippleTotal;
      vec3 col = mix(water, reflColor, clamp(reflStrength, 0.0, 0.9));

      // Add golden ripple glow
      col = mix(col, rippleCol, clamp(glowTotal * 0.6, 0.0, 0.45));

      // Horizon shimmer line
      float horizonLine = exp(-abs(uv.y - horizonY) * 400.0);
      col += horizonLine * vec3(0.55, 0.78, 1.0) * 0.45;

      gl_FragColor = vec4(col, 1.0);
    }
  `;

  /* ─── GL helpers ─────────────────────────────────────────────── */
  function compileShader(type, src) {
    const s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
      console.error('Shader error:', gl.getShaderInfoLog(s));
    }
    return s;
  }

  function buildProgram() {
    const p = gl.createProgram();
    gl.attachShader(p, compileShader(gl.VERTEX_SHADER, VERT_SRC));
    gl.attachShader(p, compileShader(gl.FRAGMENT_SHADER, FRAG_SRC));
    gl.linkProgram(p);
    return p;
  }

  /* ─── Ripple management ──────────────────────────────────────── */
  function spawnRipple(normX, normY, amp) {
    // Water-space: mirror if in sky half
    const ry = normY > 0.46 ? 0.46 - (normY - 0.46) : normY;

    ripplePositions.push({ x: normX, y: ry, t: lastTime, amp: Math.min(amp, 3.5) });
    // keep max 12
    if (ripplePositions.length > 12) ripplePositions.shift();
  }

  /* ─── State & cluster transitions ───────────────────────────── */
  function setActiveState(n) {
    n = ((n % RIPPLE_STATES) + RIPPLE_STATES) % RIPPLE_STATES;
    currentState = n;

    // Update dots
    document.querySelectorAll('.rdot').forEach(d => {
      d.classList.toggle('active', +d.dataset.state === n);
    });

    // Update clusters
    document.querySelectorAll('.project-cluster').forEach(c => {
      c.classList.toggle('hidden', +c.dataset.state !== n);
    });
  }

  function advanceState(direction) {
    const next = (currentState + (direction >= 0 ? 1 : -1) + RIPPLE_STATES) % RIPPLE_STATES;
    setActiveState(next);
  }

  /* ─── Stone positioning helper ─────────────────────────────── */
  function applyStonePos(xNorm, yNorm) {
    if (!stoneEl) return;
    const vw = canvas.clientWidth;
    const vh = canvas.clientHeight;
    stoneEl.style.left = (xNorm * vw - 26) + 'px';
    stoneEl.style.bottom = (yNorm * vh - 26) + 'px';
    stoneEl.style.transform = 'none';
  }

  /* ─── Flick animation ──────────────────────────────────────── */
  function triggerFlick(startX, endX, startY, endY, velX) {
    const dx = endX - startX;
    // How many skips based on velocity (1–4)
    const vel = Math.abs(velX);
    const numSkips = Math.min(4, Math.max(1, Math.floor(vel / 200)));

    stoneFlickStartX = startX;
    stoneFlickEndX   = endX + dx * 0.5;
    stoneFlickStartY = startY;
    stoneFlickEndY   = startY; // roughly same height

    // Schedule skip ripples
    stoneFlickSkipTs = [];
    for (let i = 0; i < numSkips; i++) {
      stoneFlickSkipTs.push(0.15 + i * 0.22);
    }
    stoneFlickDuration = stoneFlickSkipTs[stoneFlickSkipTs.length - 1] + 0.35;
    stoneFlickT = 0;
    stoneFlickPhase = true;
    stoneFlickSkipCount = 0;

    // Advance project state
    advanceState(velX > 0 ? 1 : -1);
  }

  /* ─── Animation loop ─────────────────────────────────────────── */
  function tick(ts) {
    const dt = Math.min((ts - lastTime) * 0.001, 0.05);
    lastTime = ts;

    // Resize canvas if needed
    const dpr = window.devicePixelRatio || 1;
    const w = canvas.clientWidth  * dpr;
    const h = canvas.clientHeight * dpr;
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width  = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
    }

    // Build ripples array for uniform (padded to 12)
    const ripArr = new Float32Array(12 * 4);
    ripArr.fill(-1);
    ripplePositions.forEach((r, i) => {
      if (i >= 12) return;
      ripArr[i*4+0] = r.x;
      ripArr[i*4+1] = r.y;
      ripArr[i*4+2] = r.t;
      ripArr[i*4+3] = r.amp;
    });

    // Clean up old ripples
    ripplePositions = ripplePositions.filter(r => (lastTime - r.t) < 5.5);

    // ── Stone flick anim ──────────────────────────────────────────
    if (stoneFlickPhase) {
      stoneFlickT += dt;
      const tNorm = Math.min(stoneFlickT / stoneFlickDuration, 1.0);

      // Parabolic arc: sin for vertical bounce
      const arc = Math.sin(tNorm * Math.PI);
      const cx  = stoneFlickStartX + (stoneFlickEndX - stoneFlickStartX) * tNorm;
      const cy  = stoneFlickStartY + arc * 0.04; // tiny vertical arc in normalized

      applyStonePos(cx, cy);

      // Spawn skips
      if (stoneFlickSkipCount < stoneFlickSkipTs.length) {
        const nextSkipT = stoneFlickSkipTs[stoneFlickSkipCount];
        if (stoneFlickT >= nextSkipT) {
          // figure out normalized canvas x of stone at this moment
          const skipNorm = stoneFlickT / stoneFlickDuration;
          const skipX = stoneFlickStartX + (stoneFlickEndX - stoneFlickStartX) * skipNorm;
          const skipY = 0.44;
          spawnRipple(skipX, skipY, RIPPLE_STRENGTH);
          stoneFlickSkipCount++;
        }
      }

      if (tNorm >= 1.0) {
        stoneFlickPhase = false;
        stoneBaseLeft = stoneFlickEndX;
        stoneBaseBottom = stoneFlickEndY;
        // reset stone to center for next interaction
        setTimeout(() => {
          stoneBaseLeft   = 0.5;
          stoneBaseBottom = 0.4;
          applyStonePos(0.5, 0.4);
          if (stoneEl) {
            stoneEl.style.left   = '';
            stoneEl.style.bottom = '';
            stoneEl.style.transform = 'translateX(-50%)';
          }
        }, 900);
      }
    }

    // ── Cursor-following passive micro-ripples when dragging ──────
    // (done via drag handlers)

    // ── Draw ─────────────────────────────────────────────────────
    gl.useProgram(prog);
    gl.uniform2f(uRes, canvas.width, canvas.height);
    gl.uniform1f(uTime, ts * 0.001);
    gl.uniform4fv(uRipples, ripArr);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

    frameId = requestAnimationFrame(tick);
  }

  /* ─── Init WebGL ─────────────────────────────────────────────── */
  function initGL() {
    canvas = document.getElementById('water-canvas');
    if (!canvas) return false;
    gl = canvas.getContext('webgl', { antialias: false, alpha: false });
    if (!gl) {
      canvas.style.background = 'linear-gradient(to bottom, #060f1e 46%, #04091a 46%)';
      return false;
    }

    prog = buildProgram();
    gl.useProgram(prog);

    // Full-screen quad
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
    const posLoc = gl.getAttribLocation(prog, 'a_pos');
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    uRes    = gl.getUniformLocation(prog, 'u_res');
    uTime   = gl.getUniformLocation(prog, 'u_time');
    uRipples = gl.getUniformLocation(prog, 'u_ripples');

    return true;
  }

  /* ─── Stone drag/flick listeners ────────────────────────────── */
  function onDragStart(e) {
    if (stoneFlickPhase) return;
    isDragging = true;
    const p = e.touches ? e.touches[0] : e;
    dragStartX = p.clientX;
    dragStartY = p.clientY;
    dragLastX  = p.clientX;
    dragLastY  = p.clientY;
    dragVelX   = 0;
    dragVelY   = 0;
    if (stoneEl) stoneEl.style.transition = 'none';
    e.preventDefault();
  }

  function onDragMove(e) {
    if (!isDragging) return;
    const p = e.touches ? e.touches[0] : e;
    const vw = canvas.clientWidth;
    const vh = canvas.clientHeight;

    dragVelX = p.clientX - dragLastX;
    dragVelY = p.clientY - dragLastY;
    dragLastX = p.clientX;
    dragLastY = p.clientY;

    // Move stone with pointer
    const relX = p.clientX / vw;
    const relY = 1 - (p.clientY / vh); // flip Y (bottom=0)
    applyStonePos(relX, relY);

    // Spawn small trail ripples as stone moves over water
    if (relY < 0.5) {
      spawnRipple(relX, relY, 0.7);
    }
    e.preventDefault();
  }

  function onDragEnd(e) {
    if (!isDragging) return;
    isDragging = false;

    const vw = canvas.clientWidth;
    const totalDX = dragLastX - dragStartX;
    const totalDY = dragLastY - dragStartY;
    const velPxPerFrame = dragVelX; // per-frame delta

    // Convert to velocity px/s (approx 60fps)
    const velPxPerSec = velPxPerFrame * 60;

    // Trigger flick if velocity high enough
    if (Math.abs(velPxPerSec) > FLICK_THRESHOLD) {
      const fromX = dragStartX / vw;
      const toX   = Math.max(0.02, Math.min(0.98, dragLastX / vw));
      const fromY = 0.42;
      const toY   = 0.42;
      triggerFlick(fromX, toX, fromY, toY, velPxPerSec);
    } else {
      // Gentle drop — just a small ripple, return stone
      const dropX = dragLastX / vw;
      const dropY = 1 - dragLastY / canvas.clientHeight;
      spawnRipple(dropX, Math.min(dropY, 0.45), 1.0);
      if (stoneEl) {
        stoneEl.style.left   = '';
        stoneEl.style.bottom = '';
        stoneEl.style.transform = 'translateX(-50%)';
        stoneEl.style.transition = '';
      }
    }
  }

  /* ─── Public API ─────────────────────────────────────────────── */
  function start() {
    if (initialized) return;
    initialized = true;

    if (!initGL()) return;

    stoneEl = document.getElementById('spiritual-stone');
    hintEl  = document.getElementById('water-hint');

    // Register drag events on stone
    if (stoneEl) {
      stoneEl.addEventListener('mousedown',  onDragStart, { passive: false });
      stoneEl.addEventListener('touchstart', onDragStart, { passive: false });
    }
    document.addEventListener('mousemove',  onDragMove,  { passive: false });
    document.addEventListener('touchmove',  onDragMove,  { passive: false });
    document.addEventListener('mouseup',    onDragEnd,   { passive: true });
    document.addEventListener('touchend',   onDragEnd,   { passive: true });

    // Click anywhere on canvas to ripple
    const page = document.getElementById('page-experiences');
    if (page) {
      page.addEventListener('click', (e) => {
        if (isDragging || stoneFlickPhase) return;
        if (e.target.closest('[data-interactive]')) return;
        const vw = page.clientWidth;
        const vh = page.clientHeight;
        const nx = e.clientX / vw;
        const ny = 1 - e.clientY / vh;
        spawnRipple(nx, Math.min(ny, 0.45), 1.5);
      });
    }

    // Video demo CTA handler
    document.querySelectorAll('.bp-cta.video').forEach(btn => {
      btn.addEventListener('click', () => {
        const src = btn.dataset.video;
        openVideoModal(src);
      });
    });

    // Set initial state
    setActiveState(0);

    // Spawn a few ambient ripples immediately
    setTimeout(() => { spawnRipple(0.3, 0.35, 1.0); }, 400);
    setTimeout(() => { spawnRipple(0.7, 0.38, 0.8); }, 900);
    setTimeout(() => { spawnRipple(0.5, 0.32, 1.2); }, 1500);

    frameId = requestAnimationFrame(tick);
  }

  function stop() {
    if (frameId) cancelAnimationFrame(frameId);
    initialized = false;
    ripplePositions = [];
    currentState = 0;
  }

  /* ─── Video modal ─────────────────────────────────────────────── */
  function openVideoModal(src) {
    const existing = document.getElementById('ww-video-modal');
    if (existing) existing.remove();

    const overlay = document.createElement('div');
    overlay.id = 'ww-video-modal';
    overlay.style.cssText = `
      position:fixed; inset:0; z-index:9999;
      background:rgba(0,0,0,0.88);
      display:flex; align-items:center; justify-content:center;
      backdrop-filter:blur(16px);
      animation:fadeInModal 0.3s ease;
    `;
    overlay.innerHTML = `
      <style>@keyframes fadeInModal{from{opacity:0;transform:scale(0.96)}to{opacity:1;transform:scale(1)}}</style>
      <video id="ww-video" src="${src}" controls autoplay
        style="max-width:90vw;max-height:80vh;border-radius:12px;
               box-shadow:0 0 60px rgba(251,191,36,0.3),0 20px 80px rgba(0,0,0,0.7);
               border:1px solid rgba(255,255,255,0.12);">
      </video>
      <button id="ww-close" aria-label="Close video"
        style="position:absolute;top:24px;right:32px;background:rgba(255,255,255,0.1);
               border:1px solid rgba(255,255,255,0.25);color:#fff;font-size:1.3rem;
               width:40px;height:40px;border-radius:50%;cursor:pointer;
               display:flex;align-items:center;justify-content:center;
               transition:background 0.2s;">×</button>
    `;
    document.body.appendChild(overlay);
    const close = () => { overlay.remove(); };
    document.getElementById('ww-close').addEventListener('click', close);
    overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
  }

  /* ─── Expose on window ────────────────────────────────────────── */
  window.WaterWorld = { start, stop, spawnRipple, setActiveState, advanceState };

})();
