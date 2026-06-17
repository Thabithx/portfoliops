/**
 * ORBIT CAROUSEL — Experiences Section
 * 3D elliptical orbit track, crystalline glass cards, inertia drag,
 * weight-bearing card flip, project detail deep-dive overlay.
 */

(function () {
  'use strict';

  /* ═══════════════════════════════════════
     DATA
  ═══════════════════════════════════════ */
  const CATEGORIES = [
    {
      id: 'ecommerce',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="32" height="32"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>`,
      title: 'Commercial\nE-Commerce Empires',
      tagline: 'Conversion at scale',
      accent: '#10b981',
      accentRgb: '16,185,129',
      accentSecondary: '#0ea5e9',
      projects: [
        {
          id: 'luzzio',
          tag: 'Fashion · Full-Stack MERN',
          name: 'Luzzio Clothing',
          desc: 'Premium fashion e-commerce platform with a React storefront, Node.js REST API, and MongoDB product catalog. Includes Stripe and PayHere checkout, Cloudinary media, JWT auth, admin order management, and Framer Motion micro-interactions for a luxury shopping experience.',
          stack: ['React (Vite)', 'Node.js', 'Express', 'MongoDB', 'Stripe', 'PayHere', 'TailwindCSS', 'Framer Motion'],
          type: 'live',
          url: 'https://luzzio.vercel.app/',
          urlLabel: 'Luzzio on Vercel',
          links: [
            { label: 'Luzzio Premium', url: 'https://luzziopremium.com' },
            { label: 'Luzzio Clothing', url: 'https://luzzioclothing.com' },
          ],
          github: 'https://github.com/Thabithx/luzzio',
          accentColor: '#10b981',
          accentRgb: '16,185,129',
        },
        {
          id: 'autoforge',
          tag: 'Automotive · 3D Commerce',
          name: 'AutoForge Vehicle Store',
          desc: 'Immersive 3D vehicle showroom where customers explore cars with interactive GLTF models powered by React Three Fiber. Includes brand and price filtering, vehicle detail pages, and a Node.js/MongoDB backend for inventory management.',
          stack: ['React Three Fiber', 'Three.js', 'React (Vite)', 'TailwindCSS', 'Node.js', 'Express', 'MongoDB'],
          type: 'image',
          github: 'https://github.com/Thabithx/autoforge',
          images: ['src/experience-previews/autoforge.png'],
          accentColor: '#10b981',
          accentRgb: '16,185,129',
        },
        {
          id: 'whiterose',
          tag: 'Organic Retail · Shopify',
          name: 'White Rose Organics',
          desc: 'Premium organic product storefront engineered for trust, speed, and retention. Built with custom Shopify Liquid components, a multi-SKU variant selector, aggressive asset optimization for sub-1s load times, and a frictionless checkout flow designed to maximize conversions.',
          stack: ['Shopify', 'Liquid', 'JavaScript', 'Speed Optimisation', 'CRO', 'A/B Testing'],
          type: 'live',
          url: 'https://whiteroseorganics.com',
          accentColor: '#10b981',
          accentRgb: '16,185,129',
        },
        {
          id: 'deskly',
          tag: 'E-Commerce · Full-Stack PHP',
          name: 'Deskly Wellness Store',
          desc: 'A full-stack e-commerce platform built for workspace wellness and ergonomics. Features custom cart management, role-based admin controls, dynamic product catalogs, and notification hubs built without complex frameworks to optimize performance.',
          stack: ['PHP 8', 'Vanilla JavaScript', 'MySQL', 'Vanilla CSS Design System', 'Glassmorphism UI'],
          type: 'live',
          github: 'https://github.com/Thabithx/deskly',
          accentColor: '#10b981',
          accentRgb: '16,185,129',
        },
        {
          id: 'clothing-store',
          tag: 'Fashion · React & Payments',
          name: 'Fashion Commerce Store',
          desc: 'Full-stack clothing storefront with product collections, cart, checkout, and order tracking. Integrates Stripe and Razorpay payment gateways, Cloudinary image uploads, JWT authentication, and a responsive React UI with search and toast notifications.',
          stack: ['React (Vite)', 'TailwindCSS', 'Node.js', 'Express', 'MongoDB', 'Stripe', 'Razorpay', 'Cloudinary'],
          type: 'live',
          accentColor: '#10b981',
          accentRgb: '16,185,129',
        },
        {
          id: 'shoe-store',
          tag: 'Footwear · TypeScript MERN',
          name: 'Allaia Shoe Store',
          desc: 'Modern shoe e-commerce app with a TypeScript React frontend and Express API backend. Built with RESTful product CRUD, MongoDB persistence, global ShopContext state, React Router pages, and TailwindCSS styling for a clean retail experience.',
          stack: ['React', 'TypeScript', 'Vite', 'TailwindCSS', 'Node.js', 'Express', 'MongoDB', 'Axios'],
          type: 'live',
          github: 'https://github.com/Thabithx/store',
          accentColor: '#10b981',
          accentRgb: '16,185,129',
        },
      ],
    },
    {
      id: 'web',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="32" height="32"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>`,
      title: 'Modern Web\nApplications',
      tagline: 'Platforms that scale',
      accent: '#0ea5e9',
      accentRgb: '14,165,233',
      accentSecondary: '#a855f7',
      projects: [
        {
          id: 'spotter',
          tag: 'Geo-Discovery · Full-Stack Web',
          name: 'Spotter Web Platform',
          desc: 'Community-driven place discovery platform with a deep black glassmorphism UI. Users discover, share, and save hidden gems via Leaflet map pinning, vibe-based filtering, real-time search, reviews with star ratings, and JWT-secured REST APIs backed by MongoDB geospatial indexing.',
          stack: ['Node.js', 'Express', 'MongoDB', 'Leaflet.js', 'JWT', 'Vanilla CSS', 'Cloudinary'],
          type: 'image',
          github: 'https://github.com/Thabithx/spotter',
          images: ['src/experience-previews/spotter-web.png'],
          accentColor: '#0ea5e9',
          accentRgb: '14,165,233',
        },
        {
          id: 'spotterapp',
          tag: 'Geo-Discovery · Android Native',
          name: 'Spotter Android App',
          desc: 'Native Android companion for discovering and sharing local places. Features Google Maps integration, Firebase Firestore and Storage, user authentication, place reviews, favorites, profile management, and OpenWeather API for location-aware experiences.',
          stack: ['Java', 'Android SDK', 'Firebase Firestore', 'Google Maps SDK', 'Material Design', 'Glide'],
          type: 'image',
          github: 'https://github.com/Thabithx/spotterapp',
          images: ['src/experience-previews/spotter-android.png'],
          accentColor: '#0ea5e9',
          accentRgb: '14,165,233',
        },
      ],
    },
    {
      id: 'ai',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="32" height="32"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>`,
      title: 'Artificial Intelligence\nSystems',
      tagline: 'Intelligence as infrastructure',
      accent: '#a855f7',
      accentRgb: '168,85,247',
      accentSecondary: '#ef4444',
      projects: [
        {
          id: 'lumio',
          tag: 'Gamified Prep · LLM',
          name: 'Lumio Prep Simulator',
          desc: 'Gamified interview simulator designed to transform technical coding and behavioral interview preparation. Built with step-by-step technical scoring roadmaps, Monaco Editor sandboxing, custom resume matchers, and OpenAI streaming response hooks.',
          stack: ['React (Vite)', 'Framer Motion', 'TailwindCSS', 'Monaco Editor', 'Node.js', 'Express', 'MongoDB', 'OpenAI API'],
          type: 'live',
          url: 'https://lumio-sable.vercel.app',
          accentColor: '#a855f7',
          accentRgb: '168,85,247',
        },
      ],
    },
    {
      id: 'infra',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="32" height="32"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>`,
      title: 'Secure Heavy-Duty\nInfrastructure',
      tagline: 'Zero-downtime. Zero-compromise.',
      accent: '#ef4444',
      accentRgb: '239,68,68',
      accentSecondary: '#10b981',
      projects: [
        {
          id: 'medicare',
          tag: 'Desktop Java · MySQL',
          name: 'Medicare Hospital Management',
          desc: 'Desktop hospital management system with a custom Smart UI engine built on Java AWT 2D graphics. Supports role-based access for admins, doctors, and receptionists with appointment scheduling, patient/doctor management, notifications, and real-time analytics reporting.',
          stack: ['Java 17', 'Java AWT & Swing', 'MySQL', 'MVC Architecture', 'Role-Based Access Control'],
          type: 'live',
          github: 'https://github.com/Thabithx/medicare',
          accentColor: '#ef4444',
          accentRgb: '239,68,68',
        },
        {
          id: 'eCitizen',
          tag: 'Digital NID · Security',
          name: 'eCitizen Platform',
          desc: 'Digital identity platform for online National ID registration. Citizens apply from home with document uploads, track application status in real time, and receive PDF IDs with embedded QR codes. Admins review applications via a centralized dashboard with healthcare benefit card issuance.',
          stack: ['Node.js', 'Express.js', 'MongoDB', 'Cloudinary', 'PDFKit', 'Bootstrap 5', 'JWT'],
          type: 'image',
          github: 'https://github.com/Thabithx/eCitizen',
          images: ['src/experience-previews/ecitizen.png'],
          accentColor: '#ef4444',
          accentRgb: '239,68,68',
        },
      ],
    },
  ];

  /* ═══════════════════════════════════════
     ORBIT MATH
     Cards sit on an ellipse:
       x = A * sin(θ)   (horizontal)
       z = B * cos(θ)   (depth, B < A → wide flat ellipse)
     θ=0 → front-centre (largest)
     θ=π → back (smallest)
  ═══════════════════════════════════════ */
  const N = CATEGORIES.length;                // 4
  const ELLIPSE_A = 420;    // horizontal half-axis (px)
  const ELLIPSE_B = 130;    // depth half-axis (px)
  const CARD_W    = 300;
  const CARD_H    = 420;

  // Auto-rotation speed (radians per second, very slow)
  const AUTO_SPEED = 0.35;
  // Snap targets: multiples of (2π/N)
  const STEP = (2 * Math.PI) / N;

  /* ═══════════════════════════════════════
     STATE
  ═══════════════════════════════════════ */
  let orbitAngle  = 0;       // current rotation angle (radians)
  let targetAngle = 0;       // snap target
  let velocity    = 0;       // drag velocity (rad/s)
  let isDragging  = false;
  let dragStartX  = 0;
  let dragLastX   = 0;
  let dragLastT   = 0;
  let autoRotate  = true;
  let autoTimer   = null;
  let flippedIdx  = -1;      // which card index is currently flipped (-1 = none)
  let initialized = false;
  let rafId       = null;
  let lastTs      = 0;

  let stage, expHeader, detailOverlay;
  let cardWraps  = [];

  /* ═══════════════════════════════════════
     DOM BUILDING
  ═══════════════════════════════════════ */
  function buildCards() {
    stage = document.getElementById('orbit-stage');
    if (!stage) return;
    stage.innerHTML = '';
    cardWraps = [];

    CATEGORIES.forEach((cat, i) => {
      const wrap = document.createElement('div');
      wrap.className = 'orbit-card-wrap';
      wrap.setAttribute('tabindex', '0');
      wrap.setAttribute('role', 'button');
      wrap.setAttribute('aria-label', `${cat.title.replace('\n', ' ')} — click to explore`);
      wrap.dataset.index = i;

      // ── Front ──────────────────────────────────────────
      const front = document.createElement('div');
      front.className = 'orbit-card orbit-card--front';

      const iconWrap = document.createElement('div');
      iconWrap.className = 'card-icon-wrap';
      iconWrap.style.background = `rgba(${cat.accentRgb},0.12)`;
      iconWrap.style.borderColor = `rgba(${cat.accentRgb},0.25)`;
      iconWrap.style.boxShadow   = `0 8px 28px rgba(${cat.accentRgb},0.18)`;
      iconWrap.innerHTML = cat.icon;

      const titleEl = document.createElement('div');
      titleEl.className = 'card-title';
      titleEl.innerHTML = cat.title.replace('\n', '<br>');

      const countEl = document.createElement('div');
      countEl.className = 'card-count';
      countEl.textContent = `${cat.projects.length} project${cat.projects.length > 1 ? 's' : ''}`;

      const hint = document.createElement('div');
      hint.className = 'card-cta-hint';
      hint.style.borderColor = `rgba(${cat.accentRgb},0.3)`;
      hint.textContent = 'Tap to explore';

      const accentLine = document.createElement('div');
      accentLine.className = 'card-accent-line';
      accentLine.style.background = `linear-gradient(90deg, transparent, ${cat.accent}, transparent)`;

      front.append(iconWrap, titleEl, countEl, hint, accentLine);

      // ── Back ───────────────────────────────────────────
      const back = document.createElement('div');
      back.className = 'orbit-card orbit-card--back';

      const backHeader = document.createElement('div');
      backHeader.className = 'card-back-header';

      const backIcon = document.createElement('span');
      backIcon.className = 'card-back-icon';
      backIcon.innerHTML = cat.icon;

      const backTitleWrap = document.createElement('div');
      const backTitle = document.createElement('div');
      backTitle.className = 'card-back-title';
      backTitle.innerHTML = cat.title.replace('\n', '<br>');
      const backSub = document.createElement('div');
      backSub.className = 'card-back-subtitle';
      backSub.textContent = cat.tagline;
      backTitleWrap.append(backTitle, backSub);
      backHeader.append(backIcon, backTitleWrap);

      const projectList = document.createElement('div');
      projectList.className = 'project-list';

      cat.projects.forEach(proj => {
        const item = document.createElement('div');
        item.className = 'project-list-item';
        item.dataset.projId = proj.id;
        item.dataset.catId  = cat.id;

        const tag = document.createElement('div');
        tag.className = 'pli-tag';
        tag.style.color = cat.accent;
        tag.textContent = proj.tag;

        const name = document.createElement('div');
        name.className = 'pli-name';
        name.textContent = proj.name;

        const arrow = document.createElement('span');
        arrow.className = 'pli-arrow';
        arrow.textContent = '→';

        item.append(tag, name, arrow);
        item.addEventListener('click', (e) => {
          e.stopPropagation();
          openDetail(cat, proj);
        });
        projectList.appendChild(item);
      });

      back.append(backHeader, projectList);
      wrap.append(front, back);

      // ── Click to flip ──────────────────────────────────
      wrap.addEventListener('click', () => onCardClick(i));
      wrap.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onCardClick(i); }
      });

      stage.appendChild(wrap);
      cardWraps.push(wrap);
    });

    // Dots
    const dotsEl = document.getElementById('orbit-dots');
    if (dotsEl) {
      dotsEl.innerHTML = '';
      CATEGORIES.forEach((_, i) => {
        const d = document.createElement('div');
        d.className = 'orbit-dot' + (i === 0 ? ' active' : '');
        d.setAttribute('role', 'tab');
        d.setAttribute('aria-label', `Go to ${CATEGORIES[i].title.replace('\n', ' ')}`);
        d.addEventListener('click', () => snapTo(i));
        dotsEl.appendChild(d);
      });
    }
  }

  /* ═══════════════════════════════════════
     ORBIT POSITIONING
  ═══════════════════════════════════════ */
  function getCardAngle(i) {
    return orbitAngle + i * STEP;
  }

  function positionCards() {
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // Calculate responsive ellipse dimensions
    let activeA = ELLIPSE_A;
    let activeB = ELLIPSE_B;
    let responsiveCardScale = 1.0;

    if (vw < 1200) {
      activeA = Math.min(ELLIPSE_A, Math.max(150, vw * 0.35));
      activeB = Math.max(60, ELLIPSE_B * (activeA / ELLIPSE_A));
    }
    if (vw < 768) {
      // Increase base scale on mobile to keep cards large
      responsiveCardScale = 1.0; 
      // Modify activeA to represent vertical radius
      activeA = 220; 
      activeB = 100;
    }

    cardWraps.forEach((wrap, i) => {
      const θ = getCardAngle(i);

      // Ellipse position
      let x = activeA * Math.sin(θ);
      let z = activeB * Math.cos(θ);

      // Depth-based scale & opacity
      // z ranges -B to +B; normalise to 0–1 (front=1, back=0)
      const depthNorm = (z + activeB) / (2 * activeB);      // 0=back, 1=front
      const scale     = (0.62 + depthNorm * 0.38) * responsiveCardScale;                 // 0.62 → 1.0
      const opacity   = 0.25 + depthNorm * 0.75;                 // 0.25 → 1.0
      const zIndex    = Math.round(depthNorm * 100);

      // Y sinks slightly as it goes to the sides (elliptical arc)
      let yOffset   = -Math.cos(θ) * 18;                       // subtle vertical drift
      let ry = Math.sin(θ) * 22;  // cards face inward on the orbit

      let tx = x;
      let ty = yOffset;
      let tz = z;

      // Make it vertical on mobile
      if (vw < 768) {
        tx = 0;                        // No horizontal spread
        ty = activeA * Math.sin(θ);    // Vertical spread instead
        tz = activeB * Math.cos(θ);
        ry = 0;                        // Flat rotation
      }

      wrap.style.transform = `translate3d(${tx}px, ${ty}px, ${tz}px) rotateY(${ry}deg) scale(${scale})`;
      wrap.style.opacity   = opacity.toFixed(3);
      wrap.style.zIndex    = zIndex;

      // Flip transform is handled by front/back face transforms
      // When flipped, we rotate the whole wrap an extra 180° on Y
      if (flippedIdx === i) {
        // Remove the orbit positioning and bring it to center for flip
        // Actually we keep position but apply flip via face transforms
        applyFlip(wrap, true);
      } else {
        applyFlip(wrap, false);
      }

      // Enable pointer events on all cards so they can be clicked to bring them to the front
      wrap.style.pointerEvents = 'auto';
    });

    // Update dots
    const frontIdx = getFrontIndex();
    document.querySelectorAll('.orbit-dot').forEach((d, i) => {
      d.classList.toggle('active', i === frontIdx);
    });

    // Update SVG track ellipse to align perfectly with card positions
    const trackEllipse = document.querySelector('.orbit-track-svg ellipse');
    if (trackEllipse) {
      const rx = Math.min(570, (activeA / vw) * 1200);
      const ry = Math.min(55, rx * (activeB / activeA) * 0.25);
      trackEllipse.setAttribute('rx', rx.toFixed(1));
      trackEllipse.setAttribute('ry', ry.toFixed(1));
    }

  }

  function applyFlip(wrap, flipped) {
    const front = wrap.querySelector('.orbit-card--front');
    const back  = wrap.querySelector('.orbit-card--back');
    if (!front || !back) return;
    const dur = '0.75s';
    const ease = 'cubic-bezier(0.23, 1, 0.32, 1)';
    front.style.transition = `transform ${dur} ${ease}`;
    back.style.transition  = `transform ${dur} ${ease}`;
    if (flipped) {
      front.style.transform = 'rotateY(-180deg)';
      back.style.transform  = 'rotateY(0deg)';
      wrap.classList.add('is-flipped');
    } else {
      front.style.transform = 'rotateY(0deg)';
      back.style.transform  = 'rotateY(180deg)';
      wrap.classList.remove('is-flipped');
    }
  }

  function getFrontIndex() {
    // The card at angle closest to θ=0 (or multiples of 2π) after accounting for orbitAngle
    let bestIdx = 0;
    let bestCos = -Infinity;
    cardWraps.forEach((_, i) => {
      const θ = getCardAngle(i);
      const c = Math.cos(θ);  // cos=1 at front (θ=0), cos=-1 at back
      if (c > bestCos) { bestCos = c; bestIdx = i; }
    });
    return bestIdx;
  }

  /* ═══════════════════════════════════════
     CARD FLIP
  ═══════════════════════════════════════ */
  function onCardClick(i) {
    const frontIdx = getFrontIndex();

    // If not the front card, rotate to bring it front
    if (i !== frontIdx) {
      const diff = i - frontIdx;
      const steps = ((diff % N) + N) % N;
      // pick shorter direction
      const stepsForward  = steps;
      const stepsBackward = N - steps;
      if (stepsForward <= stepsBackward) {
        targetAngle -= stepsForward * STEP;
      } else {
        targetAngle += stepsBackward * STEP;
      }
      autoRotate = false;
      clearTimeout(autoTimer);
      autoTimer = setTimeout(() => { autoRotate = true; }, 5000);
      return;
    }

    // It's the front card — toggle flip
    if (flippedIdx === i) {
      // Unflip
      flippedIdx = -1;
      autoRotate = true;
      expHeader && expHeader.classList.remove('dim');
    } else {
      // Flip
      flippedIdx = i;
      autoRotate = false;
      clearTimeout(autoTimer);
      expHeader && expHeader.classList.add('dim');
    }
    positionCards();
  }

  function unflipAll() {
    flippedIdx = -1;
    autoRotate = true;
    expHeader && expHeader.classList.remove('dim');
    positionCards();
  }

  /* ═══════════════════════════════════════
     SNAP
  ═══════════════════════════════════════ */
  function snapTo(catIdx) {
    // We want card[catIdx] to be at front (θ=0)
    // getCardAngle(i) = orbitAngle + i * STEP
    // We want: orbitAngle + catIdx * STEP ≡ 0 (mod 2π)
    // → orbitAngle = -catIdx * STEP
    const desired = -catIdx * STEP;
    // Normalise to take the shortest path (handling JavaScript negative remainder behavior)
    let diff = desired - targetAngle;
    diff = (((diff + Math.PI) % (2 * Math.PI) + (2 * Math.PI)) % (2 * Math.PI)) - Math.PI;
    targetAngle += diff;
    velocity = 0;
    autoRotate = false;
    clearTimeout(autoTimer);
    autoTimer = setTimeout(() => { autoRotate = true; }, 5000);
    unflipAll();
  }

  /* ═══════════════════════════════════════
     DRAG / INERTIA
  ═══════════════════════════════════════ */
  function onPointerDown(e) {
    if (e.target.closest('.proj-detail-overlay')) return;
    if (e.target.closest('.orbit-card--back'))    return; // let back card scroll
    isDragging  = true;
    dragStartX  = (e.touches ? e.touches[0] : e).clientX;
    dragLastX   = dragStartX;
    if (e.touches) {
       window.dragLastY = e.touches[0].clientY;
    } else {
       window.dragLastY = e.clientY;
    }
    dragLastT   = performance.now();
    velocity    = 0;
    autoRotate  = false;
    clearTimeout(autoTimer);
    if (flippedIdx !== -1) unflipAll();
    e.stopPropagation();
  }

  function onPointerMove(e) {
    if (!isDragging) return;
    const cx = (e.touches ? e.touches[0] : e).clientX;
    const now = performance.now();
    const dt  = (now - dragLastT) / 1000 || 0.016;
    // Convert pixel delta to radians
    // If vertical on mobile, use dy instead of dx
    const vw = window.innerWidth;
    let dAngle = 0;
    
    if (vw < 768) {
      // vertical scroll uses y
      const cy = (e.touches ? e.touches[0] : e).clientY;
      if (typeof dragLastY === 'undefined') dragLastY = cy;
      const dy = cy - dragLastY;
      dAngle = (dy / 220) * -1.4;
      dragLastY = cy;
      dragLastX = cx; // keep sync
    } else {
      const dx  = cx - dragLastX;
      dAngle = (dx / ELLIPSE_A) * -1.4;
      dragLastX = cx;
    }
    orbitAngle  += dAngle;
    targetAngle  = orbitAngle;

    velocity    = dAngle / dt;  // rad/s

    dragLastX   = cx;
    dragLastT   = now;
    positionCards();
    e.preventDefault();
  }

  function onPointerUp() {
    if (!isDragging) return;
    isDragging  = false;

    // Snap to nearest card after inertia settles
    // We'll let the RAF handle deceleration, then snap
    autoTimer = setTimeout(() => {
      const frontIdx = getFrontIndex();
      snapTo(frontIdx);
      setTimeout(() => { autoRotate = true; }, 1000);
    }, 700);
  }

  /* ═══════════════════════════════════════
     ANIMATION LOOP
  ═══════════════════════════════════════ */
  function tick(ts) {
    const dt = Math.min((ts - lastTs) / 1000, 0.05);
    lastTs = ts;

    if (isDragging) {
      // Nothing — handled in move
    } else {
      // Inertia decay
      if (Math.abs(velocity) > 0.001) {
        orbitAngle += velocity * dt;
        targetAngle = orbitAngle;
        velocity   *= Math.pow(0.88, dt * 60);
      } else {
        velocity = 0;
        // Spring to target
        const diff = targetAngle - orbitAngle;
        if (Math.abs(diff) > 0.0005) {
          orbitAngle += diff * Math.min(dt * 8, 1);
        } else {
          orbitAngle = targetAngle;
          // Auto-rotate when settled
          if (autoRotate && flippedIdx === -1) {
            orbitAngle  -= AUTO_SPEED * dt;
            targetAngle  = orbitAngle;
          }
        }
      }
    }

    positionCards();
    rafId = requestAnimationFrame(tick);
  }

  /* ═══════════════════════════════════════
     PROJECT DETAIL OVERLAY
  ═══════════════════════════════════════ */
  function openDetail(cat, proj) {
    const overlay   = document.getElementById('proj-detail');
    const mediaEl   = document.getElementById('proj-detail-media');
    const tagEl     = document.getElementById('proj-detail-tag');
    const titleEl   = document.getElementById('proj-detail-title');
    const descEl    = document.getElementById('proj-detail-desc');
    const stackEl   = document.getElementById('proj-detail-stack');
    const actionsEl = document.getElementById('proj-detail-actions');

    if (!overlay) return;

    // Media
    mediaEl.innerHTML = '';
    if (proj.images && proj.images.length) {
      mediaEl.style.display = 'block';
      mediaEl.style.background = 'rgba(0,0,0,0.5)';
      mediaEl.style.height = 'auto';
      mediaEl.style.maxHeight = 'none';
      mediaEl.style.overflow = 'auto';
      const gallery = document.createElement('div');
      gallery.className = 'media-gallery';
      proj.images.forEach(src => {
        const img = document.createElement('img');
        img.src = src;
        img.alt = proj.name;
        img.className = 'media-gallery-img';
        img.loading = 'eager';
        img.fetchpriority = 'high';
        img.style.width = '100%';
        img.style.height = 'auto';
        img.style.objectFit = 'contain';
        img.style.imageRendering = 'auto';
        gallery.appendChild(img);
      });
      mediaEl.appendChild(gallery);
    } else {
      mediaEl.style.display = 'none';
      mediaEl.style.background = 'transparent';
      mediaEl.style.height = '0';
      mediaEl.style.overflow = 'hidden';
    }

    // Tag
    tagEl.textContent = proj.tag;
    tagEl.style.background = `rgba(${proj.accentRgb || cat.accentRgb},0.12)`;
    tagEl.style.border     = `1px solid rgba(${proj.accentRgb || cat.accentRgb},0.35)`;
    tagEl.style.color      = proj.accentColor || cat.accent;

    // Title & desc
    titleEl.textContent = proj.name;
    descEl.textContent  = proj.desc;

    // Stack
    stackEl.innerHTML = '';
    proj.stack.forEach(s => {
      const pill = document.createElement('span');
      pill.className = 'stack-pill';
      pill.textContent = s;
      stackEl.appendChild(pill);
    });

    // Actions
    actionsEl.innerHTML = '';
    if (proj.type === 'live' && proj.url) {
      const btn = document.createElement('a');
      btn.className = 'detail-btn primary';
      btn.href      = proj.url;
      btn.target    = '_blank';
      btn.rel       = 'noopener noreferrer';
      btn.innerHTML = `${proj.urlLabel || 'Launch Live Site'} ↗`;
      actionsEl.appendChild(btn);
    }
    if (proj.links && proj.links.length) {
      proj.links.forEach(link => {
        const extraBtn = document.createElement('a');
        extraBtn.className = 'detail-btn primary';
        extraBtn.href      = link.url;
        extraBtn.target    = '_blank';
        extraBtn.rel       = 'noopener noreferrer';
        extraBtn.innerHTML = `${link.label} ↗`;
        actionsEl.appendChild(extraBtn);
      });
    }
    if (proj.github) {
      const ghBtn = document.createElement('a');
      ghBtn.className = 'detail-btn primary';
      ghBtn.href      = proj.github;
      ghBtn.target    = '_blank';
      ghBtn.rel       = 'noopener noreferrer';
      ghBtn.innerHTML = 'View on GitHub ↗';
      actionsEl.appendChild(ghBtn);
    }

    // Show
    overlay.setAttribute('aria-hidden', 'false');

    const inner = overlay.querySelector('.proj-detail-inner');
    if (inner) inner.scrollTop = 0;
    overlay.scrollTop = 0;

    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    document.body.style.overflow = 'hidden';

    requestAnimationFrame(() => overlay.classList.add('open'));
  }

  function closeDetail() {
    const overlay = document.getElementById('proj-detail');
    if (!overlay) return;
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    const inner = overlay.querySelector('.proj-detail-inner');
    if (inner) inner.scrollTop = 0;
    overlay.scrollTop = 0;
    // Pause any video
    const vid = overlay.querySelector('video');
    if (vid) vid.pause();
  }

  function buildStarfield() {
    const starfield = document.getElementById('exp-starfield');
    if (!starfield) return;
    starfield.innerHTML = '';
    const numStars = 45;
    for (let i = 0; i < numStars; i++) {
      const star = document.createElement('div');
      star.className = 'exp-star';
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.setProperty('--d', `${2 + Math.random() * 4}s`);
      star.style.animationDelay = `${Math.random() * 5}s`;
      starfield.appendChild(star);
    }
  }

  /* ═══════════════════════════════════════
     PUBLIC API
  ═══════════════════════════════════════ */
  function start() {
    if (initialized) return;
    initialized = true;

    expHeader = document.getElementById('exp-header');
    detailOverlay = document.getElementById('proj-detail');

    buildCards();
    buildStarfield();
    positionCards();

    // Nav arrows
    const prevBtn = document.getElementById('orbit-prev');
    const nextBtn = document.getElementById('orbit-next');
    if (prevBtn) prevBtn.addEventListener('click', () => { snapTo((getFrontIndex() + 1) % N); });
    if (nextBtn) nextBtn.addEventListener('click', () => { snapTo((getFrontIndex() - 1 + N) % N); });

    // Detail close
    const closeBtn = document.getElementById('proj-detail-close');
    if (closeBtn) closeBtn.addEventListener('click', closeDetail);

    // Drag on stage
    const scene = document.getElementById('orbit-scene');
    if (scene) {
      scene.addEventListener('mousedown',  onPointerDown, { passive: true });
      scene.addEventListener('touchstart', onPointerDown, { passive: true });
    }
    window.addEventListener('mousemove',  onPointerMove, { passive: false });
    window.addEventListener('touchmove',  onPointerMove, { passive: false });
    window.addEventListener('mouseup',    onPointerUp,   { passive: true });
    window.addEventListener('touchend',   onPointerUp,   { passive: true });

    // Keyboard navigation on stage
    const expPage = document.getElementById('page-experiences');
    if (expPage) {
      expPage.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') snapTo((getFrontIndex() - 1 + N) % N);
        if (e.key === 'ArrowLeft')  snapTo((getFrontIndex() + 1) % N);
        if (e.key === 'Escape')     { closeDetail(); unflipAll(); }
      });
    }

    // Window resize
    window.addEventListener('resize', positionCards);

    lastTs = performance.now();
    rafId  = requestAnimationFrame(tick);
  }

  function stop() {
    if (rafId) cancelAnimationFrame(rafId);
    window.removeEventListener('mousemove', onPointerMove);
    window.removeEventListener('touchmove', onPointerMove);
    window.removeEventListener('mouseup',   onPointerUp);
    window.removeEventListener('touchend',  onPointerUp);
    window.removeEventListener('resize',    positionCards);
    initialized = false;
    orbitAngle  = 0;
    targetAngle = 0;
    velocity    = 0;
    flippedIdx  = -1;
    autoRotate  = true;
    clearTimeout(autoTimer);
    closeDetail();
  }

  window.OrbitCarousel = { start, stop };

})();
