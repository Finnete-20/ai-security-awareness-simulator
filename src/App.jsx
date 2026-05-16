import { useState } from "react";
import axios from "axios";

export default function App() {
  const [message, setMessage] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;

  const analyzeMessage = async () => {
    if (!message.trim()) {
      setResult("Please enter a message to analyze.");
      return;
    }

    setLoading(true);
    setResult("");

    try {
      const res = await axios.post(
        "https://phishingdetector-backend.onrender.com/analyze",
        {
          message: message,
        }
      );

      // Handle both structured and unstructured responses safely
      if (res.data?.analysis) {
        setResult(JSON.stringify(res.data.analysis, null, 2));
      } else {
        setResult(JSON.stringify(res.data, null, 2));
      }

    } catch (error) {
      console.error(error);
      setResult(
        "Error connecting to backend. Check if the server is running or API is correct."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "30px", fontFamily: "Arial", maxWidth: "700px", margin: "0 auto" }}>
      
      <h1>🛡️ Phishing Detection Tool</h1>

      <p>Paste a suspicious message below to analyze it using AI.</p>

      <textarea
        rows="8"
        style={{ width: "100%", padding: "10px", fontSize: "14px" }}
        placeholder="Example: Your bank account is locked. Click here immediately..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <br /><br />

      <button
        onClick={analyzeMessage}
        disabled={loading}
        style={{
          padding: "10px 20px",
          cursor: "pointer",
          backgroundColor: loading ? "#ccc" : "#111",
          color: "#fff",
          border: "none",
          borderRadius: "6px"
        }}
      >
        {loading ? "Analyzing..." : "Analyze"}
      </button>

      <hr />

      <h3>Result:</h3>

      <pre style={{
        background: "#f4f4f4",
        padding: "15px",
        borderRadius: "6px",
        whiteSpace: "pre-wrap"
      }}>
        {result}
      </pre>
    </div>
  );
}