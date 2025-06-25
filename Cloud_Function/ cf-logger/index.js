// index.js
exports.logAll = (req, res) => {
  // --- 1) Handle CORS preflight ---
  if (req.method === 'OPTIONS') {
    res.set({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    });
    return res.status(204).send('');   // <— must return here!
  }

  // --- 2) Extract your payload ---
  const { level, args, url, userAgent, timestamp } = req.body || {};
  const msg = Array.isArray(args)
    ? args.map(a => (typeof a === 'string' ? a : JSON.stringify(a))).join(' ')
    : JSON.stringify(args);

  // --- 3) Mirror to console at the right severity ---
  switch (level) {
    case 'error':
      console.error(`[${timestamp}]`, msg, { url, userAgent });
      break;
    case 'warn':
      console.warn (`[${timestamp}]`, msg, { url, userAgent });
      break;
    default:
      console.log (`[${timestamp}] [${level}]`, msg, { url, userAgent });
  }

  // --- 4) Return success AND allow CORS on the actual response ---
  res.set('Access-Control-Allow-Origin', '*');
  return res.status(204).send('');
};
