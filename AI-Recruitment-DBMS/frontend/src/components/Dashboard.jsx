import { useEffect, useState } from "react";
import axios from "axios";
import { FaUsers, FaBriefcase, FaCheckCircle } from "react-icons/fa";

export default function Dashboard() {
  const [analytics, setAnalytics] = useState({});
  const [candidates, setCandidates] = useState([]);
  const [resumeId, setResumeId] = useState("");
  const [jobId, setJobId] = useState("");
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/analytics")
      .then(res => setAnalytics(res.data));

    axios.get("http://127.0.0.1:8000/candidates")
      .then(res => setCandidates(res.data));
  }, []);

  const calculateScore = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `http://127.0.0.1:8000/calculate/${resumeId}/${jobId}`
      );

      if (res.data.error) {
        alert(res.data.error);
        setLoading(false);
        return;
      }

      setScore(res.data.score);
    } catch {
      alert("Server error or invalid ID");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen p-8 text-white">

      <h1 className="text-4xl font-bold text-center mb-10 tracking-wide">
        AI Recruitment Dashboard
      </h1>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">

        <div className="bg-gray-800 p-6 rounded-xl shadow-xl hover:shadow-blue-500/50 transition duration-300">
          <FaUsers className="text-blue-400 text-3xl mb-2" />
          <p>Total Candidates</p>
          <h2 className="text-2xl font-bold">{analytics.candidates}</h2>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl shadow-xl hover:shadow-purple-500/50 transition duration-300">
          <FaBriefcase className="text-purple-400 text-3xl mb-2" />
          <p>Total Jobs</p>
          <h2 className="text-2xl font-bold">{analytics.jobs}</h2>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl shadow-xl hover:shadow-green-500/50 transition duration-300">
          <FaCheckCircle className="text-green-400 text-3xl mb-2" />
          <p>Shortlisted</p>
          <h2 className="text-2xl font-bold">{analytics.shortlisted}</h2>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl shadow-xl hover:shadow-pink-500/50 transition duration-300">
          <p>Applications</p>
          <h2 className="text-2xl font-bold">{analytics.applications}</h2>
        </div>

      </div>

      {/* AI Screening */}
      <div className="bg-gray-800 p-8 rounded-xl shadow-2xl max-w-2xl mx-auto">

        <h2 className="text-2xl mb-6 font-semibold">AI Resume Screening</h2>

        <input
          type="number"
          placeholder="Resume ID"
          className="w-full mb-4 p-3 rounded bg-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
          value={resumeId}
          onChange={(e) => setResumeId(e.target.value)}
        />

        <input
          type="number"
          placeholder="Job ID"
          className="w-full mb-4 p-3 rounded bg-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
          value={jobId}
          onChange={(e) => setJobId(e.target.value)}
        />

        <button
          onClick={calculateScore}
          className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-blue-500/70 transition duration-300"
        >
          {loading ? "Analyzing..." : "Evaluate Candidate"}
        </button>

        {score !== null && (
          <div className="mt-6 text-center">
            <h3 className="text-xl">
              Match Score:
              <span className="ml-2 text-green-400 font-bold">
                {score.toFixed(2)}%
              </span>
            </h3>
          </div>
        )}

      </div>

      {/* Candidates Table */}
      <div className="mt-16">
        <h2 className="text-2xl mb-6">Candidates</h2>

        <div className="overflow-x-auto">
          <table className="w-full bg-gray-800 rounded-xl">
            <thead>
              <tr className="text-left border-b border-gray-600">
                <th className="p-4">Name</th>
                <th className="p-4">Education</th>
                <th className="p-4">Experience</th>
              </tr>
            </thead>
            <tbody>
              {candidates.map(c => (
                <tr key={c.id} className="border-b border-gray-700 hover:bg-gray-700 transition">
                  <td className="p-4">{c.name}</td>
                  <td className="p-4">{c.education}</td>
                  <td className="p-4">{c.experience} yrs</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}