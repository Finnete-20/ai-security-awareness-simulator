import { useState } from "react";
import axios from "axios";

export default function App() {
  const [message, setMessage] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyzeMessage = async () => {
    setLoading(true);

    try {
      const res = await axios.post(
        "https://phishingdetector-backend.onrender.com/analyze",
        {
          message: message,
        }
      );

      setResult(res.data);

    } catch (error) {
      setResult({
        error: "Could not connect to backend",
      });
    }

    setLoading(false);
  };

  const getRiskColor = (score) => {
    if (score >= 8) return "#ff4d4d";
    if (score >= 5) return "#ffaa00";
    return "#2ecc71";
  };

  return (
    <div
      style={{
        fontFamily: "Arial",
        background: "#f5f7fb",
        minHeight: "100vh",
        padding: "40px",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          background: "white",
          padding: "30px",
          borderRadius: "16px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
        }}
      >
        <h1 style={{ color: "#1f2937" }}>
          AI Phishing Detection Tool
        </h1>

        <p style={{ color: "#666" }}>
          Analyze suspicious emails and detect phishing attempts using AI-powered cybersecurity reasoning.
        </p>

        <textarea
          rows="8"
          placeholder="Paste suspicious email or message here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{
            width: "100%",
            marginTop: "20px",
            padding: "15px",
            borderRadius: "10px",
            border: "1px solid #ccc",
            fontSize: "15px",
          }}
        />

        <button
          onClick={analyzeMessage}
          disabled={loading}
          style={{
            marginTop: "20px",
            background: "#2563eb",
            color: "white",
            border: "none",
            padding: "14px 24px",
            borderRadius: "10px",
            fontSize: "16px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          {loading ? "Analyzing..." : "Analyze Message"}
        </button>

        {result && (
          <div
            style={{
              marginTop: "30px",
              background: "#f9fafb",
              padding: "25px",
              borderRadius: "12px",
              border: "1px solid #ddd",
            }}
          >
            {result.error ? (
              <p style={{ color: "red" }}>
                {result.error}
              </p>
            ) : (
              <>
                <h2>
                  Risk Score:
                  <span
                    style={{
                      color: getRiskColor(result.risk_score),
                      marginLeft: "10px",
                    }}
                  >
                    {result.risk_score}/10
                  </span>
                </h2>

                <p>
                  <strong>Attack Type:</strong>{" "}
                  {result.attack_type}
                </p>

                <div style={{ marginTop: "20px" }}>
                  <strong>Phishing Indicators:</strong>
                  <ul>
                    {result.phishing_indicators?.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div style={{ marginTop: "20px" }}>
                  <strong>Social Engineering Tactics:</strong>
                  <ul>
                    {result.social_engineering_tactics?.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div style={{ marginTop: "20px" }}>
                  <strong>Recommended Action:</strong>
                  <p>{result.recommended_action}</p>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}