import { useEffect, useState } from "react";
import "./App.css";
import UploadPDF from "./components/UploadPDF";
import QueryForm from "./components/QueryForm";

function App() {
  return (
    <div>
      <h1>AI Learning Companion</h1>
      <UploadPDF />
      <QueryForm />
    </div>
  );
}

export default App;
