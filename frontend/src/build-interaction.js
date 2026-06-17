// SPATIAL DRAFTING PORTAL - Re-Engineered Logic
import { CURRENCIES, formatPriceUSD, getCurrencySymbol } from './currencies.js';
import { getApiBase } from './api-config.js';

// Store uploaded image URLs
const uploadedImages = [];

// 1. The Velvet Void & Particle Constellation Engine
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');

let width, height;
let particles = [];
let mouse = { x: null, y: null, radius: 200 };

function initCanvas() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
  particles = [];
  for (let i = 0; i < 150; i++) {
    particles.push(new Particle());
  }
}

class Particle {
  constructor() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.vx = (Math.random() - 0.5) * 1.5;
    this.vy = (Math.random() - 0.5) * 1.5;
    this.baseX = this.x;
    this.baseY = this.y;
    this.size = Math.random() * 2 + 0.5;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    
    // Bounce off edges
    if (this.x < 0 || this.x > width) this.vx *= -1;
    if (this.y < 0 || this.y > height) this.vy *= -1;

    // Mouse Magnetism / Parallax Flex
    if (mouse.x != null) {
      let dx = mouse.x - this.x;
      let dy = mouse.y - this.y;
      let distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < mouse.radius) {
        const force = (mouse.radius - distance) / mouse.radius;
        // Gently pull towards mouse
        this.x += (dx * force * 0.1);
        this.y += (dy * force * 0.1);
      }
    }
  }
  draw() {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function animateCanvas() {
  requestAnimationFrame(animateCanvas);
  ctx.clearRect(0, 0, width, height);

  particles.forEach(p => {
    p.update();
    p.draw();
  });

  // Draw connections
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      let dx = particles[i].x - particles[j].x;
      let dy = particles[i].y - particles[j].y;
      let distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 150) {
        let opacity = 1 - (distance / 150);
        let strokeColor = `rgba(100, 255, 220, ${opacity * 0.15})`;

        // Bright glow color if near mouse without using expensive canvas shadowBlur
        if (mouse.x != null) {
          let midX = (particles[i].x + particles[j].x) / 2;
          let midY = (particles[i].y + particles[j].y) / 2;
          let mouseDist = Math.sqrt(Math.pow(mouse.x - midX, 2) + Math.pow(mouse.y - midY, 2));
          if (mouseDist < 200) {
            strokeColor = `rgba(20, 255, 200, ${opacity * 0.8})`;
          }
        }

        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = opacity * 1.5;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
}

window.addEventListener('resize', initCanvas);
window.addEventListener('mousemove', (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});
window.addEventListener('mouseout', () => {
  mouse.x = null;
  mouse.y = null;
});

initCanvas();
animateCanvas();

// 2. High-Tier Architecture Selectors & Pricing
const archCards = document.querySelectorAll('.arch-card');
const quotePrice = document.getElementById('quote-price');
const quoteTimeline = document.getElementById('quote-timeline');
const btnCompile = document.getElementById('btn-compile');
const proposalSidebar = document.getElementById('proposal-sidebar');
const btnMinimize = document.getElementById('btn-minimize');

let currentPrice = 0;
let globalQueueDelayWeeks = 2;
const savedDelay = localStorage.getItem('globalQueueDelayWeeks');
if(savedDelay !== null) {
  globalQueueDelayWeeks = parseInt(savedDelay);
}

// Pricing definitions for individual capabilities
const capabilityPrices = {
  'logins': 10,
  'admin': 15,
  'notifications': 5,
  'storage': 8,
  'payments': 15,
  'portfolio': 10,
  'invoices': 5,
  'chat': 10
};

const FEATURE_LABELS = {
  logins: 'Secure Member Logins',
  admin: 'Admin Dashboard',
  notifications: 'Push Notifications',
  storage: 'Cloud File Storage',
  payments: 'Takes Payments',
  portfolio: 'Product Portfolio',
  invoices: 'Invoice Generation',
  chat: 'Live Chat Portal',
};

/** Auto-included (locked) for E-Commerce — prices still apply */
const ECOMMERCE_AUTO_INCLUDED = ['logins', 'admin', 'storage', 'payments', 'portfolio'];

let activeCurrency = localStorage.getItem('build_currency') || localStorage.getItem('admin_currency') || 'USD';

function formatDisplayPrice(usd) {
  return formatPriceUSD(usd, activeCurrency);
}

function getActiveFeatureIds() {
  return [...document.querySelectorAll('.tag-pill[data-active="true"]')]
    .map(pill => pill.getAttribute('data-id'))
    .filter(Boolean);
}

function getActiveFeatureLabels() {
  return getActiveFeatureIds().map(id => FEATURE_LABELS[id] || id);
}

function refreshPriceDisplay() {
  currentPrice = calculateTotalPrice();
  animateOdometer(quotePrice, currentPrice, getCurrencySymbol(activeCurrency));
}

function setupCurrencySelect() {
  const currencySelect = document.getElementById('build-currency-select');
  if (!currencySelect) return;

  currencySelect.innerHTML = '';
  Object.entries(CURRENCIES).forEach(([code, cfg]) => {
    const opt = document.createElement('option');
    opt.value = code;
    opt.textContent = cfg.icon || cfg.symbol;
    opt.title = cfg.label;
    if (code === activeCurrency) opt.selected = true;
    currencySelect.appendChild(opt);
  });

  currencySelect.addEventListener('change', () => {
    activeCurrency = currencySelect.value;
    localStorage.setItem('build_currency', activeCurrency);
    refreshPriceDisplay();
  });
}

// Check if features should be automatically checked and disabled (locked) based on active architecture
function updateSmartDependencies() {
  const activeCard = document.querySelector('.arch-card.active');
  const type = activeCard ? activeCard.getAttribute('data-type') : null;

  document.querySelectorAll('.tag-pill').forEach(pill => {
    const id = pill.getAttribute('data-id');

    if (pill.classList.contains('locked-active')) {
      pill.setAttribute('data-active', 'false');
      pill.classList.remove('locked-active');
    }

    if (type === 'ecommerce' && ECOMMERCE_AUTO_INCLUDED.includes(id)) {
      pill.setAttribute('data-active', 'true');
      pill.classList.add('locked-active');
    }
  });
}

function calculateTotalPrice() {
  const activeCard = document.querySelector('.arch-card.active');
  if (!activeCard) return 0;

  const basePrice = parseInt(activeCard.getAttribute('data-price'), 10);
  let additionalPrice = 0;

  document.querySelectorAll('.tag-pill[data-active="true"]').forEach(pill => {
    const id = pill.getAttribute('data-id');
    additionalPrice += (capabilityPrices[id] || 0);
  });

  return basePrice + additionalPrice;
}

archCards.forEach(card => {
  card.addEventListener('click', () => {
    archCards.forEach(c => c.classList.remove('active'));
    card.classList.add('active');
    
    updateSmartDependencies();
    refreshPriceDisplay();

    // Update Timeline
    const type = card.getAttribute('data-type');
    let baselineWeeks = 1;
    if(type === 'ecommerce') baselineWeeks = 2;
    if(type === 'webapp') baselineWeeks = 3;
    if(type === 'bespoke') baselineWeeks = 4;
    
    // Show only the specific order time, not including queue delay
    animateOdometer(quoteTimeline, baselineWeeks, '', ' WEEKS');
  });
});

function animateOdometer(element, targetValue, prefix = '', suffix = '') {
  const obj = { val: 0 };
  gsap.to(obj, {
    val: targetValue,
    duration: 1.5,
    ease: 'power3.out',
    onUpdate: () => {
      element.innerText = `${prefix}${Math.floor(obj.val).toLocaleString()}${suffix}`;
    }
  });
}

// 3. Smart Feature Tags
const tagPills = document.querySelectorAll('.tag-pill');
tagPills.forEach(pill => {
  pill.addEventListener('click', () => {
    // If it's locked/auto-selected by current package, user cannot manually disable it
    if (pill.classList.contains('locked-active')) {
      // Play brief wiggle animation to denote it is locked
      gsap.fromTo(pill, { x: -4 }, { x: 4, duration: 0.1, yoyo: true, repeat: 3, onComplete: () => gsap.set(pill, { x: 0 }) });
      return;
    }
    
    const isActive = pill.getAttribute('data-active') === 'true';
    pill.setAttribute('data-active', !isActive);
    
    // Animate pop
    gsap.fromTo(pill, { scale: 0.9 }, { scale: 1, duration: 0.3, ease: 'back.out(2)' });
    
    // Recalculate price
    const totalPrice = calculateTotalPrice();
    if (totalPrice !== currentPrice) {
      refreshPriceDisplay();
    }
  });
});
// 4. Submersible Proposal Sidebar
btnCompile.addEventListener('click', () => {
  const activeCard = document.querySelector('.arch-card.active');
  if (!activeCard) {
    showBuildToast('Please select an architecture first.', 'Architecture required');
    return;
  }
  refreshPriceDisplay();
  proposalSidebar.classList.add('active');
  proposalSidebar.classList.remove('minimized');
  document.body.classList.add('sidebar-open');
  btnMinimize.style.display = 'flex'; // Make the minimize button available ONLY after submit/deploy
  btnMinimize.innerText = '>'; // Setup default open icon
});

btnMinimize.addEventListener('click', (e) => {
  e.stopPropagation();
  if(proposalSidebar.classList.contains('minimized')) {
    proposalSidebar.classList.remove('minimized');
    document.body.classList.add('sidebar-open');
    btnMinimize.innerText = '>';
  } else {
    proposalSidebar.classList.add('minimized');
    document.body.classList.remove('sidebar-open');
    btnMinimize.innerText = '<';
  }
});

proposalSidebar.addEventListener('click', () => {
  if(proposalSidebar.classList.contains('minimized')) {
    proposalSidebar.classList.remove('minimized');
    document.body.classList.add('sidebar-open');
    btnMinimize.innerText = '>';
  }
});

// 5. Universal Asset Dropper
const assetDropper = document.getElementById('asset-dropper');
const polaroidContainer = document.getElementById('polaroid-container');
const assetInputMobile = document.getElementById('asset-input-mobile');

// Handle mobile image upload
assetInputMobile.addEventListener('change', async (e) => {
  if (e.target.files && e.target.files.length > 0) {
    const file = e.target.files[0];
    if (file.type.startsWith('image/')) {
      // Upload to Cloudinary
      try {
        const formData = new FormData();
        formData.append('image', file);

        const res = await fetch(`${getApiBase()}/upload`, {
          method: 'POST',
          body: formData,
        });

        if (!res.ok) {
          throw new Error('Failed to upload image');
        }

        const data = await res.json();
        if (data.success) {
          uploadedImages.push(data.url);
          createPolaroid(data.url);
        }
      } catch (err) {
        console.error('Upload error:', err);
        // Fallback to local preview
        const reader = new FileReader();
        reader.onload = (event) => {
          createPolaroid(event.target.result);
        };
        reader.readAsDataURL(file);
      }
    }
  }
});

assetDropper.addEventListener('dragover', (e) => {
  e.preventDefault();
  assetDropper.classList.add('dragover');
});
assetDropper.addEventListener('dragleave', () => {
  assetDropper.classList.remove('dragover');
});
assetDropper.addEventListener('drop', async (e) => {
  e.preventDefault();
  assetDropper.classList.remove('dragover');

  if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
    const file = e.dataTransfer.files[0];
    if (file.type.startsWith('image/')) {
      // Upload to Cloudinary
      try {
        const formData = new FormData();
        formData.append('image', file);

        const res = await fetch(`${getApiBase()}/upload`, {
          method: 'POST',
          body: formData,
        });

        if (!res.ok) {
          throw new Error('Failed to upload image');
        }

        const data = await res.json();
        if (data.success) {
          uploadedImages.push(data.url);
          createPolaroid(data.url);
        }
      } catch (err) {
        console.error('Upload error:', err);
        // Fallback to local preview
        const reader = new FileReader();
        reader.onload = (event) => {
          createPolaroid(event.target.result);
        };
        reader.readAsDataURL(file);
      }
    }
  }
});

function createPolaroid(src) {
  const polaroid = document.createElement('div');
  polaroid.className = 'polaroid';
  
  const img = document.createElement('img');
  img.src = src;
  polaroid.appendChild(img);
  
  const angle = (Math.random() - 0.5) * 40; 
  const x = (Math.random() - 0.5) * 100;
  const y = (Math.random() - 0.5) * 40;
  
  polaroid.style.transform = `translate(${x}px, ${y}px) rotate(${angle}deg)`;
  polaroidContainer.appendChild(polaroid);
  
  gsap.from(polaroid, { scale: 2, opacity: 0, rotation: angle + 45, duration: 0.6, ease: 'back.out(1.5)' });
}

function showBuildToast(message, title = 'Notice') {
  const toast = document.getElementById('build-toast');
  if (!toast) return;

  const messageEl = toast.querySelector('.build-toast-message');
  const iconEl = toast.querySelector('.build-toast-icon');

  const isSuccess = message.toLowerCase().includes('contact you soon');
  toast.classList.toggle('build-toast--success', isSuccess);
  toast.classList.toggle('build-toast--error', !isSuccess);

  if (messageEl) messageEl.textContent = isSuccess ? message : (title !== 'Notice' ? `${title}: ${message}` : message);
  if (iconEl) iconEl.textContent = isSuccess ? '✓' : '!';

  toast.hidden = false;
  requestAnimationFrame(() => toast.classList.add('show'));

  clearTimeout(showBuildToast._timer);
  showBuildToast._timer = setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => { toast.hidden = true; }, 450);
  }, isSuccess ? 3200 : 2800);
}

// 6. Transmit Blueprint (Order Submission)
document.getElementById('btn-transmit').addEventListener('click', async () => {
  const btn = document.getElementById('btn-transmit');
  const activeCard = document.querySelector('.arch-card.active');
  const emailInput = document.getElementById('order-email');
  const whatsappInput = document.getElementById('order-whatsapp');

  if (!activeCard) {
    showBuildToast('Please select an architecture first.');
    return;
  }
  if (!whatsappInput.value.trim()) {
    showBuildToast('Please enter your WhatsApp number.', 'Phone required');
    return;
  }

  if (emailInput.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim())) {
    showBuildToast('Please enter a valid email address or leave it blank.', 'Invalid email');
    return;
  }

  if (btn.disabled) return;

  btn.disabled = true;

  const activeLabel = activeCard.querySelector('.arch-label').innerText;
  const invoiceUSD = calculateTotalPrice();
  const invoiceDisplay = formatDisplayPrice(invoiceUSD);
  const conceptText = document.getElementById('concept-input').value;
  const competitorLink = document.querySelector('.link-input').value;
  const polaroidCount = document.querySelectorAll('.polaroid').length;
  const timelineText = document.getElementById('quote-timeline').innerText;
  const timelineWeeks = parseInt(timelineText.replace(/\D/g, ''), 10) || 0;
  const orderId = 'CL-' + Math.floor(1000 + Math.random() * 9000);

  const orderPayload = {
    orderId,
    format: activeLabel,
    concept: conceptText || 'N/A',
    referenceLink: competitorLink || 'N/A',
    email: emailInput.value.trim() || 'N/A',
    phone: whatsappInput.value.trim(),
    features: getActiveFeatureLabels(),
    assets: polaroidCount,
    imageUrls: uploadedImages,
    invoiceUSD,
    currency: activeCurrency,
    invoiceDisplay,
    timelineWeeks,
  };

  try {
    const res = await fetch(`${getApiBase()}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderPayload),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Server rejected order');
    }
  } catch (err) {
    console.warn('[build] API save failed, using local fallback:', err.message);
    const orders = JSON.parse(localStorage.getItem('draft_orders') || '[]');
    orders.push({
      ...orderPayload,
      whatsapp: orderPayload.phone,
      link: orderPayload.referenceLink,
      invoice: invoiceDisplay,
      status: 'Lead',
      statusCode: 'lead',
    });
    localStorage.setItem('draft_orders', JSON.stringify(orders));
  }

  btn.classList.add('success');
  showBuildToast('Our team will contact you soon.');

  setTimeout(() => {
    btn.classList.remove('success');
    btn.disabled = false;
  }, 2800);
});

setupCurrencySelect();
