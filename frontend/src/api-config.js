export function getApiBase() {
  const meta = document.querySelector('meta[name="portfolio-api"]');
  if (meta?.content) {
    return `${meta.content.replace(/\/$/, '')}/api`;
  }
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return 'http://localhost:3001/api';
  }
  // Replace with your deployed backend URL
  return 'https://thabith.onrender.com/api';
}
