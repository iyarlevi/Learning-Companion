import { useState } from "react";
import axios from "axios";
import "./ChatBox.css";

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    const newMessage = { role: "user", message: question };
    setMessages((prev) => [...prev, newMessage]);
    setQuestion("");
    setLoading(true);
    setError("");

    try {
      const res = await axios.post("http://localhost:5000/api/query", {
        question,
      });

      const answer = res.data?.answer || "No relevant answer found.";

      setMessages((prev) => [...prev, { role: "ai", message: answer }]);
    } catch (err) {
      console.error(err);
      setError("Failed to get response from server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chatbox">
      <div className="messages">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`message ${msg.role === "user" ? "user" : "ai"}`}
          >
            <p>{msg.message}</p>
          </div>
        ))}
        {loading && <div className="message ai">Thinking...</div>}
      </div>

      <form onSubmit={sendMessage} className="input-area">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask your document something..."
        />
        <button type="submit" disabled={loading}>
          Send
        </button>
      </form>

      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default ChatBox;
