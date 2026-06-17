export function getApiBase() {
  const meta = document.querySelector('meta[name="portfolio-api"]');
  if (meta?.content) {
    return `${meta.content.replace(/\/$/, '')}/api`;
  }
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return 'http://localhost:3001/api';
  }
  // Use deployed backend URL for production
  return 'https://thabith.onrender.com/api';
}
