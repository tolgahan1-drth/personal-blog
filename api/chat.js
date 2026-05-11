export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "Yuce Tolgahan Yapicinin Kisisel asistaniyim,siz aciz insanlara yardim etmek icin burdayiz."
          },
          {
            role: "user",
            content: message
          }
        ],
        max_tokens: 250
      })
    });

    const data = await openaiRes.json();

    if (!openaiRes.ok) {
      return res.status(500).json({
        error: data.error?.message || "OpenAI API error"
      });
    }

    const reply = data.choices?.[0]?.message?.content;

    return res.status(200).json({
      reply: reply || "I could not generate a response."
    });
  } catch (error) {
    return res.status(500).json({
      error: "Server error"
    });
  }
}