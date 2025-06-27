const CF_URL = 'https://asia-south1-logger-462111.cloudfunctions.net/logAll';

const levelToSeverity = {
  error: 'error',
  warn:  'warn',
  info:  'info',
  log:   'default',
};


function sendLog(level, args) {
  const severity = levelToSeverity[level] || 'DEFAULT';
  fetch(CF_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      severity : severity.toLowerCase(),
      textPayload: args.map(a => (typeof a === 'object' ? JSON.stringify(a) : String(a))).join(' '),
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent,
    }),
  }).catch(() => { /* silently ignore */ });
}

['log', 'info', 'warn', 'error'].forEach(level => {
  const orig = console[level].bind(console);
  console[level] = (...args) => {
    orig(...args);
    sendLog(level, args);
  };
});