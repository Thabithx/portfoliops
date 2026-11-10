const CACHE_NAME = 'portfolio-v8';

const HEAVY_ASSETS = [
  './src/floating_minecraft_island_medieval.glb',
  './src/hollow_knight.glb',
  './src/hammer.glb',
  './src/profile-transparent.png',
  './src/graffiti-bg.jpg',
];

const CDN_ASSETS = [
  'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js',
  'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/loaders/GLTFLoader.js',
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&family=Cinzel:wght@400;700;800&family=Cinzel+Decorative:wght@700&family=Permanent+Marker&display=swap',
];

async function cacheAssetsSafely(cache, urls) {
  await Promise.allSettled(
    urls.map(async (url) => {
      try {
        const res = await fetch(url);
        if (res.ok) await cache.put(url, res);
      } catch {
        // Skip missing or blocked assets — one failure must not break install
      }
    })
  );
}

function isHeavyAsset(url, requestUrl) {
  return HEAVY_ASSETS.includes(requestUrl) ||
    url.pathname.startsWith('/src/experience-previews/') ||
    url.pathname.endsWith('.glb') ||
    url.pathname.endsWith('.webm') ||
    url.pathname.endsWith('.mp4') ||
    url.pathname.endsWith('.jpg') ||
    url.pathname.endsWith('.png') ||
    url.hostname.includes('fonts.googleapis.com') ||
    url.hostname.includes('fonts.gstatic.com') ||
    url.hostname.includes('cdn.jsdelivr.net');
}

function isAppShell(url) {
  return url.pathname.endsWith('.html') ||
    url.pathname.endsWith('.css') ||
    url.pathname.endsWith('.js');
}

async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse && networkResponse.status === 200) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch {
    const cached = await caches.match(request);
    if (cached) return cached;
    return new Response('Offline — asset unavailable', { status: 503 });
  }
}

async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;

  try {
    const networkResponse = await fetch(request);
    if (networkResponse && networkResponse.status === 200) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch {
    return new Response('Offline asset not found', { status: 404 });
  }
}

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cacheAssetsSafely(cache, [...HEAVY_ASSETS, ...CDN_ASSETS]))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((key) => key !== CACHE_NAME ? caches.delete(key) : null))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;

  const url = new URL(e.request.url);
  if (url.origin !== self.location.origin && !url.hostname.includes('cdn.jsdelivr.net') &&
      !url.hostname.includes('fonts.googleapis.com') && !url.hostname.includes('fonts.gstatic.com')) {
    return;
  }

  if (isHeavyAsset(url, e.request.url)) {
    e.respondWith(cacheFirst(e.request));
  } else if (isAppShell(url)) {
    e.respondWith(networkFirst(e.request));
  }
});
