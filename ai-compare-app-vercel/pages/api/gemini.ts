export default async function handler(req, res) {
  const { key, prompt } = req.body;
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${key}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    }
  );
  const data = await response.json();
  const output =
    data.candidates?.[0]?.content?.parts?.[0]?.text || data.promptFeedback?.blockReason || "No response";
  res.status(200).json({ output });
}