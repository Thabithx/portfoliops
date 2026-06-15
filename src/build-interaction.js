// SPATIAL DRAFTING PORTAL - Re-Engineered Logic

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

archCards.forEach(card => {
  card.addEventListener('click', () => {
    archCards.forEach(c => c.classList.remove('active'));
    card.classList.add('active');
    
    // Calculate Feature Tags Price
    let additionalPrice = 0;
    document.querySelectorAll('.tag-pill[data-active="true"]').forEach(() => {
      additionalPrice += 25;
    });

    // Update Pricing
    const basePrice = parseInt(card.getAttribute('data-price'));
    currentPrice = basePrice + additionalPrice;
    animateOdometer(quotePrice, currentPrice, '$');

    // Update Timeline
    const type = card.getAttribute('data-type');
    let baselineWeeks = 1;
    if(type === 'ecommerce') baselineWeeks = 3;
    if(type === 'webapp') baselineWeeks = 4;
    if(type === 'bespoke') baselineWeeks = 6;
    
    const totalWeeks = baselineWeeks + globalQueueDelayWeeks;
    animateOdometer(quoteTimeline, totalWeeks, '', ' WEEKS');
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

// 3. Smart Feature Tags (Isolated State)
const tagPills = document.querySelectorAll('.tag-pill');
tagPills.forEach(pill => {
  pill.addEventListener('click', () => {
    const isActive = pill.getAttribute('data-active') === 'true';
    pill.setAttribute('data-active', !isActive);
    
    // Animate pop
    gsap.fromTo(pill, { scale: 0.9 }, { scale: 1, duration: 0.3, ease: 'back.out(2)' });
    
    // Recalculate price
    let additionalPrice = 0;
    document.querySelectorAll('.tag-pill[data-active="true"]').forEach(() => {
      additionalPrice += 25; // Each feature adds $25
    });
    
    const activeCard = document.querySelector('.arch-card.active');
    let basePrice = 0;
    if (activeCard) {
      basePrice = parseInt(activeCard.getAttribute('data-price'));
    }
    
    const totalPrice = basePrice + additionalPrice;
    if (totalPrice !== currentPrice && basePrice > 0) {
      currentPrice = totalPrice;
      animateOdometer(quotePrice, totalPrice, '$');
    }
  });
});
// 4. Submersible Proposal Sidebar
btnCompile.addEventListener('click', () => {
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
    btnMinimize.innerText = '<';
  }
});

// 5. Universal Asset Dropper
const assetDropper = document.getElementById('asset-dropper');
const polaroidContainer = document.getElementById('polaroid-container');

assetDropper.addEventListener('dragover', (e) => {
  e.preventDefault();
  assetDropper.classList.add('dragover');
});
assetDropper.addEventListener('dragleave', () => {
  assetDropper.classList.remove('dragover');
});
assetDropper.addEventListener('drop', (e) => {
  e.preventDefault();
  assetDropper.classList.remove('dragover');
  
  if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
    const file = e.dataTransfer.files[0];
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        createPolaroid(event.target.result);
      };
      reader.readAsDataURL(file);
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

// 6. Transmit Blueprint (Order Submission)
document.getElementById('btn-transmit').addEventListener('click', () => {
  const btn = document.getElementById('btn-transmit');
  const activeCard = document.querySelector('.arch-card.active');
  const emailInput = document.getElementById('order-email');
  const whatsappInput = document.getElementById('order-whatsapp');
  
  if (!activeCard) {
    alert("Please select an architecture first.");
    return;
  }
  if (!emailInput.value || !whatsappInput.value) {
    alert("Please fill in your Email and WhatsApp number.");
    return;
  }

  btn.innerText = "[ TRANSMITTING... ]";
  btn.style.background = "rgba(255,255,255,0.2)";
  btn.style.color = "#fff";
  
  setTimeout(() => {
    btn.innerText = "[ BLUEPRINT QUEUED ]";
    btn.style.background = "#4ade80";
    btn.style.color = "#000";
    
    // Save to local storage database
    const activeLabel = activeCard.querySelector('.arch-label').innerText;
    const priceText = document.getElementById('quote-price').innerText;
    const conceptText = document.getElementById('concept-input').value;
    const competitorLink = document.querySelector('.link-input').value;
    const polaroidCount = document.querySelectorAll('.polaroid').length;
    
    const orders = JSON.parse(localStorage.getItem('draft_orders') || '[]');
    const newOrder = {
      id: 'CL-' + Math.floor(1000 + Math.random() * 9000),
      format: activeLabel,
      concept: conceptText || "N/A",
      link: competitorLink || "N/A",
      email: emailInput.value,
      whatsapp: whatsappInput.value,
      assets: polaroidCount,
      invoice: priceText,
      status: 'Lead',
      statusCode: 'lead'
    };
    orders.push(newOrder);
    localStorage.setItem('draft_orders', JSON.stringify(orders));
    
    setTimeout(() => {
      btn.innerText = "[ ORDER ]";
      btn.style.background = "#fff";
      proposalSidebar.classList.remove('active');
      document.body.classList.remove('sidebar-open');
      btnMinimize.style.display = 'none'; // Hide minimized toggle again
      document.getElementById('concept-input').value = '';
      document.querySelector('.link-input').value = '';
      emailInput.value = '';
      whatsappInput.value = '';
      polaroidContainer.innerHTML = '';
      tagPills.forEach(p => p.setAttribute('data-active', 'false'));
      archCards.forEach(c => c.classList.remove('active'));
    }, 3000);
  }, 1500);
});
