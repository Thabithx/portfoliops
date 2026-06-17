import { CURRENCIES, formatPriceUSD } from './currencies.js';
import { getApiBase } from './api-config.js';

const AUTH_KEY = 'portfolio_admin_token';

let activeCurrency = localStorage.getItem('admin_currency') || 'USD';
let allOrders = [];

function getAuthToken() {
  return sessionStorage.getItem(AUTH_KEY);
}

function setAuthToken(token) {
  sessionStorage.setItem(AUTH_KEY, token);
}

function clearAuthToken() {
  sessionStorage.removeItem(AUTH_KEY);
}

function authHeaders() {
  const token = getAuthToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

function formatPrice(usd) {
  return formatPriceUSD(usd, activeCurrency);
}

function normalizeOrder(raw) {
  const invoiceUSD = raw.invoiceUSD != null
    ? Number(raw.invoiceUSD)
    : parseFloat(String(raw.invoice || '0').replace(/[^0-9.]/g, '')) || 0;

  return {
    id: raw.orderId || raw.id,
    format: raw.format || 'N/A',
    concept: raw.concept || 'N/A',
    referenceLink: raw.referenceLink || raw.link || 'N/A',
    email: raw.email || '',
    phone: raw.phone || raw.whatsapp || '',
    features: raw.features || [],
    assets: raw.assets || 0,
    invoiceUSD,
    currency: raw.currency || 'USD',
    invoiceDisplay: raw.invoiceDisplay || raw.invoice || formatPriceUSD(invoiceUSD, raw.currency || 'USD'),
    timelineWeeks: raw.timelineWeeks || 0,
    status: raw.status || 'Lead',
    statusCode: raw.statusCode || 'lead',
    createdAt: raw.createdAt || null,
  };
}

async function verifySession() {
  const token = getAuthToken();
  if (!token) return false;

  try {
    const res = await fetch(`${getApiBase()}/auth/verify`, { headers: authHeaders() });
    return res.ok;
  } catch {
    return false;
  }
}

async function login(password) {
  let res;
  try {
    res = await fetch(`${getApiBase()}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
  } catch {
    throw new Error('Cannot reach admin server. Run npm run dev in the portfolio folder.');
  }

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Invalid password.');
  }

  const data = await res.json();
  setAuthToken(data.token);
  return true;
}

async function loadOrders() {
  if (!getAuthToken()) {
    showLogin('Please sign in to view orders.');
    return;
  }

  try {
    const res = await fetch(`${getApiBase()}/orders`, { headers: authHeaders() });
    if (res.status === 401) throw new Error('Unauthorized');
    if (!res.ok) throw new Error('API unavailable');
    const data = await res.json();
    allOrders = data.map(normalizeOrder);
  } catch (err) {
    if (err.message === 'Unauthorized') {
      clearAuthToken();
      showLogin('Session expired. Please sign in again.');
      return;
    }
    console.warn('[admin] API fetch failed:', err.message);
    allOrders = [];
  }
}

const loginScreen = document.getElementById('admin-login-screen');
const adminApp = document.getElementById('admin-app');
const loginForm = document.getElementById('admin-login-form');
const loginError = document.getElementById('admin-login-error');
const tbody = document.getElementById('orders-tbody');
const detailOverlay = document.getElementById('order-detail-overlay');
const detailBody = document.getElementById('order-detail-body');

function showLogin(message = '') {
  document.body.classList.add('admin-login-active');
  if (loginScreen) loginScreen.hidden = false;
  if (adminApp) adminApp.hidden = true;
  if (loginError) loginError.textContent = message;
}

function showDashboard() {
  document.body.classList.remove('admin-login-active');
  if (loginScreen) loginScreen.hidden = true;
  if (adminApp) adminApp.hidden = false;
  if (loginError) loginError.textContent = '';
}

function openOrderDetail(order) {
  if (!detailOverlay || !detailBody) return;

  const featuresHtml = order.features.length
    ? `<ul class="detail-feature-list">${order.features.map(f => `<li>${f}</li>`).join('')}</ul>`
    : '<span class="detail-muted">No add-on features selected</span>';

  detailBody.innerHTML = `
    <div class="detail-grid">
      <div><span class="detail-label">Order ID</span><p>${order.id}</p></div>
      <div><span class="detail-label">Status</span><p><span class="status-badge status-${order.statusCode}">${order.status}</span></p></div>
      <div><span class="detail-label">Architecture</span><p>${order.format}</p></div>
      <div><span class="detail-label">Timeline</span><p>${order.timelineWeeks ? `${order.timelineWeeks} weeks` : '—'}</p></div>
      <div class="detail-span-2"><span class="detail-label">Email</span><p><a href="mailto:${order.email}">${order.email || '—'}</a></p></div>
      <div class="detail-span-2"><span class="detail-label">Phone / WhatsApp</span><p>${order.phone || '—'}</p></div>
      <div class="detail-span-2"><span class="detail-label">Concept</span><p>${order.concept}</p></div>
      <div class="detail-span-2"><span class="detail-label">Reference Link</span><p>${order.referenceLink !== 'N/A' ? `<a href="${order.referenceLink}" target="_blank" rel="noopener noreferrer">${order.referenceLink}</a>` : '—'}</p></div>
      <div><span class="detail-label">Reference Assets</span><p>${order.assets || 0} file(s)</p></div>
      <div><span class="detail-label">Invoice</span><p class="detail-invoice">${formatPrice(order.invoiceUSD)} <span class="detail-muted">(quoted in ${order.currency})</span></p></div>
      <div class="detail-span-2"><span class="detail-label">Selected Features</span>${featuresHtml}</div>
      ${order.createdAt ? `<div class="detail-span-2"><span class="detail-label">Submitted</span><p>${new Date(order.createdAt).toLocaleString()}</p></div>` : ''}
    </div>
  `;

  detailOverlay.classList.add('open');
  detailOverlay.setAttribute('aria-hidden', 'false');
}

function closeOrderDetail() {
  if (!detailOverlay) return;
  detailOverlay.classList.remove('open');
  detailOverlay.setAttribute('aria-hidden', 'true');
}

function renderTable() {
  if (!tbody) return;
  tbody.innerHTML = '';

  if (!allOrders.length) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;color:rgba(255,255,255,0.4);padding:32px;">No orders yet.</td></tr>`;
    return;
  }

  allOrders.forEach(order => {
    const tr = document.createElement('tr');
    tr.className = 'order-row';
    tr.tabIndex = 0;
    tr.setAttribute('role', 'button');
    tr.setAttribute('aria-label', `View order ${order.id}`);

    let assetsHtml = '<span style="color:rgba(255,255,255,0.2);">—</span>';
    if (order.assets > 0) {
      assetsHtml = `<div style="display:flex;gap:8px;flex-wrap:wrap;">`;
      for (let i = 0; i < order.assets; i++) {
        assetsHtml += `<div class="thumbnail" style="background:#333;border:1px solid #555;"></div>`;
      }
      assetsHtml += `</div>`;
    }

    const clientInfo = `
      <div style="font-family:monospace;font-weight:600;">${order.id}</div>
      ${order.email ? `<div style="font-size:0.75rem;color:rgba(255,255,255,0.55);margin-top:4px;">${order.email}</div>` : ''}
      ${order.phone ? `<div style="font-size:0.75rem;color:rgba(255,255,255,0.4);">${order.phone}</div>` : ''}
    `;

    tr.innerHTML = `
      <td data-label="Client ID" style="vertical-align:top;">${clientInfo}</td>
      <td data-label="Format" style="vertical-align:top;">${order.format}</td>
      <td data-label="Concept" style="max-width:260px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;vertical-align:top;" title="${order.concept}">${order.concept}</td>
      <td data-label="Assets" style="vertical-align:top;">${assetsHtml}</td>
      <td data-label="Invoice" class="invoice-cell" style="font-weight:900;vertical-align:top;">${formatPrice(order.invoiceUSD)}</td>
      <td data-label="Status" style="vertical-align:top;"><span class="status-badge status-${order.statusCode}">${order.status}</span></td>
    `;

    tr.addEventListener('click', () => openOrderDetail(order));
    tr.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openOrderDetail(order);
      }
    });

    tbody.appendChild(tr);
  });
}

async function bootDashboard() {
  showDashboard();
  await loadOrders();
  renderTable();
}

function setupCurrencySelect() {
  const currencySelect = document.getElementById('currency-select');
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
    localStorage.setItem('admin_currency', activeCurrency);
    renderTable();
    currencySelect.style.borderColor = '#4ade80';
    setTimeout(() => { currencySelect.style.borderColor = 'rgba(255,255,255,0.2)'; }, 800);
  });
}

async function init() {
  showLogin();

  loginForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const passwordInput = document.getElementById('admin-password');
    const password = passwordInput?.value || '';

    if (!password) return;

    try {
      if (loginError) loginError.textContent = '';
      await login(password);
      passwordInput.value = '';
      await bootDashboard();
    } catch (err) {
      if (loginError) loginError.textContent = err.message || 'Invalid password.';
    }
  });

  document.getElementById('btn-admin-logout')?.addEventListener('click', () => {
    clearAuthToken();
    closeOrderDetail();
    showLogin();
  });

  if (await verifySession()) {
    await bootDashboard();
  }

  setupCurrencySelect();

  document.getElementById('order-detail-close')?.addEventListener('click', closeOrderDetail);
  detailOverlay?.addEventListener('click', (e) => {
    if (e.target === detailOverlay) closeOrderDetail();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeOrderDetail();
  });

  const inputBuffer = document.getElementById('queue-buffer');
  const btnSave = document.getElementById('btn-save-buffer');
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

  document.getElementById('btn-refresh-orders')?.addEventListener('click', async () => {
    await loadOrders();
    renderTable();
  });
}

init();
