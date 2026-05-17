import React, { useState } from "react";

const CLAUDE_API_KEY = "Sk-ant-api03-SLeSWnTHohitKOToRTaw6haVCMPV_8o7ehGrwzvtvFGtr1SGvUE6_URqoVPKNvfqfcnobayM94q87NPovJic2g-BrsaDQAA";

export default function App() {
  const [level, setLevel] = useState("SS1");
  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = () => {
    if (!topic || !subject) return alert("Enter subject and topic!");
    setLoading(true);
    setTimeout(() => { fetchAISolution(); }, 3000); 
  };

  const fetchAISolution = async () => {
    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": CLAUDE_API_KEY,
          "anthropic-version": "2023-06-01",
          "dangerouslyAllowBrowser": "true"
        },
        body: JSON.stringify({
          model: "claude-3-5-sonnet-20240620",
          max_tokens: 1000,
          system: `You are the Lumina National Tutor. Level: ${level}. Format: JSON. Keys: "title", "explanation", "nigerianContext", "waecTip".`,
          messages: [{ role: "user", content: `Explain ${topic} in ${subject}` }]
        })
      });
      const data = await response.json();
      setResult(JSON.parse(data.content[0].text));
    } catch (error) {
      alert("Error! Check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: "#070712", color: "#e2e8f0", minHeight: "100vh", padding: "20px", fontFamily: "sans-serif" }}>
      <h1>Lumina PRO</h1>
      <div style={{ background: "#111126", padding: "20px", borderRadius: "20px", marginBottom: "20px" }}>
        <select value={level} onChange={(e) => setLevel(e.target.value)} style={inputStyle}>
          <option>JSS 1-3</option><option>SS 1</option><option>SS 2</option><option>SS 3</option><option>JAMB</option>
        </select>
        <input placeholder="Subject" onChange={(e)=>setSubject(e.target.value)} style={inputStyle} />
        <input placeholder="Topic" onChange={(e)=>setTopic(e.target.value)} style={inputStyle} />
        <button onClick={handleGenerate} disabled={loading} style={btnStyle}>
          {loading ? "📺 Loading Ad..." : "🔓 Unlock Guide"}
        </button>
      </div>
      {result && (
        <div style={{ background: "#111126", padding: "20px", borderRadius: "20px", border: "1px solid #10b981" }}>
          <h2>{result.title}</h2>
          <p>{result.explanation}</p>
          <p><strong>🇳🇬 Context:</strong> {result.nigerianContext}</p>
          <p style={{ color: "#a78bfa" }}><strong>✍️ Tip:</strong> {result.waecTip}</p>
        </div>
      )}
    </div>
  );
}

const inputStyle = { width: "100%", padding: "12px", marginBottom: "15px", borderRadius: "10px", backgroundColor: "#070712", color: "white", boxSizing: "border-box", border: "1px solid #1f1f3d" };
const btnStyle = { width: "100%", padding: "15px", borderRadius: "12px", border: "none", color: "white", fontWeight: "bold", backgroundColor: "#a78bfa" };
