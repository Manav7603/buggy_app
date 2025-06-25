// src/logger.js
// Replace <PROJECT> with your actual project ID or leave the full URL:
const CF_URL = 'https://asia-south1-logger-462111.cloudfunctions.net/logAll';

function sendLog(level, args) {
  fetch(CF_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      level,
      args,
      url: window.location.href,
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString(),
    }),
  }).catch(() => { /* silently ignore */ });
}

// Override all console methods
['log', 'info', 'warn', 'error'].forEach(level => {
  const orig = console[level].bind(console);
  console[level] = (...args) => {
    orig(...args);
    sendLog(level, args);
  };
});
