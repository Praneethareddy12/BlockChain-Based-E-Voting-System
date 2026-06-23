import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function CTA() {
  const navigate = useNavigate();

  return (
    <section className="py-24 text-center px-6">
      
      <h2 className="text-4xl font-bold mb-4">
        Ready to Cast Your Vote?
      </h2>

      <p className="text-gray-400 mb-8 max-w-xl mx-auto">
        Join millions of citizens who trust SecureVote for secure and
        transparent democratic participation.
      </p>

      <button
        onClick={() => navigate("/authenticate")}
        className="
          px-8 py-4 rounded-xl font-semibold
          bg-gradient-to-r from-cyan-400 to-blue-600
          hover:scale-105 transition
          shadow-lg shadow-cyan-500/30
          flex items-center gap-2 mx-auto
        "
      >
        Begin Authentication <ArrowRight size={18} />
      </button>

    </section>
  );
}
