import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, Loader2 } from "lucide-react";

import {
  castVoteAPI,
  getCandidatesAPI
} from "../services/api";

export default function Vote() {
  const navigate = useNavigate();

  const [voterId, setVoterId] = useState("");
  const [candidate, setCandidate] = useState("");
  const [candidates, setCandidates] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* ================= FETCH CANDIDATES ================= */
  useEffect(() => {
    getCandidatesAPI()
      .then(res => {
        setCandidates(res.candidates || []);
      })
      .catch(() => {
        setError("Unable to load candidates");
      });
  }, []);

  /* ================= CAST VOTE ================= */
  const handleVote = async () => {
    if (!voterId || !candidate) {
      setError("Please enter Voter ID and select a candidate");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await castVoteAPI({
        voterId,
        candidate
      });

      // 🔴 HANDLE FAILURE (DUPLICATE / CLOSED VOTING)
      if (!res.success) {
        setError(res.message || "Voting failed");
        return;
      }

      // ✅ SUCCESS
      localStorage.setItem("txId", res.block.id);
      navigate("/verify");

    } catch (err) {
      setError("Server error. Unable to cast vote.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-6rem)] flex items-center justify-center px-6">

      <div className="w-full max-w-md bg-[#0b1220]/80 backdrop-blur-md
      border border-cyan-800 rounded-2xl p-8 shadow-lg">

        <h2 className="text-2xl font-bold text-center mb-2">
          Cast Your Vote
        </h2>

        <p className="text-gray-400 text-center text-sm mb-6">
          Select a candidate and securely submit your vote
        </p>

        {/* VOTER ID */}
        <input
          type="text"
          placeholder="Enter Voter ID"
          value={voterId}
          onChange={(e) => setVoterId(e.target.value)}
          className="w-full px-4 py-3 mb-4 rounded-xl
          bg-transparent border border-gray-700
          focus:outline-none focus:border-cyan-500"
        />

        {/* CANDIDATE SELECT */}
        <select
          value={candidate}
          onChange={(e) => setCandidate(e.target.value)}
          className="w-full px-4 py-3 mb-4 rounded-xl
          bg-[#0b1220] text-white
          border border-cyan-800
          focus:outline-none focus:ring-2 focus:ring-cyan-500"
        >
          <option value="" disabled className="text-gray-400">
            Select Candidate
          </option>

          {candidates.map((c) => (
            <option
              key={c.id}
              value={c.name}
              className="bg-[#020617] text-white"
            >
              {c.name} — {c.party}
            </option>
          ))}
        </select>

        {/* ERROR MESSAGE */}
        {error && (
          <div className="bg-red-500/10 border border-red-500
          text-red-400 text-sm px-4 py-2 rounded-xl
          text-center mb-4">
            {error}
          </div>
        )}

        {/* CAST VOTE BUTTON */}
        <button
          onClick={handleVote}
          disabled={loading}
          className="w-full py-3 rounded-xl font-semibold
          bg-gradient-to-r from-cyan-400 to-blue-600
          hover:scale-[1.02] transition
          flex items-center justify-center gap-2
          shadow-lg shadow-cyan-500/30
          disabled:opacity-60"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={18} />
              Casting Vote...
            </>
          ) : (
            <>
              <CheckCircle size={18} />
              Cast Vote
            </>
          )}
        </button>

        <p className="text-xs text-gray-400 mt-4 text-center">
          Your vote is encrypted and immutably stored on the blockchain
        </p>

      </div>
    </div>
  );
}