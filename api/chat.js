module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  // Handle both parsed and raw bodies
  const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  const message = body?.message;
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) return res.status(500).json({ error: 'API Key missing in Vercel settings.' });
  if (!message) return res.status(400).json({ error: 'No message provided.' });

  const MODELS = ['gemini-1.5-flash', 'gemini-1.5-pro', 'gemini-pro'];
  const VERSIONS = ['v1beta', 'v1'];

  let lastGoogleError = 'No response from Google';

  for (const version of VERSIONS) {
    for (const model of MODELS) {
      const url = `https://generativelanguage.googleapis.com/${version}/models/${model}:generateContent?key=${apiKey}`;
      
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: message }] }]
          })
        });

        const data = await response.json();
        
        if (response.ok) {
          return res.status(200).json(data);
        } else {
          lastGoogleError = data.error?.message || JSON.stringify(data);
        }
      } catch (err) {
        lastGoogleError = err.message;
      }
    }
  }

  return res.status(500).json({ error: `Google Rejected: ${lastGoogleError}` });
};
