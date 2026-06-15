// Back-Office Admin Logic

// ── Currency config ──────────────────────────────────────────
const CURRENCIES = {
  USD: { symbol: '$', rate: 1,      label: 'USD — US Dollar' },
  EUR: { symbol: '€', rate: 0.92,   label: 'EUR — Euro' },
  GBP: { symbol: '£', rate: 0.79,   label: 'GBP — British Pound' },
  INR: { symbol: '₹', rate: 83.5,   label: 'INR — Indian Rupee' },
  AED: { symbol: 'د.إ', rate: 3.67, label: 'AED — UAE Dirham' },
  LKR: { symbol: 'Rs', rate: 310,   label: 'LKR — Sri Lankan Rupee' },
  AUD: { symbol: 'A$', rate: 1.53,  label: 'AUD — Australian Dollar' },
  CAD: { symbol: 'CA$', rate: 1.37, label: 'CAD — Canadian Dollar' },
};

let activeCurrency = localStorage.getItem('admin_currency') || 'USD';

// ── Mock orders (updated to competitive pricing) ─────────────
const mockOrders = [
  {
    id: 'CL-0912',
    format: 'E-Commerce Pipeline',
    concept: 'A clean fashion lookbook site with headless checkout.',
    assets: 2,
    invoiceUSD: 349,
    status: 'In Production',
    statusCode: 'prod'
  },
  {
    id: 'CL-0913',
    format: 'Custom Web App',
    concept: 'Admin control center for real estate portfolio tracking.',
    assets: 0,
    invoiceUSD: 499,
    status: 'Lead',
    statusCode: 'lead'
  },
  {
    id: 'CL-0888',
    format: 'Landing / Single Page',
    concept: 'High conversion waitlist page for fintech startup.',
    assets: 1,
    invoiceUSD: 149,
    status: 'Shipped',
    statusCode: 'shipped'
  }
];

// Parse saved orders — try to extract numeric USD from invoice string
const savedOrders = JSON.parse(localStorage.getItem('draft_orders') || '[]').map(o => {
  const num = parseFloat((o.invoice || '0').replace(/[^0-9.]/g, ''));
  return { ...o, invoiceUSD: isNaN(num) ? 0 : num };
});

const allOrders = [...mockOrders, ...savedOrders];

// ── Helpers ───────────────────────────────────────────────────
function formatPrice(usd) {
  const cur = CURRENCIES[activeCurrency];
  const converted = usd * cur.rate;
  return `${cur.symbol}${converted.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

// ── Render table ──────────────────────────────────────────────
const tbody = document.getElementById('orders-tbody');

function renderTable() {
  tbody.innerHTML = '';
  allOrders.forEach(order => {
    const tr = document.createElement('tr');

    let assetsHtml = '<span style="color:rgba(255,255,255,0.2);">—</span>';
    if (order.assets > 0) {
      assetsHtml = `<div style="display:flex;gap:8px;flex-wrap:wrap;">`;
      for (let i = 0; i < order.assets; i++) {
        assetsHtml += `<div class="thumbnail" style="background:#333;border:1px solid #555;"></div>`;
      }
      assetsHtml += `</div>`;
    }

    let clientInfo = order.id;
    if (order.email || order.whatsapp) {
      clientInfo += `<div style="font-size:0.75rem;color:rgba(255,255,255,0.4);margin-top:4px;">${order.email || ''}${order.whatsapp ? '<br/>' + order.whatsapp : ''}</div>`;
    }

    tr.innerHTML = `
      <td data-label="Client ID" style="font-family:monospace;font-weight:600;vertical-align:top;">${clientInfo}</td>
      <td data-label="Format" style="vertical-align:top;">${order.format}</td>
      <td data-label="Concept" style="max-width:260px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;vertical-align:top;" title="${order.concept}">${order.concept}</td>
      <td data-label="Assets" style="vertical-align:top;">${assetsHtml}</td>
      <td data-label="Invoice" class="invoice-cell" style="font-weight:900;vertical-align:top;">${formatPrice(order.invoiceUSD)}</td>
      <td data-label="Status" style="vertical-align:top;"><span class="status-badge status-${order.statusCode}">${order.status}</span></td>
    `;
    tbody.appendChild(tr);
  });
}

renderTable();

// ── Currency switcher ─────────────────────────────────────────
const currencySelect = document.getElementById('currency-select');
if (currencySelect) {
  // Populate options
  Object.entries(CURRENCIES).forEach(([code, cfg]) => {
    const opt = document.createElement('option');
    opt.value = code;
    opt.textContent = cfg.label;
    if (code === activeCurrency) opt.selected = true;
    currencySelect.appendChild(opt);
  });

  currencySelect.addEventListener('change', () => {
    activeCurrency = currencySelect.value;
    localStorage.setItem('admin_currency', activeCurrency);
    renderTable();
    // Flash feedback
    currencySelect.style.borderColor = '#4ade80';
    setTimeout(() => { currencySelect.style.borderColor = 'rgba(255,255,255,0.2)'; }, 800);
  });
}

// ── Queue Delay Override ──────────────────────────────────────
const inputBuffer = document.getElementById('queue-buffer');
const btnSave     = document.getElementById('btn-save-buffer');

const savedDelay = localStorage.getItem('globalQueueDelayWeeks');
if (savedDelay !== null && inputBuffer) inputBuffer.value = savedDelay;

if (btnSave) {
  btnSave.addEventListener('click', () => {
    localStorage.setItem('globalQueueDelayWeeks', inputBuffer.value);
    btnSave.innerText = 'OVERRIDE ACTIVE';
    btnSave.style.background = '#4ade80';
    setTimeout(() => {
      btnSave.innerText = 'OVERRIDE TIMELINE';
      btnSave.style.background = '#fff';
    }, 2000);
  });
}
