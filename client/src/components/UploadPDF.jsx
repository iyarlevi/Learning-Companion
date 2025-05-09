import { useState } from "react";

function UploadPDF() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("pdf", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setMessage(`${data.message}\n\nPreview:\n${data.preview}`);
    } catch (err) {
      setMessage("Upload failed");
    }
  };

  return (
    <div>
      <h2>Upload Your Notes</h2>
      <form onSubmit={handleUpload}>
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button type="submit">Upload</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default UploadPDF;
