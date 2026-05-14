import { useState } from "react";
import axios from "axios";

const API_URL = "https://phishingdetector-backend.onrender.com";

export default function App() {
  const [message, setMessage] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyzeMessage = async () => {
    setLoading(true);
    setResult(null);

    try {
      const res = await axios.post(`${API_URL}/analyze`, {
        message: message,
      });

      setResult(res.data);
    } catch (error) {
      console.log("Backend error:", error);

      setResult({
        error: "Error connecting to backend",
        details: error.message,
      });
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Phishing Detection Tool</h1>

      <textarea
        rows="6"
        cols="60"
        placeholder="Paste suspicious email or message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <br />

      <button onClick={analyzeMessage} style={{ marginTop: "10px" }}>
        Analyze
      </button>

      {loading && <p>Analyzing...</p>}

      {result && (
        <pre style={{ background: "#eee", padding: "10px", marginTop: "10px" }}>
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
}