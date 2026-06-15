document.addEventListener('DOMContentLoaded', () => {
  const soulCursor = document.getElementById('soul-cursor');
  if (soulCursor) {
    let mouseX = 0;
    let mouseY = 0;
    let tick = false;
    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!tick) {
        requestAnimationFrame(() => {
          soulCursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
          tick = false;
        });
        tick = true;
      }
    }, { passive: true });
  }

  // Register Service Worker for caching and fast loading
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js')
        .then((reg) => console.log('[Service Worker] Registered successfully', reg.scope))
        .catch((err) => console.warn('[Service Worker] Registration failed', err));
    });
  }
});
