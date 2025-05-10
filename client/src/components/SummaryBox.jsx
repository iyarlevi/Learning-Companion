import { useState } from "react";
import axios from "axios";
import "./SummaryBox.css";

const SummaryBox = () => {
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSummarize = async () => {
    setLoading(true);
    setError("");
    setSummary("");

    try {
      const res = await axios.post("http://localhost:5000/api/summarize");
      setSummary(res.data.summary);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch summary.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="summary-box">
      <h2>📄 Document Summary</h2>
      <button onClick={handleSummarize} disabled={loading}>
        {loading ? "Summarizing..." : "Summarize Document"}
      </button>

      {error && <p className="error">{error}</p>}

      {summary && (
        <div className="summary-output">
          <h3>Summary:</h3>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
};

export default SummaryBox;
