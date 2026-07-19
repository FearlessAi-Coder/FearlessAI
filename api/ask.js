const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ answer: "Method not allowed" });
  }

  try {
    const { question } = req.body;

    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: question,
    });

    res.status(200).json({
      answer: response.output_text,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      answer: "FearlessAI is having trouble connecting.",
    });
  }
};
