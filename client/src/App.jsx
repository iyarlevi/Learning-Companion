import "./App.css";
import UploadPDF from "./components/UploadPDF";
import QueryForm from "./components/QueryForm";
import ChatBox from "./components/ChatBox";
import SummaryBox from "./components/SummaryBox";

function App() {
  return (
    <div>
      <h1>AI Learning Companion</h1>
      <UploadPDF />
      <SummaryBox />
      <ChatBox />
    </div>
  );
}

export default App;
