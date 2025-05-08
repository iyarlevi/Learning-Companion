import { useEffect, useState } from "react";
import "./App.css";
import UploadPDF from "./UploadPDF";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api")
      .then((res) => res.text())
      .then((data) => setMessage(data));
  }, []);

  return (
    <div>
      <h1>AI Learning Companion</h1>
      <UploadPDF />
    </div>
  );
}

export default App;
