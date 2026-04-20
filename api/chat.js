module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { message } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;

  const MODELS = ['gemini-1.5-flash', 'gemini-1.5-pro', 'gemini-pro'];
  const VERSIONS = ['v1beta', 'v1'];

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
        }
      } catch (err) {
        console.error(`Failed ${model}:`, err);
      }
    }
  }

  return res.status(500).json({ error: 'All models failed. Please check your API Key in Vercel.' });
};
