// Using built-in fetch (available in Node 18+)
module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: message }] }]
      })
    });

    const data = await response.json();
    
    // If Google returns an error, pass the error message back to the frontend
    if (!response.ok) {
      return res.status(response.status).json({ 
        error: data.error?.message || 'Google API Error',
        details: data
      });
    }

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Server Error: ' + error.message });
  }
};
