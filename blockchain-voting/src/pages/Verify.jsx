import { useEffect, useState } from "react";
import {
  Search,
  BadgeCheck,
  CheckCircle,
  XCircle,
  Loader2
} from "lucide-react";
import { verifyTransactionAPI } from "../services/api";

export default function Verify() {
  const [txId, setTxId] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null); // "success" | "error"
  const [error, setError] = useState("");
  const [block, setBlock] = useState(null);

  // Auto-fill transaction ID from vote page
  useEffect(() => {
    const storedTx = localStorage.getItem("txId");
    if (storedTx) {
      setTxId(storedTx);
    }
  }, []);

  const handleVerify = async () => {
    if (!txId) {
      setError("Transaction ID is required");
      return;
    }

    setError("");
    setLoading(true);
    setResult(null);
    setBlock(null);

    try {
      const res = await verifyTransactionAPI(txId);

      if (res.verified) {
        setResult("success");
        setBlock(res.block);
      } else {
        setResult("error");
      }
    } catch (err) {
      setError("Server error while verifying transaction");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-6rem)] flex flex-col items-center justify-center px-6">

      {/* Header */}
      <div className="text-center mb-10 max-w-2xl">
        <div className="inline-flex items-center gap-2 px-4 py-1
        rounded-full bg-green-500/10 border border-green-500
        text-green-400 text-sm mb-6">
          <BadgeCheck size={16} />
          Audit & Verification
        </div>

        <h1 className="text-4xl font-bold">
          Verify Your Vote
        </h1>

        <p className="text-gray-400 mt-4">
          Verify that your vote exists on the blockchain and has not been altered
        </p>
      </div>

      {/* Input Box */}
      <div className="w-full max-w-3xl bg-[#0b1220]/80 backdrop-blur-md
      border border-cyan-800 rounded-2xl p-4 flex flex-col gap-4 shadow-lg">

        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Enter Transaction ID"
            value={txId}
            onChange={(e) => setTxId(e.target.value)}
            className="flex-1 px-4 py-3 bg-transparent
            border border-gray-700 rounded-xl
            focus:outline-none focus:border-cyan-500
            text-white placeholder-gray-500"
          />

          <button
            onClick={handleVerify}
            disabled={loading}
            className="
              px-6 py-3 rounded-xl font-semibold
              bg-gradient-to-r from-cyan-400 to-blue-600
              hover:scale-[1.02] transition
              flex items-center gap-2
              shadow-lg shadow-cyan-500/30
              disabled:opacity-60
            "
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                Verifying
              </>
            ) : (
              <>
                <Search size={18} />
                Verify
              </>
            )}
          </button>
        </div>

        {error && (
          <p className="text-red-400 text-sm">{error}</p>
        )}
      </div>

      {/* Result */}
      {result && (
        <div
          className={`mt-8 w-full max-w-xl rounded-2xl p-6
          border backdrop-blur-md text-center
          ${
            result === "success"
              ? "bg-green-500/10 border-green-500"
              : "bg-red-500/10 border-red-500"
          }`}
        >
          {result === "success" ? (
            <>
              <CheckCircle
                size={40}
                className="mx-auto mb-3 text-green-400"
              />
              <h3 className="text-xl font-semibold text-green-400">
                Vote Verified Successfully
              </h3>

              <div className="text-left mt-4 text-sm text-gray-300 space-y-1">
                <p><b>Transaction ID:</b> {block.id}</p>
                <p><b>Timestamp:</b> {block.timestamp}</p>
                <p><b>Hash:</b> {block.hash}</p>
                <p><b>Previous Hash:</b> {block.previousHash}</p>
              </div>
            </>
          ) : (
            <>
              <XCircle
                size={40}
                className="mx-auto mb-3 text-red-400"
              />
              <h3 className="text-xl font-semibold text-red-400">
                Transaction Not Found
              </h3>
              <p className="text-gray-300 mt-2 text-sm">
                Please check the transaction ID and try again
              </p>
            </>
          )}
        </div>
      )}

    </div>
  );
}
