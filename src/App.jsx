import { useState } from "react";
import axios from "axios";

function App() {
  const [message, setMessage] = useState("");
  const [result, setResult] = useState("");

  const analyzeMessage = async () => {
    try {
      const res = await axios.post("http://127.0.0.1:8000/analyze", {
        message: message,
      });

      setResult(res.data.result);
    } catch (err) {
      setResult("Error connecting to backend");
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Phishing Detection Tool</h1>

      <textarea
        rows="6"
        cols="60"
        placeholder="Paste email or message here..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <br />

      <button onClick={analyzeMessage} style={{ marginTop: "10px" }}>
        Analyze
      </button>

      <h2>Result:</h2>
      <pre>{result}</pre>
    </div>
  );
}

export default App;