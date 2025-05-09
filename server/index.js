const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

const getEmbedding = require("./utils/openai");
const parsePDF = require("./utils/pdfParser");
const storeEmbedding = require("./utils/pinecone");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("AI Learning Companion API is running 🚀");
});

app.get("/api", (req, res) => {
  res.send("Backend is connected to Vite! 🧠");
});

// Create uploads folder if it doesn't exist
const uploadPath = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath);

// Multer storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    if (ext !== ".pdf") return cb(new Error("Only PDFs allowed"));
    cb(null, true);
  },
});

// POST /api/upload
app.post("/api/upload", upload.single("pdf"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  try {
    const pdfPath = req.file.path;
    const pdfText = await parsePDF(pdfPath);

    const chunk = pdfText.slice(0, 2000); // Shorten input
    const embedding = await getEmbedding(chunk);

    await storeEmbedding(embedding, chunk, req.file.filename); // ✅ Store in Pinecone

    res.status(200).json({
      message: "File uploaded, embedded, and stored in Pinecone!",
      preview: chunk.slice(0, 1000) + "...",
    });
  } catch (err) {
    console.error("PDF Processing Error:", err);
    res.status(500).json({ message: "Error processing PDF" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
