import { useEffect, useState } from "react";
import {
  ShieldAlert,
  Eye,
  CheckCircle,
  XCircle,
  AlertTriangle
} from "lucide-react";
import { getAISecurityStatsAPI } from "../services/api";

export default function AISecurity() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    getAISecurityStatsAPI().then(setStats);
  }, []);

  if (!stats) {
    return (
      <div className="min-h-[calc(100vh-6rem)] flex items-center justify-center text-gray-400">
        Initializing AI security engine...
      </div>
    );
  }

  const riskLevel =
    stats.blocked > 0
      ? "HIGH"
      : stats.suspicious > 3
      ? "MEDIUM"
      : "LOW";

  return (
    <div className="min-h-[calc(100vh-6rem)] px-6 py-12">

      {/* Header */}
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-1
        rounded-full bg-red-500/10 border border-red-500 text-red-400 text-sm mb-6">
          <ShieldAlert size={16} />
          AI Threat Intelligence
        </div>

        <h1 className="text-4xl font-bold">
          Election Security Monitor
        </h1>

        <p className="text-gray-400 mt-4 max-w-xl mx-auto">
          AI-powered anomaly detection continuously monitors voting activity
          to protect election integrity.
        </p>
      </div>

      {/* Risk Status */}
      <div className="max-w-4xl mx-auto mb-12
      bg-[#0b1220]/80 border border-cyan-800
      rounded-2xl p-6 flex items-center justify-between">

        <div>
          <p className="text-gray-400 text-sm">Current Risk Level</p>
          <h2
            className={`text-3xl font-bold ${
              riskLevel === "HIGH"
                ? "text-red-400"
                : riskLevel === "MEDIUM"
                ? "text-yellow-400"
                : "text-green-400"
            }`}
          >
            {riskLevel}
          </h2>
        </div>

        <AlertTriangle
          size={42}
          className={`${
            riskLevel === "HIGH"
              ? "text-red-400"
              : riskLevel === "MEDIUM"
              ? "text-yellow-400"
              : "text-green-400"
          }`}
        />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto">

        <SecurityCard
          title="Votes Monitored"
          value={stats.monitored}
          icon={<Eye />}
          color="cyan"
        />

        <SecurityCard
          title="Clean Activity"
          value={stats.clean}
          icon={<CheckCircle />}
          color="green"
        />

        <SecurityCard
          title="Suspicious"
          value={stats.suspicious}
          icon={<AlertTriangle />}
          color="yellow"
        />

        <SecurityCard
          title="Blocked"
          value={stats.blocked}
          icon={<XCircle />}
          color="red"
        />

      </div>

      {/* Footer */}
      <p className="text-xs text-gray-400 text-center mt-10">
        AI models analyze behavioral patterns, transaction velocity,
        and anomaly scores in real time.
      </p>
    </div>
  );
}

function SecurityCard({ title, value, icon, color }) {
  const colors = {
    cyan: "text-cyan-400",
    green: "text-green-400",
    yellow: "text-yellow-400",
    red: "text-red-400"
  };

  return (
    <div className="bg-[#0b1220]/80 backdrop-blur-md
    border border-cyan-800 rounded-2xl p-6">

      <div className={`mb-3 ${colors[color]}`}>
        {icon}
      </div>

      <p className="text-gray-400 text-sm">{title}</p>
      <h3 className="text-3xl font-bold mt-1">{value}</h3>
    </div>
  );
}
