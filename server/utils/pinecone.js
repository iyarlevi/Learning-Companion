const { Pinecone } = require("@pinecone-database/pinecone");
require("dotenv").config();

const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });

async function getIndex() {
  const index = await pinecone.index(process.env.PINECONE_INDEX);
  return index;
}

// Store a vector
async function storeEmbedding(embedding, text, fileId) {
  try {
    const index = await getIndex();
    await index.upsert([
      {
        id: `${fileId}-${Date.now()}`,
        values: embedding,
        metadata: { text, fileId },
      },
    ]);
  } catch (err) {
    console.error("Upsert Error:", err);
    throw err;
  }
}

// Query for similar vectors
async function queryPinecone(vector) {
  try {
    const index = await getIndex();
    const result = await index.query({
      vector,
      topK: 3,
      includeMetadata: true,
    });

    return result.matches.map((match) => ({
      score: match.score,
      text: match.metadata.text || "",
    }));
  } catch (err) {
    console.error("Query Error:", err);
    throw err;
  }
}

module.exports = {
  storeEmbedding,
  queryPinecone,
};
