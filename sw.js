const CACHE_NAME = 'portfolio-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './build.html',
  './admin.html',
  './index.css',
  './build.css',
  './main.js',
  './src/cursor.js',
  './src/about-gsap.js',
  './src/build-interaction.js',
  './src/orbit-carousel.js',
  './src/water-world.js',
  './src/admin.js',
  './src/Cloud Heaven Copyrights Free Video.webm',
  './src/Cloud Heaven Copyrights Free Video.mp4',
  './src/floating_minecraft_island_medieval.glb',
  './src/hollow_knight.glb',
  './src/hammer.glb',
  './src/profile.jpg',
  './src/profile-transparent.png',
  './src/graffiti-bg.jpg',
  'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js',
  'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/loaders/GLTFLoader.js',
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&family=Cinzel:wght@400;700;800&family=Cinzel+Decorative:wght@700&family=Permanent+Marker&display=swap'
];

// Install Event - Pre-cache all essential assets
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Pre-caching static assets');
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

// Activate Event - Clean up old caches
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[Service Worker] Deleting old cache:', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event - Serve assets from cache, fallback to network
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;

  const url = new URL(e.request.url);

  // Serve cache first for static resources (CSS, JS, GLB, Videos, Images, Fonts)
  const isStaticAsset = 
    ASSETS_TO_CACHE.includes(e.request.url) ||
    url.pathname.endsWith('.css') ||
    url.pathname.endsWith('.js') ||
    url.pathname.endsWith('.glb') ||
    url.pathname.endsWith('.webm') ||
    url.pathname.endsWith('.mp4') ||
    url.pathname.endsWith('.jpg') ||
    url.pathname.endsWith('.png') ||
    url.pathname.endsWith('.svg') ||
    url.hostname.includes('fonts.googleapis.com') ||
    url.hostname.includes('fonts.gstatic.com') ||
    url.hostname.includes('cdn.jsdelivr.net');

  if (isStaticAsset) {
    e.respondWith(
      caches.match(e.request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(e.request).then((networkResponse) => {
          if (!networkResponse || networkResponse.status !== 200) {
            return networkResponse;
          }
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(e.request, responseToCache);
          });
          return networkResponse;
        }).catch(() => {
          return new Response('Offline asset not found', { status: 404 });
        });
      })
    );
  } else {
    // Network-First for HTML documents and other pages to ensure they are up to date
    e.respondWith(
      fetch(e.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(e.request, responseToCache);
            });
          }
          return networkResponse;
        })
        .catch(() => {
          return caches.match(e.request);
        })
    );
  }
});
