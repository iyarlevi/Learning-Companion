const { OpenAI } = require("openai");
require("dotenv").config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const getEmbedding = async (text) => {
  const response = await openai.embeddings.create({
    model: "text-embedding-3-small", // or 'text-embedding-ada-002' if preferred
    input: text,
  });

  return response.data[0].embedding;
};

module.exports = getEmbedding;
