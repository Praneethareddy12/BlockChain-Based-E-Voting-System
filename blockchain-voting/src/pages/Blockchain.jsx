import { useEffect, useState } from "react";
import { Database, RefreshCcw, Blocks } from "lucide-react";
import { getBlockchainAPI } from "../services/api";

export default function Blockchain() {
  const [blocks, setBlocks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchBlockchain = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await getBlockchainAPI();
      setBlocks(res.chain || []);
    } catch (err) {
      setError("Unable to fetch blockchain data");
    } finally {
      setLoading(false);
    }
  };

  // fetch on page load
  useEffect(() => {
    fetchBlockchain();
  }, []);

  return (
    <div className="min-h-[calc(100vh-6rem)] px-6 py-10">

      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1
        rounded-full bg-purple-500/10 border border-purple-500
        text-purple-400 text-sm mb-6">
          <Database size={16} />
          Blockchain Ledger
        </div>

        <h1 className="text-4xl font-bold">
          Blockchain Explorer
        </h1>

        <p className="text-gray-400 mt-4">
          View all recorded votes stored on the immutable blockchain
        </p>
      </div>

      {/* Refresh */}
      <div className="flex justify-end max-w-5xl mx-auto mb-4">
        <button
          onClick={fetchBlockchain}
          disabled={loading}
          className="flex items-center gap-2 text-gray-400 hover:text-cyan-400"
        >
          <RefreshCcw
            size={18}
            className={loading ? "animate-spin" : ""}
          />
          Refresh
        </button>
      </div>

      {/* Blockchain Data */}
      <div className="max-w-5xl mx-auto bg-[#0b1220]/80 backdrop-blur-md
      border border-cyan-800 rounded-2xl p-6 shadow-lg">

        {loading && (
          <p className="text-gray-400 text-center">
            Fetching blockchain data...
          </p>
        )}

        {error && (
          <p className="text-red-400 text-center">
            {error}
          </p>
        )}

        {!loading && blocks.length === 0 && (
          <div className="text-center text-gray-400 py-10">
            <Blocks size={40} className="mx-auto mb-4 opacity-50" />
            <p>No blocks found</p>
          </div>
        )}

        {!loading && blocks.length > 0 && (
          <div className="space-y-4">
            {blocks.map((block, index) => (
              <div
                key={index}
                className="bg-[#111827] rounded-xl p-4"
              >
                <p className="text-sm text-gray-400 mb-1">
                  Block #{index}
                </p>

                <p className="text-sm">
                  <span className="text-gray-400">Transaction ID:</span>{" "}
                  <span className="text-cyan-400">{block.id}</span>
                </p>

                <p className="text-sm">
                  <span className="text-gray-400">Timestamp:</span>{" "}
                  {block.timestamp}
                </p>

                <p className="text-xs break-all mt-2">
                  <span className="text-gray-400">Hash:</span>{" "}
                  {block.hash}
                </p>

                <p className="text-xs break-all mt-1">
                  <span className="text-gray-400">Previous Hash:</span>{" "}
                  {block.previousHash}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
