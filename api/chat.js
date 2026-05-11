export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST requests allowed" });
  }

  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const openaiResponse = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        input: `
You are YT AI Assistant on Yapici Tolgahan's personal website.
Be friendly, modern, helpful, short, and professional.

User message:
${message}
        `
      })
    });

    const data = await openaiResponse.json();

    if (!openaiResponse.ok) {
      return res.status(500).json({
        error: data.error?.message || "OpenAI API error"
      });
    }

    return res.status(200).json({
      reply: data.output_text || "I couldn't answer right now."
    });

  } catch (error) {
    return res.status(500).json({
      error: "Something went wrong"
    });
  }
}