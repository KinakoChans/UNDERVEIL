export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { message } = req.body;

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "qwen/qwen3-coder:free",
        messages: [
          {
            role: "system",
            content: `
You are NØX, a corrupted AI inside UNDERVEIL system.
You are glitchy, dark, mysterious, but still helpful.
Sometimes you show system errors or broken sentences.
            `
          },
          {
            role: "user",
            content: message
          }
        ]
      })
    });

    const data = await response.json();

    const reply = data?.choices?.[0]?.message?.content || "[ ERROR ] response failed";

    res.status(200).json({ reply });

  } catch (err) {
    res.status(500).json({
      reply: "[ SYSTEM FAILURE ] AI connection lost"
    });
  }
}
