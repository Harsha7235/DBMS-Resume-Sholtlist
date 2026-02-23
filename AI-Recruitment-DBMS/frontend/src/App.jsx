import { useState } from "react";
import axios from "axios";

function App() {
  const [resumeId, setResumeId] = useState("");
  const [jobId, setJobId] = useState("");
  const [score, setScore] = useState(null);

  const calculateScore = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/calculate/${resumeId}/${jobId}`
      );
      setScore(response.data.score);
    } catch (error) {
      console.error(error);
      alert("Error calculating score");
    }
  };

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>AI Recruitment Dashboard</h1>

      <input
        type="number"
        placeholder="Resume ID"
        value={resumeId}
        onChange={(e) => setResumeId(e.target.value)}
      />

      <br /><br />

      <input
        type="number"
        placeholder="Job ID"
        value={jobId}
        onChange={(e) => setJobId(e.target.value)}
      />

      <br /><br />

      <button onClick={calculateScore}>
        Calculate AI Score
      </button>

      {score !== null && (
        <h2>Match Score: {score.toFixed(2)}%</h2>
      )}
    </div>
  );
}

export default App;