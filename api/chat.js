export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Only POST requests allowed"
    });
  }

  try {

    const { message } = req.body;

    const response = await fetch(
      "https://api.openai.com/v1/responses",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",

          Authorization:
            `Bearer ${process.env.OPENAI_API_KEY}`
        },

        body: JSON.stringify({
          model: "gpt-5.4-mini",

          input: [
            {
              role: "system",

              content:
                "You are YT AI Assistant on Yapici Tolgahan's personal website. Be friendly, modern, helpful, and professional."
            },

            {
              role: "user",
              content: message
            }
          ]
        })
      }
    );

    const data = await response.json();

    return res.status(200).json({
      reply:
        data.output_text ||
        "I couldn't answer right now."
    });

  } catch (error) {

    return res.status(500).json({
      error: "Something went wrong"
    });

  }
}