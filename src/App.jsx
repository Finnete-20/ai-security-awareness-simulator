import { useState } from "react";
import axios from "axios";

export default function App() {
  const [message, setMessage] = useState("");
  const [result, setResult] = useState("");

  const analyzeMessage = async () => {
    try {
      const res = await axios.post(
        "https://phishingdetector-backend.onrender.com/analyze",
        {
          message: message,
        }
      );

      setResult(JSON.stringify(res.data, null, 2));

    } catch (error) {
      setResult("Error connecting to backend");
      console.log(error);
    }
  };

  return (
    <div style={{ padding: "30px", fontFamily: "Arial" }}>
      <h1>Phishing Detection Tool</h1>

      <textarea
        rows="6"
        cols="60"
        placeholder="Paste suspicious message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <br />

      <button onClick={analyzeMessage}>
        Analyze
      </button>

      <pre>{result}</pre>
    </div>
  );
}

