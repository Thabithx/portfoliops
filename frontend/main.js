/**
 * Human-First Engineering Portfolio
 * Heavenly Sanctuary — Three.js GLB Islands Edition
 */

import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

document.addEventListener('DOMContentLoaded', () => {





  /* ─────────────────────────────────────────
     3. THREE.JS GLB ISLAND RENDERER
     Each island gets its own transparent WebGL
     canvas with the GLB model slowly spinning.
  ───────────────────────────────────────── */
  const loader = new GLTFLoader();
  // Optimize loader for faster loading
  loader.manager.itemStart('manual');

  /**
   * @param {string} canvasId  — id of the <canvas> element
   * @param {string} modelPath — path to the .glb file
   * @param {number} spinSpeed — radians per frame (default very slow)
   */
  function setupIsland(canvasId, modelPath, spinSpeed = 0.003, targetSize = 2.8) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    // Adjust target size for small devices like iPhone 17
    const isSmallDevice = window.innerWidth <= 430; // Include more devices
    const isLargePhone = window.innerWidth >= 412 && window.innerWidth <= 430; // Large phones (iPhone 13/14/15 Pro Max, S24 Ultra)
    const isMediumScreen = window.innerWidth >= 431 && window.innerWidth <= 770; // Medium screens (430-770px)
    let adjustedTargetSize = targetSize;
    if (isMediumScreen) {
      adjustedTargetSize = targetSize * 0.85; // 15% smaller for medium screens
    } else if (isLargePhone) {
      adjustedTargetSize = targetSize * 1.29; // 29% larger for large phones
    } else if (isSmallDevice) {
      adjustedTargetSize = targetSize * 1.15; // 15% larger for small devices
    }

    // Dimensions from CSS layout
    const wrap = canvas.parentElement;
    const W = wrap.clientWidth  || 210;
    const H = wrap.clientHeight || 190;

    // Renderer — transparent so video shows through
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    const isMobile = window.innerWidth < 768 || navigator.maxTouchPoints > 0;
    renderer.setPixelRatio(isMobile ? Math.min(window.devicePixelRatio, 2.5) : Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);
    renderer.setClearColor(0x000000, 0); // fully transparent
    renderer.shadowMap.enabled = false;
    renderer.outputColorSpace   = THREE.SRGBColorSpace;
    renderer.toneMapping        = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.8;

    const scene  = new THREE.Scene();

    // Camera — looking down at the island at a slight angle
    const camera = new THREE.PerspectiveCamera(42, W / H, 0.1, 100);
    camera.position.set(0, 1.8, 5.8);
    camera.lookAt(0, 0, 0);

    // ── LIGHTING ──────────────────────────────
    // Bright ambient so no faces are black
    const ambient = new THREE.AmbientLight(0xffffff, 2.8);
    scene.add(ambient);

    // Main sun from above-right (warm white)
    const sun = new THREE.DirectionalLight(0xfffef0, 3.5);
    sun.position.set(4, 8, 6);
    sun.castShadow = false;
    scene.add(sun);

    // Heavenly fill from left (cool sky blue)
    const fill = new THREE.DirectionalLight(0xbae6fd, 2.0);
    fill.position.set(-5, 3, -4);
    scene.add(fill);

    // Soft bounce light from below
    const bounce = new THREE.DirectionalLight(0xe0f2fe, 0.8);
    bounce.position.set(0, -4, 2);
    scene.add(bounce);

    // ── PIVOT GROUP ───────────────────────────
    const pivotGroup = new THREE.Group();
    // Centered vertically to prevent clipping at the canvas borders
    pivotGroup.position.y = -0.5;
    scene.add(pivotGroup);



    // ── LOAD MODEL ────────────────────────────
    loader.load(
      modelPath,
      (gltf) => {
        const model = gltf.scene;

        // Auto-scale to a target world size of adjustedTargetSize units
        const box   = new THREE.Box3().setFromObject(model);
        const size  = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale  = adjustedTargetSize / maxDim;
        model.scale.setScalar(scale);

        // Re-centre model inside pivotGroup
        const box2   = new THREE.Box3().setFromObject(model);
        const centre = box2.getCenter(new THREE.Vector3());
        model.position.sub(centre);

        // Disable shadows
        model.traverse((child) => {
          if (child.isMesh) {
            child.castShadow    = false;
            child.receiveShadow = false;
            if (child.material) {
              child.material.envMapIntensity = 0.6;
            }
          }
        });

        pivotGroup.add(model);
      },
      undefined,
      (err) => console.warn(`Island model failed: ${modelPath}`, err)
    );

    // ── RENDER LOOP ───────────────────────────
    function animate() {
      requestAnimationFrame(animate);
      if (currentPage !== 'home') return; // Pause rendering when not on homepage to free up GPU resources
      pivotGroup.rotation.y += spinSpeed;
      renderer.render(scene, camera);
    }
    animate();

    // ── RESIZE ───────────────────────────────
    const ro = new ResizeObserver(() => {
      const nw = wrap.clientWidth  || W;
      const nh = wrap.clientHeight || H;
      renderer.setSize(nw, nh);
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
    });
    ro.observe(wrap);
  }

  // Load 3D models instantly without delay
  window.addEventListener('load', () => {
    setupIsland('canvas-experiences', 'src/floating_minecraft_island_medieval.glb',     0.0025, 3.8);
    setupIsland('canvas-about',       'src/hollow_knight.glb',                          0.0030, 4.2);
    setupIsland('canvas-build',       'src/hammer.glb',                                 0.0020, 3.7);
  });

  /* ─────────────────────────────────────────
     4. FLY-IN PAGE TRANSITIONS
  ───────────────────────────────────────── */
  const veil    = document.getElementById('transition-veil');
  const backBtn = document.getElementById('back-btn');
  const pages   = {
    home:        document.getElementById('page-home'),
    experiences: document.getElementById('page-experiences'),
    about:       document.getElementById('page-about'),
    build:       document.getElementById('page-build'),
  };

  let currentPage = 'home';

  function navigateTo(target, ox = 50, oy = 50) {
    if (target === 'build') {
      window.location.href = 'build.html';
      return;
    }
    if (target === currentPage) return;

    // Stop orbit carousel if leaving experiences
    if (currentPage === 'experiences' && window.OrbitCarousel) {
      window.OrbitCarousel.stop();
    }
    // Stop about physics if leaving about
    if (currentPage === 'about' && window.AboutGSAP) {
      window.AboutGSAP.stop();
    }

    veil.style.setProperty('--ox', ox + '%');
    veil.style.setProperty('--oy', oy + '%');
    veil.style.transformOrigin = `${ox}% ${oy}%`;

    veil.classList.remove('collapsing');
    veil.classList.add('expanding');

    setTimeout(() => {
      pages[currentPage].style.display = 'none';
      pages[target].style.display      = 'block';
      currentPage = target;

      backBtn.style.display = (target === 'home') ? 'none' : 'flex';

      // Start engines for specific pages
      if (target === 'experiences' && window.OrbitCarousel) {
        setTimeout(() => window.OrbitCarousel.start(), 120);
      }
      if (target === 'about' && window.AboutGSAP) {
        setTimeout(() => window.AboutGSAP.start(), 120);
      }

      veil.classList.remove('expanding');
      veil.classList.add('collapsing');

      // Clean up cinematic zoom transition classes
      const heroScene = document.querySelector('.hero-scene');
      if (heroScene) heroScene.classList.remove('transitioning');
      document.querySelectorAll('.island').forEach(isl => {
        isl.classList.remove('zooming');
        isl.style.removeProperty('--tx');
        isl.style.removeProperty('--ty');
      });
    }, 450);
  }


  document.querySelectorAll('.island').forEach(island => {
    island.addEventListener('click', () => {
      const target = island.dataset.target;
      const rect   = island.getBoundingClientRect();

      // Calculate coordinates to center the clicked island on viewport zoom
      const islandCenterX = rect.left + rect.width / 2;
      const islandCenterY = rect.top + rect.height / 2;
      const viewportCenterX = window.innerWidth / 2;
      const viewportCenterY = window.innerHeight / 2;

      const tx = viewportCenterX - islandCenterX;
      const ty = viewportCenterY - islandCenterY;

      island.style.setProperty('--tx', `${tx}px`);
      island.style.setProperty('--ty', `${ty}px`);

      // Add transitioning classes to trigger flying effect
      const heroScene = document.querySelector('.hero-scene');
      if (heroScene) heroScene.classList.add('transitioning');
      island.classList.add('zooming');

      const ox     = (islandCenterX / window.innerWidth)  * 100;
      const oy     = (islandCenterY / window.innerHeight) * 100;
      navigateTo(target, ox, oy);
    });
  });

  backBtn.addEventListener('click', () => navigateTo('home', 50, 50));

  document.getElementById('btn-success-close')?.addEventListener('click', () => {
    document.getElementById('wizard-success-card').classList.remove('visible');
    document.getElementById('wizard-card').style.display = '';
    resetWizard();
    navigateTo('home', 50, 50);
  });

  /* ─────────────────────────────────────────
     5. 3D CARD TILT
  ───────────────────────────────────────── */
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width  - 0.5;
      const y = (e.clientY - r.top)  / r.height - 0.5;
      card.style.transform =
        `perspective(1000px) rotateY(${x * 12}deg) rotateX(${-y * 9}deg) translateY(-7px) scale(1.02)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });

  /* ─────────────────────────────────────────
     6. SOUNDWAVE VISUALIZER
  ───────────────────────────────────────── */
  let swRunning = false;
  function initSoundWave() {
    if (swRunning) return;
    swRunning = true;
    const canvas = document.getElementById('soundwaves-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let t = 0;
    const lines = [
      { amp: 22, freq: 0.06, phase: 0,   color: 'rgba(56,189,248,0.80)', lw: 2   },
      { amp: 14, freq: 0.09, phase: 1.2, color: 'rgba(186,230,253,0.55)', lw: 1.5 },
      { amp: 9,  freq: 0.13, phase: 2.4, color: 'rgba(255,255,255,0.28)', lw: 1   },
    ];
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      lines.forEach(({ amp, freq, phase, color, lw }) => {
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth   = lw;
        ctx.shadowBlur  = 7;
        ctx.shadowColor = color;
        for (let x = 0; x <= canvas.width; x++) {
          const y = canvas.height / 2 + amp * Math.sin(freq * x + t + phase);
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.stroke();
      });
      t += 0.06;
      requestAnimationFrame(draw);
    }
    draw();
  }

  /* ─────────────────────────────────────────
     7. CALENDAR
  ───────────────────────────────────────── */
  let calYear  = new Date().getFullYear();
  let calMonth = new Date().getMonth();
  let selDay   = null;
  let selTime  = null;
  const MONTHS = ['January','February','March','April','May','June',
                  'July','August','September','October','November','December'];

  function renderCalendar() {
    const grid  = document.getElementById('calendar-days-grid');
    const label = document.getElementById('calendar-month-year');
    if (!grid || !label) return;
    label.textContent = `${MONTHS[calMonth]} ${calYear}`;
    const firstDay    = new Date(calYear, calMonth, 1).getDay();
    const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
    const today       = new Date();
    grid.innerHTML    = '';
    for (let i = 0; i < firstDay; i++) {
      const e = document.createElement('div');
      e.className = 'cal-day empty';
      grid.appendChild(e);
    }
    for (let d = 1; d <= daysInMonth; d++) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'cal-day available';
      btn.setAttribute('data-interactive', '');
      btn.textContent = d;
      if (d === today.getDate() && calMonth === today.getMonth() && calYear === today.getFullYear())
        btn.classList.add('today');
      if (d === selDay) btn.classList.add('selected');
      btn.addEventListener('click', () => {
        grid.querySelectorAll('.cal-day').forEach(el => el.classList.remove('selected'));
        btn.classList.add('selected');
        selDay = d;
        validateStep4();
      });
      grid.appendChild(btn);
    }
  }

  document.getElementById('prev-month')?.addEventListener('click', () => {
    if (--calMonth < 0) { calMonth = 11; calYear--; }
    selDay = null; renderCalendar();
  });
  document.getElementById('next-month')?.addEventListener('click', () => {
    if (++calMonth > 11) { calMonth = 0; calYear++; }
    selDay = null; renderCalendar();
  });
  renderCalendar();

  document.querySelectorAll('.time-slot').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.time-slot').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selTime = btn.dataset.time;
      validateStep4();
    });
  });

  function validateStep4() {
    const email = (document.getElementById('client-email')?.value || '').trim();
    const ok    = selDay && selTime && /\S+@\S+\.\S+/.test(email);
    if (currentWizardStep === 4) setNextEnabled(ok);
  }
  document.getElementById('client-email')?.addEventListener('input', validateStep4);

  /* ─────────────────────────────────────────
     8. MULTI-STEP WIZARD
  ───────────────────────────────────────── */
  let currentWizardStep = 1;
  const TOTAL_STEPS = 4;
  const STEP_TITLES = [
    'What architecture are we bringing to life today?',
    'What is your target launch window?',
    'A note on investment and partnership.',
    "Let's schedule our discovery session.",
  ];
  const wizardData = { type: null, timeline: null, ratesOk: false };

  const progressBar   = document.getElementById('wizard-progress');
  const stepIndicator = document.getElementById('step-indicator');
  const wizardTitle   = document.getElementById('wizard-title');
  const btnNext       = document.getElementById('btn-wizard-next');
  const btnBack       = document.getElementById('btn-wizard-back');

  function setNextEnabled(v) { btnNext.disabled = !v; }

  function goToWizardStep(n) {
    document.querySelectorAll('.wizard-step').forEach(s => s.classList.remove('active'));
    document.getElementById(`wizard-step-${n}`)?.classList.add('active');
    currentWizardStep     = n;
    progressBar.style.width = `${(n / TOTAL_STEPS) * 100}%`;
    stepIndicator.textContent = `Step ${n} of ${TOTAL_STEPS}`;
    wizardTitle.textContent   = STEP_TITLES[n - 1];
    btnBack.style.visibility  = n > 1 ? 'visible' : 'hidden';
    btnNext.textContent       = n === TOTAL_STEPS ? 'Book My Session' : 'Continue';
    if (n === 1) setNextEnabled(!!wizardData.type);
    if (n === 2) setNextEnabled(!!wizardData.timeline);
    if (n === 3) setNextEnabled(wizardData.ratesOk);
    if (n === 4) { renderCalendar(); setNextEnabled(false); }
  }

  document.querySelectorAll('#wizard-step-1 .select-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('#wizard-step-1 .select-chip').forEach(c => c.classList.remove('selected'));
      chip.classList.add('selected');
      wizardData.type = chip.dataset.value;
      setNextEnabled(true);
    });
  });
  document.querySelectorAll('#wizard-step-2 .select-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('#wizard-step-2 .select-chip').forEach(c => c.classList.remove('selected'));
      chip.classList.add('selected');
      wizardData.timeline = chip.dataset.value;
      setNextEnabled(true);
    });
  });
  document.getElementById('accept-rates')?.addEventListener('change', e => {
    wizardData.ratesOk = e.target.checked;
    setNextEnabled(e.target.checked);
  });

  btnNext.addEventListener('click', () => {
    if (currentWizardStep < TOTAL_STEPS) {
      goToWizardStep(currentWizardStep + 1);
    } else {
      document.getElementById('wizard-card').style.display = 'none';
      document.getElementById('wizard-success-card').classList.add('visible');
    }
  });
  btnBack.addEventListener('click', () => {
    if (currentWizardStep > 1) goToWizardStep(currentWizardStep - 1);
  });

  function resetWizard() {
    wizardData.type = null; wizardData.timeline = null; wizardData.ratesOk = false;
    selDay = null; selTime = null;
    document.getElementById('client-email').value = '';
    document.getElementById('accept-rates').checked = false;
    document.querySelectorAll('.select-chip').forEach(c => c.classList.remove('selected'));
    document.querySelectorAll('.time-slot').forEach(c => c.classList.remove('selected'));
    goToWizardStep(1);
  }

}); // end DOMContentLoaded
