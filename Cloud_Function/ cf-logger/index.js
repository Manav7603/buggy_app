// exports.logAll = (req, res) => {
//   if (req.method === 'OPTIONS') {
//     res.set({
//       'Access-Control-Allow-Origin': '*',
//       'Access-Control-Allow-Methods': 'POST, OPTIONS',
//       'Access-Control-Allow-Headers': 'Content-Type',
//     });
//     return res.status(204).send('');
//   }

//   let { severity = 'default', textPayload, timestamp, url, userAgent } = req.body || {};
//   severity = severity.toLowerCase();

//   const meta = `[${timestamp}] ${url} • ${userAgent}`;
//   switch (severity) {
//     case 'error':
//       console.error(meta, textPayload);
//       break;
//     case 'warn':
//     case 'warning':
//       console.warn(meta, textPayload);
//       break;
//     case 'info':
//       console.info(meta, textPayload);
//       break;
//     default:
//       console.log(meta, textPayload);
//   }

//   res.set('Access-Control-Allow-Origin', '*');
//   return res.status(204).send('');
// };
exports.logAll = (req, res) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.set({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    });
    return res.status(204).send('');
  }

  // Destructure incoming payload
  let { severity = 'ERROR', textPayload = '', timestamp, url, userAgent } = req.body || {};
  severity = severity.toUpperCase();

  // Build a structured log entry
  const logEntry = {
    severity,       // must be one of: "ERROR","WARNING","INFO","DEFAULT"
    timestamp,
    url,
    userAgent,
    message: textPayload
  };

  // Always write JSON to stdout
  console.log(JSON.stringify(logEntry));

  // CORS on final response
  res.set('Access-Control-Allow-Origin', '*');
  return res.status(204).send('');
};
