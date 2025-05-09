import { useState } from "react";
import axios from "axios";
import "./QueryForm.css";

const QueryForm = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResults([]);
    setAnswer("");

    try {
      const res = await axios.post("http://localhost:5000/api/query", {
        question,
      });

      setAnswer(res.data.answer); // 👈 new line
      setResults(res.data.matches || []); // in case matches is undefined
    } catch (err) {
      console.error(err);
      setError("Failed to get response from server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="query-form">
      <h2>Ask a Question 📚</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask something from your uploaded document..."
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Thinking..." : "Ask"}
        </button>
      </form>

      {error && <p className="error">{error}</p>}

      {answer && (
        <div className="answer">
          <h3>Answer:</h3>
          <p>{answer}</p>
        </div>
      )}

      {results.length > 0 && (
        <div className="results">
          <h3>Relevant Chunks:</h3>
          <ul>
            {results.map((r, i) => (
              <li key={i}>
                <strong>Score:</strong> {r.score.toFixed(2)}
                <p>{r.text}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default QueryForm;
