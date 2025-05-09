const { OpenAI } = require("openai");
require("dotenv").config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function generateAnswer(question, contextChunks) {
  const contextText = contextChunks
    .map((c, i) => `(${i + 1}) ${c.text}`)
    .join("\n\n");

  const prompt = `
Answer the question based on the context below. Be concise and clear.

Context:
${contextText}

Question: ${question}
`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4", // or "gpt-3.5-turbo"
    messages: [
      { role: "system", content: "You are a helpful study assistant." },
      { role: "user", content: prompt },
    ],
    temperature: 0.5,
  });

  return completion.choices[0].message.content;
}

module.exports = generateAnswer;
