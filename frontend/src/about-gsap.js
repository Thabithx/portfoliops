/**
 * about-gsap.js
 * Interactive ID Badge with Verlet Integration Lanyard Physics
 * and Sobel Charcoal Sketch Canvas Engine
 */
(function () {
  'use strict';

  let initialized = false;
  let scrollObserver;
  let physicsAnimationFrameId;
  let charcoalAnimationFrameId;
  let canvas, ctx;
  let badge, badgeCol;
  let isDragging = false;
  let isSnapped = false;

  // Velocity tracking variables
  let lastX = 0, lastY = 0, lastTime = 0;
  let velX = 0, velY = 0;

  // ── Physics Engine (Verlet Integration) ──
  const gravity = 0.9;
  const friction = 0.92; // heavy inertia, rapid mechanical damping
  let numPoints = 12;
  let segmentLength = 22;
  let points = [];

  function initPhysics() {
    canvas = document.getElementById('lanyard-canvas');
    if (!canvas) return;
    ctx = canvas.getContext('2d');
    
    // Adjust lanyard dimensions dynamically for mobile screen sizes
    if (window.innerWidth < 768) {
      numPoints = 20;
      segmentLength = 24;
    } else {
      numPoints = 12;
      segmentLength = 22;
    }
    
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    badge = document.getElementById('gsap-card-wrapper');
    badgeCol = document.getElementById('id-badge-col');

    if (!badge || !badgeCol) {
      console.error("GSAP About elements not found in DOM.");
      return;
    }

    // Create points
    points = [];
    const rect = badgeCol.getBoundingClientRect();
    const w = rect.width || 260;
    const l = rect.left || (window.innerWidth / 4);
    const startX = l + w / 2;
    for (let i = 0; i < numPoints; i++) {
      points.push({
        x: startX,
        y: rect.top + i * segmentLength,
        oldx: startX,
        oldy: rect.top + i * segmentLength,
        pinned: i === 0
      });
    }

    startPhysicsLoop();
  }

  function updatePoints() {
    for (let i = 0; i < points.length; i++) {
      let p = points[i];
      if (p.pinned) {
        // Pin to top of the column
        if (badgeCol) {
          const rect = badgeCol.getBoundingClientRect();
          p.x = rect.left + rect.width / 2;
          p.y = rect.top;
        }
        continue;
      }

      // If last point and dragging, force it to the badge position
      if (i === points.length - 1 && isDragging) {
         const badgeRect = badge.getBoundingClientRect();
         p.x = badgeRect.left + badgeRect.width / 2;
         p.y = badgeRect.top;
         continue;
      }

      let vx = (p.x - p.oldx) * friction;
      let vy = (p.y - p.oldy) * friction;

      p.oldx = p.x;
      p.oldy = p.y;
      p.x += vx;
      p.y += vy;
      p.y += gravity;
    }
  }

  function updateConstraints() {
    for (let iter = 0; iter < 5; iter++) {
      for (let i = 0; i < points.length - 1; i++) {
        let p1 = points[i];
        let p2 = points[i + 1];

        let p1Fixed = p1.pinned;
        let p2Fixed = (i + 1 === points.length - 1 && isDragging);

        let dx = p2.x - p1.x;
        let dy = p2.y - p1.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let difference = segmentLength - distance;
        let percent = difference / distance / 2;
        let offsetX = dx * percent;
        let offsetY = dy * percent;

        if (!p1Fixed) {
          p1.x -= offsetX;
          p1.y -= offsetY;
        }
        if (!p2Fixed) {
          p2.x += offsetX;
          p2.y += offsetY;
        }
      }
    }
  }

  function renderPhysics() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    let ropeLength = points.length;

    // Pass 1: Drop Shadow
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < ropeLength; i++) {
      ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.4)';
    ctx.lineWidth = 14;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.shadowBlur = 15;
    ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
    ctx.stroke();
    
    ctx.shadowBlur = 0; // reset shadow

    // Pass 2: Base Strap (dark charcoal fabric)
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < ropeLength; i++) {
      ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.strokeStyle = '#222';
    ctx.lineWidth = 10;
    ctx.stroke();

    // Pass 3: Edge highlight (3D bevel effect)
    ctx.beginPath();
    ctx.moveTo(points[0].x - 3, points[0].y);
    for (let i = 1; i < ropeLength; i++) {
      ctx.lineTo(points[i].x - 3, points[i].y);
    }
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Pass 4: Center groove/stitching
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < ropeLength; i++) {
      ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 3]);
    ctx.stroke();
    ctx.setLineDash([]); // reset

    // Update Badge Position & Rotation if NOT dragging and NOT snapped
    if (!isDragging && !isSnapped && badge) {
      let last = points[points.length - 1];
      let prev = points[points.length - 2];
      
      let dx = last.x - prev.x;
      let dy = last.y - prev.y;
      let angle = Math.atan2(dy, dx) - Math.PI / 2;
      
      const rect = badgeCol.getBoundingClientRect();
      gsap.set(badge, {
        x: last.x - (rect.left + rect.width / 2),
        y: last.y - rect.top - 48, // Aligns card anchor perfectly with the end of the rope
        rotationZ: angle * (180 / Math.PI)
      });
    }
  }

  function startPhysicsLoop() {
    updatePoints();
    updateConstraints();
    renderPhysics();
    physicsAnimationFrameId = requestAnimationFrame(startPhysicsLoop);
  }

  // ── Swipe to Snap Physics ──
  function snapString(vx, vy) {
    isSnapped = true;
    
    // Disable draggable
    let dragInstance = Draggable.get(badge);
    if (dragInstance) dragInstance.disable();
    
    // Calculate direction of flight
    let angle = Math.atan2(vy, vx);
    let dist = 1200; // fly completely away out of frame
    let currentX = gsap.getProperty(badge, "x");
    let currentY = gsap.getProperty(badge, "y");
    let targetX = currentX + Math.cos(angle) * dist;
    let targetY = currentY + Math.sin(angle) * dist;
    
    // Fly card off-screen with rapid angular rotation
    gsap.to(badge, {
      x: targetX,
      y: targetY,
      rotationZ: (vx > 0 ? "+=720" : "-=720"),
      duration: 1.4,
      ease: "power2.out"
    });
  }

  // ── GSAP Draggable ──
  function initDraggable() {
    if (typeof Draggable !== 'undefined' && badge) {
      // Set initial position
      gsap.set(badge, { y: segmentLength * (numPoints - 1) - 48 });

      Draggable.create(badge, {
        type: "x,y",
        onPress: function() {
          isDragging = true;
          lastX = this.x;
          lastY = this.y;
          lastTime = performance.now();
          velX = 0;
          velY = 0;
          gsap.to(badge, { scale: 1.05, duration: 0.2 });
        },
        onDrag: function() {
          let now = performance.now();
          let dt = now - lastTime;
          if (dt > 0) {
            velX = (this.x - lastX) / dt;
            velY = (this.y - lastY) / dt;
          }
          lastX = this.x;
          lastY = this.y;
          lastTime = now;

          let dx = this.deltaX;
          let angle = dx * 0.5;
          gsap.to(badge, { rotationZ: angle, duration: 0.1 });
        },
        onRelease: function() {
          isDragging = false;
          gsap.to(badge, { scale: 1, duration: 0.2 });
          
          let speed = Math.sqrt(velX * velX + velY * velY); // px/ms
          if (speed > 1.5) { // 1.5px/ms threshold
            snapString(velX * 16.6, velY * 16.6);
          } else {
            // Inject velocity into the physics points
            let last = points[points.length - 1];
            last.oldx = last.x - (velX * 16.6);
            last.oldy = last.y - (velY * 16.6);
          }
        },
        onClick: function() {
          if (!isSnapped) {
            badge.classList.toggle('flipped');
          }
        }
      });
    }
  }

  // ── Abstract Charcoal Brush Canvas Engine ──
  let charcoalCanvas, charcoalCtx;
  let originalStrokes = [];
  let isProcessed = false;
  let profileImg = new Image();
  
  profileImg.onload = function() {
    processProfileImage();
  };
  profileImg.onerror = function() {
    console.warn("Profile image failed to load. Falling back to vector profile wireframe.");
    generateFallbackSketch();
    isProcessed = true;
  };
  profileImg.src = 'src/profile.png';
  
  if (profileImg.complete) {
    processProfileImage();
  }

  function processProfileImage() {
    if (isProcessed) return;
    
    try {
      // Create offscreen temp canvas for resizing/grayscaling
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = 150;
      tempCanvas.height = 230;
      const tempCtx = tempCanvas.getContext('2d');
      tempCtx.drawImage(profileImg, 0, 0, 150, 230);
      
      let imgData = tempCtx.getImageData(0, 0, 150, 230);
      let data = imgData.data;
      let width = imgData.width;
      let height = imgData.height;
      
      // 1. Grayscale
      let gray = new Float32Array(width * height);
      for (let i = 0; i < data.length; i += 4) {
        gray[i / 4] = 0.299 * data[i] + 0.587 * data[i+1] + 0.114 * data[i+2];
      }
      
      // 2. Sobel Filtering
      let edgePixels = [];
      for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {
          let gx = 
            -1 * gray[(y-1)*width + (x-1)] + 1 * gray[(y-1)*width + (x+1)] +
            -2 * gray[y*width + (x-1)]     + 2 * gray[y*width + (x+1)] +
            -1 * gray[(y+1)*width + (x-1)] + 1 * gray[(y+1)*width + (x+1)];
             
          let gy = 
            -1 * gray[(y-1)*width + (x-1)] - 2 * gray[(y-1)*width + x] - 1 * gray[(y-1)*width + (x+1)] +
             1 * gray[(y+1)*width + (x-1)] + 2 * gray[(y+1)*width + x] + 1 * gray[(y+1)*width + (x+1)];
              
          let mag = Math.sqrt(gx * gx + gy * gy);
          if (mag > 40) {
            let angle = Math.atan2(gy, gx);
            edgePixels.push({ x: x, y: y, angle: angle });
          }
        }
      }
      
      // 3. Build Organic Strokes
      originalStrokes = [];
      let step = Math.max(1, Math.floor(edgePixels.length / 1200)); // Target ~1200 strokes
      for (let i = 0; i < edgePixels.length; i += step) {
        let p = edgePixels[i];
        let strokeAngle = p.angle + Math.PI / 2;
        let len = 3 + Math.random() * 8;
        
        let r = Math.random();
        let color;
        if (r < 0.45) {
          color = `rgba(255, 255, 255, ${0.5 + Math.random() * 0.45})`;
        } else if (r < 0.8) {
          color = `rgba(203, 213, 225, ${0.4 + Math.random() * 0.4})`;
        } else {
          color = `rgba(100, 116, 139, ${0.3 + Math.random() * 0.3})`;
        }
        
        originalStrokes.push({
          x: p.x,
          y: p.y,
          angle: strokeAngle,
          len: len,
          color: color
        });
      }
      isProcessed = true;
    } catch (e) {
      console.warn("Charcoal sketch engine failed to load image data (possibly file:// protocol SecurityError). Falling back to vector profile wireframe.", e);
      generateFallbackSketch();
      isProcessed = true;
    }
  }

  function generateFallbackSketch() {
    originalStrokes = [];
    
    // Draw head contour (oval)
    for (let theta = -Math.PI/2; theta < Math.PI * 1.2; theta += 0.04) {
      let x = 75 + Math.cos(theta) * 35;
      let y = 110 + Math.sin(theta) * 50;
      originalStrokes.push({
        x: x,
        y: y,
        angle: theta + Math.PI/2,
        len: 6,
        color: 'rgba(255, 255, 255, 0.65)'
      });
    }
    
    // Draw hair line
    for (let x = 35; x <= 115; x += 3) {
      let y = 65 - Math.sin((x - 75) * 0.05) * 15 + Math.random() * 4;
      originalStrokes.push({
        x: x,
        y: y,
        angle: 0,
        len: 8,
        color: 'rgba(203, 213, 225, 0.5)'
      });
    }

    // Draw neck and shoulders
    for (let x = 40; x <= 110; x += 4) {
      let y = 160 + Math.pow(x - 75, 2) * 0.02;
      originalStrokes.push({
        x: x,
        y: y,
        angle: Math.atan2(y - 160, x - 75),
        len: 8,
        color: 'rgba(100, 116, 139, 0.45)'
      });
    }
  }

  function initCharcoalCanvas() {
    charcoalCanvas = document.getElementById('charcoal-canvas');
    if (!charcoalCanvas) return;
    charcoalCtx = charcoalCanvas.getContext('2d');
    
    const rect = charcoalCanvas.getBoundingClientRect();
    const w = rect.width || 150;
    const h = rect.height || 230;
    charcoalCanvas.width = w * window.devicePixelRatio;
    charcoalCanvas.height = h * window.devicePixelRatio;
    charcoalCtx.scale(window.devicePixelRatio, window.devicePixelRatio);
    
    startCharcoalLoop();
  }

  function renderCharcoal(time) {
    if (!charcoalCtx || !isProcessed) return;
    charcoalCtx.clearRect(0, 0, charcoalCanvas.width, charcoalCanvas.height);
    
    const rect = charcoalCanvas.getBoundingClientRect();
    let scaleX = rect.width / 150;
    let scaleY = rect.height / 230;
    
    originalStrokes.forEach(s => {
      let driftX = Math.sin(time * 0.0016 + s.x * 0.07) * 1.0;
      let driftY = Math.cos(time * 0.0016 + s.y * 0.07) * 1.0;
      
      let px = s.x * scaleX + driftX;
      let py = s.y * scaleY + driftY;
      
      let dx = Math.cos(s.angle) * (s.len / 2);
      let dy = Math.sin(s.angle) * (s.len / 2);
      
      charcoalCtx.beginPath();
      charcoalCtx.moveTo(px - dx, py - dy);
      charcoalCtx.lineTo(px + dx, py + dy);
      charcoalCtx.strokeStyle = s.color;
      charcoalCtx.lineWidth = 0.8 + Math.random() * 0.4;
      charcoalCtx.stroke();
    });
  }

  function startCharcoalLoop() {
    const time = performance.now();
    renderCharcoal(time);
    charcoalAnimationFrameId = requestAnimationFrame(startCharcoalLoop);
  }

  // ── Tool Tray ──
  const tools = [
    { name: 'Java', icon: 'java-original' },
    { name: 'JavaScript', icon: 'javascript-original' },
    { name: 'Python', icon: 'python-original' },
    { name: 'PHP', icon: 'php-original' },
    { name: 'C', icon: 'c-original' },
    { name: 'C++', icon: 'cplusplus-original' },
    { name: 'Node.js', icon: 'nodejs-original' },
    { name: 'Express', icon: 'express-original', invert: true },
    { name: 'React', icon: 'react-original' },
    { name: 'React Native', icon: 'react-original' },
    { name: 'Android Studio', icon: 'androidstudio-plain' },
    { name: 'Docker', icon: 'docker-original' },
    { name: 'Kubernetes', icon: 'kubernetes-plain' },
    { name: 'HTML', icon: 'html5-original' },
    { name: 'CSS', icon: 'css3-original' },
    { name: 'Tailwind', icon: 'tailwindcss-original' },
    { name: 'Bootstrap', icon: 'bootstrap-original' },
    { name: 'MERN', icon: 'mongodb-original' }
  ];

  function initToolTray() {
    const tray = document.getElementById('tool-tray');
    if (!tray) return;
    tray.innerHTML = '';

    tools.forEach(tool => {
      const wrap = document.createElement('div');
      wrap.className = 'tool-wrap';

      const img = document.createElement('img');
      img.src = `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${tool.icon.split('-')[0]}/${tool.icon}.svg`;
      img.alt = tool.name;
      img.className = `tool-icon${tool.invert ? ' invert-dark' : ''}`;

      const snap = document.createElement('div');
      snap.className = 'wireframe-snap';

      const tooltip = document.createElement('span');
      tooltip.className = 'tool-tooltip';
      tooltip.textContent = tool.name;

      wrap.appendChild(snap);
      wrap.appendChild(img);
      wrap.appendChild(tooltip);
      tray.appendChild(wrap);

      const isInverted = img.classList.contains('invert-dark');
      wrap.addEventListener('mouseenter', () => {
        const hoverFilter = isInverted ? 'invert(1) opacity(1)' : 'grayscale(0) opacity(1)';
        gsap.to(img, { y: -8, filter: hoverFilter, duration: 0.20 });
        
        gsap.killTweensOf(snap);
        gsap.fromTo(snap, 
          { inset: -10, opacity: 0.9 }, 
          { inset: 0, opacity: 0, duration: 0.4, ease: 'power2.out' }
        );
      });
      wrap.addEventListener('mouseleave', () => {
        const leaveFilter = isInverted ? 'grayscale(1) invert(1) opacity(0.6)' : 'grayscale(1) opacity(0.6)';
        gsap.to(img, { y: 0, filter: leaveFilter, duration: 0.25 });
      });
    });
  }

  // ── Scroll Reveals ──
  function initScrollReveals() {
    const scrollContainer = document.getElementById('about-scroll');
    if (!scrollContainer) return;

    const revealEls = scrollContainer.querySelectorAll('[data-reveal]');

    scrollObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, idx) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('revealed');
          }, idx * 120);
          scrollObserver.unobserve(entry.target);
        }
      });
    }, {
      root: scrollContainer,
      threshold: 0.05
    });

    revealEls.forEach(el => scrollObserver.observe(el));
  }

  // ── Reset Card Position & Drag on Start ──
  function resetCard() {
    isSnapped = false;
    if (badge) {
      badge.classList.remove('flipped');
      gsap.killTweensOf(badge);
      gsap.set(badge, { x: 0, y: segmentLength * (numPoints - 1) - 48, rotationZ: 0, scale: 1 });
      
      let dragInstance = Draggable.get(badge);
      if (dragInstance) dragInstance.enable();
    }
    
    if (badgeCol) {
      const rect = badgeCol.getBoundingClientRect();
      const w = rect.width || 260;
      const l = rect.left || (window.innerWidth / 4);
      const startX = l + w / 2;
      for (let i = 0; i < points.length; i++) {
        points[i].x = startX;
        points[i].y = rect.top + i * segmentLength;
        points[i].oldx = startX;
        points[i].oldy = rect.top + i * segmentLength;
      }
    }
  }

  function start() {
    if (initialized) return;
    initialized = true;

    // Re-query DOM elements since they may have been re-rendered
    badge = document.getElementById('gsap-card-wrapper');
    badgeCol = document.getElementById('id-badge-col');

    initPhysics();
    initDraggable();
    initToolTray();
    initCharcoalCanvas();
    
    resetCard();

    // Delay scroll reveals slightly to ensure layout is settled
    setTimeout(() => {
      initScrollReveals();
    }, 200);

    const textCol = document.querySelector('.about-content-pane');
    if (textCol && typeof gsap !== 'undefined') {
      gsap.fromTo(textCol, { x: 50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, delay: 0.3, ease: 'power3.out' });
    }
  }

  function stop() {
    initialized = false;
    cancelAnimationFrame(physicsAnimationFrameId);
    cancelAnimationFrame(charcoalAnimationFrameId);
    if (scrollObserver) scrollObserver.disconnect();
    
    // Kill GSAP instances to allow clean re-init
    if (badge && typeof Draggable !== 'undefined') {
      let dragInstance = Draggable.get(badge);
      if (dragInstance) dragInstance.kill();
    }
  }

  window.AboutGSAP = { start, stop };
})();

  // ── Interactive Grid ──
  const grid = document.querySelector('.blueprint-grid');
  if (grid) {
    let mouseX = 0;
    let mouseY = 0;
    let tick = false;
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!tick) {
        requestAnimationFrame(() => {
          // Small parallax movement based on mouse position
          const x = (mouseX / window.innerWidth - 0.5) * -60;
          const y = (mouseY / window.innerHeight - 0.5) * -60;
          grid.style.transform = `translate3d(${x}px, ${y}px, 0)`;
          tick = false;
        });
        tick = true;
      }
    });
  }
