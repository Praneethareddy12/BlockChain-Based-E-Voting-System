import { useNavigate } from "react-router-dom";
import { ArrowRight, Link2 } from "lucide-react";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="
  min-h-[calc(100vh-6rem)]
  flex flex-col justify-center items-center
  text-center px-6
  -translate-y-6
  bg-transparent
">
      {/* Status Badge */}
      <div className="mb-6 px-4 py-1 rounded-full
        bg-cyan-500/10 border border-cyan-500
        text-cyan-400 text-sm">
        System Online • Blockchain Active
      </div>

      {/* Heading */}
      <h1 className="text-4xl md:text-6xl font-bold mb-6">
        The Future of{" "}
        <span className="bg-gradient-to-r from-cyan-400 to-blue-500
        bg-clip-text text-transparent">
          Democratic Voting
        </span>
      </h1>

      {/* Description */}
      <p className="text-gray-400 max-w-2xl mb-10">
        SecureVote leverages blockchain technology to deliver a transparent,
        tamper-proof, and auditable electronic voting system trusted worldwide.
      </p>

      {/* Buttons */}
      <div className="flex flex-wrap justify-center gap-4">
        
        {/* Start Voting */}
        <button
          onClick={() => navigate("/vote")}
          className="
            px-6 py-3 rounded-xl font-semibold
            bg-gradient-to-r from-cyan-400 to-blue-600
            flex items-center gap-2
            hover:scale-105 transition
            shadow-lg shadow-cyan-500/30
          "
        >
          Start Voting <ArrowRight size={18} />
        </button>

        {/* Explore Blockchain */}
        <button
          onClick={() => navigate("/blockchain")}
          className="
            px-6 py-3 rounded-xl font-semibold
            border border-cyan-500 text-cyan-400
            flex items-center gap-2
            hover:bg-cyan-500/10 transition
          "
        >
          <Link2 size={18} />
          Explore Blockchain
        </button>
      </div>
    </section>
  );
}
