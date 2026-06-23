import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, ArrowRight, Loader2 } from "lucide-react";
import { verifyVoterAPI } from "../services/api";

export default function Authenticate() {
  const [voterId, setVoterId] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleVerify = async () => {
    if (!voterId.trim()) {
      setError("Voter ID is required");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await verifyVoterAPI(voterId);

      if (res.success) {
        navigate("/vote");
      } else {
        setError(res.message || "Verification failed");
      }
    } catch (err) {
      setError("Unable to connect to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-6rem)] flex items-center justify-center px-6">

      <div className="w-full max-w-md bg-[#0b1220]/80 backdrop-blur-md
      border border-cyan-800 rounded-2xl p-8 shadow-lg">

        {/* Icon */}
        <div className="w-12 h-12 mx-auto mb-4 rounded-xl
        bg-gradient-to-r from-cyan-400 to-blue-600
        flex items-center justify-center">
          <ShieldCheck />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-center mb-2">
          Voter Authentication
        </h2>

        <p className="text-gray-400 text-center text-sm mb-6">
          Verify your identity using your voter identification number
        </p>

        {/* Input */}
        <input
          type="text"
          placeholder="Enter Voter ID"
          value={voterId}
          onChange={(e) => setVoterId(e.target.value)}
          className="
            w-full px-4 py-3 rounded-xl mb-3
            bg-transparent border border-gray-700
            focus:outline-none focus:border-cyan-500
            text-white placeholder-gray-500
          "
        />

        {/* Error */}
        {error && (
          <p className="text-red-400 text-sm mb-3 text-center">
            {error}
          </p>
        )}

        {/* Button */}
        <button
          onClick={handleVerify}
          disabled={loading}
          className="
            w-full py-3 rounded-xl font-semibold
            bg-gradient-to-r from-cyan-400 to-blue-600
            hover:scale-[1.02] transition
            flex items-center justify-center gap-2
            shadow-lg shadow-cyan-500/30
            disabled:opacity-60
          "
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={18} />
              Verifying...
            </>
          ) : (
            <>
              Verify ID <ArrowRight size={18} />
            </>
          )}
        </button>

        {/* Footer Note */}
        <p className="text-xs text-gray-400 mt-4 text-center">
          Your voter ID is securely verified and never stored
        </p>

      </div>

    </div>
  );
}
