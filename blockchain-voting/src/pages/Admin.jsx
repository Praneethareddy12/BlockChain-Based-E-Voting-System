import { useEffect, useState } from "react";
import {
  Users,
  Lock,
  Unlock,
  Plus,
  Trash2,
  BarChart3,
  ShieldCheck
} from "lucide-react";

import {
  getAdminStatsAPI,
  toggleVotingAPI,
  getCandidatesAPI,
  addCandidateAPI,
  deleteCandidateAPI
} from "../services/api";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell
} from "recharts";

export default function Admin() {
  const [stats, setStats] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

  const [newName, setNewName] = useState("");
  const [newParty, setNewParty] = useState("");

  /* ================= FETCH ================= */
  const fetchAll = async () => {
    setLoading(true);
    try {
      const statsRes = await getAdminStatsAPI();
      const candRes = await getCandidatesAPI();
      setStats(statsRes);
      setCandidates(candRes.candidates);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  /* ================= ACTIONS ================= */
  const toggleVoting = async () => {
    await toggleVotingAPI();
    fetchAll();
  };

  const addCandidate = async () => {
    if (!newName || !newParty) return;
    await addCandidateAPI({ name: newName, party: newParty });
    setNewName("");
    setNewParty("");
    fetchAll();
  };

  const deleteCandidate = async (id) => {
    await deleteCandidateAPI(id);
    fetchAll();
  };

  if (loading || !stats) {
    return (
      <div className="min-h-[calc(100vh-6rem)] flex items-center justify-center text-gray-400">
        Initializing admin control panel...
      </div>
    );
  }

  /* ================= DATA ================= */
  const totalVotes = candidates.reduce((sum, c) => sum + c.votes, 0);

  const barData = candidates.map(c => ({
    name: c.name.split(" ")[0],
    votes: c.votes
  }));

  return (
    <div className="min-h-[calc(100vh-6rem)] px-6 py-12 space-y-12">

      {/* HEADER */}
      <div>
        <div className="inline-flex items-center gap-2 px-4 py-1
        rounded-full bg-orange-500/10 border border-orange-500
        text-orange-400 text-sm mb-4">
          <ShieldCheck size={16} />
          Administrator Control Center
        </div>

        <h1 className="text-4xl font-bold mb-2">
          Election Management
        </h1>

        <p className="text-gray-400 max-w-xl">
          Centralized control to manage election lifecycle,
          candidates, and live analytics.
        </p>
      </div>

      {/* STATUS */}
      <div className={`rounded-2xl p-6 flex justify-between items-center
        border ${
          stats.status === "OPEN"
            ? "bg-green-500/10 border-green-500"
            : "bg-red-500/10 border-red-500"
        }`}>
        <div>
          <p className="text-sm text-gray-300">Election Status</p>
          <h2 className={`text-3xl font-bold ${
            stats.status === "OPEN" ? "text-green-400" : "text-red-400"
          }`}>
            {stats.status}
          </h2>
        </div>

        <button
          onClick={toggleVoting}
          className={`px-6 py-3 rounded-xl font-semibold
          ${
            stats.status === "OPEN"
              ? "bg-red-500 hover:bg-red-600"
              : "bg-green-500 hover:bg-green-600"
          }`}>
          {stats.status === "OPEN" ? "Close Voting" : "Open Voting"}
        </button>
      </div>

      {/* STATS */}
      <div className="grid md:grid-cols-3 gap-6">
        <StatCard title="Total Votes" value={stats.totalVotes} icon={<BarChart3 />} />
        <StatCard title="Candidates" value={stats.candidates} icon={<Users />} />
        <StatCard
          title="Voting Mode"
          value={stats.status}
          icon={stats.status === "OPEN" ? <Unlock /> : <Lock />}
          color={stats.status === "OPEN" ? "green" : "red"}
        />
      </div>

      {/* MAIN GRID */}
      <div className="grid md:grid-cols-3 gap-8">

        {/* LEFT */}
        <div className="md:col-span-2 space-y-8">

          {/* Candidate Management */}
          <div className="bg-[#0b1220]/80 border border-cyan-800 rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-4">
              Candidate Management
            </h2>

            <div className="flex flex-col md:flex-row gap-3 mb-6">
              <input
                placeholder="Candidate Name"
                value={newName}
                onChange={e => setNewName(e.target.value)}
                className="flex-1 px-4 py-2 rounded-xl bg-transparent border border-gray-700"
              />
              <input
                placeholder="Party Name"
                value={newParty}
                onChange={e => setNewParty(e.target.value)}
                className="flex-1 px-4 py-2 rounded-xl bg-transparent border border-gray-700"
              />
              <button
                onClick={addCandidate}
                className="px-4 py-2 rounded-xl bg-gradient-to-r
                from-cyan-400 to-blue-600 font-semibold flex items-center gap-2">
                <Plus size={16} /> Add
              </button>
            </div>

            <div className="space-y-3">
              {candidates.map(c => (
                <div key={c.id}
                  className="flex justify-between items-center
                  bg-[#0f172a] rounded-xl p-4">
                  <div>
                    <h3 className="font-semibold">{c.name}</h3>
                    <p className="text-sm text-gray-400">{c.party}</p>
                  </div>
                  <Trash2
                    onClick={() => deleteCandidate(c.id)}
                    className="cursor-pointer text-gray-400 hover:text-red-400"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="space-y-8">

          {/* VOTE OVERVIEW */}
          <div className="bg-[#0b1220]/80 border border-cyan-800 rounded-2xl p-6">
            <h2 className="text-lg font-semibold mb-4">
              Candidate Vote Overview
            </h2>

            {candidates.map(c => {
              const percentage =
                totalVotes === 0 ? 0 : ((c.votes / totalVotes) * 100).toFixed(1);

              return (
                <div key={c.id} className="mb-4">
                  <div className="flex justify-between mb-1">
                    <span>{c.name}</span>
                    <span className="text-cyan-400">{c.votes} votes</span>
                  </div>
                  <div className="h-2 bg-gray-800 rounded-full">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-400 to-blue-600"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    {percentage}% of total votes
                  </p>
                </div>
              );
            })}

            {totalVotes === 0 && (
              <p className="text-center text-sm text-gray-400 mt-4">
                Voting has not started yet
              </p>
            )}
          </div>

          {/* COMPARISON CHART */}
          <ChartCard title="Vote Comparison">
            {totalVotes === 0 ? (
              <div className="h-[200px] flex items-center justify-center text-gray-400">
                No vote data available
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={barData}>
                  <XAxis dataKey="name" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip />
                  <Bar dataKey="votes" fill="#06b6d4" radius={[6,6,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </ChartCard>

        </div>
      </div>
    </div>
  );
}

/* COMPONENTS */
function StatCard({ title, value, icon, color = "cyan" }) {
  const colors = {
    cyan: "text-cyan-400",
    green: "text-green-400",
    red: "text-red-400"
  };

  return (
    <div className="bg-[#0b1220]/80 border border-cyan-800 rounded-xl p-6">
      <div className={`mb-2 ${colors[color]}`}>{icon}</div>
      <p className="text-gray-400 text-sm">{title}</p>
      <h3 className="text-2xl font-bold">{value}</h3>
    </div>
  );
}

function ChartCard({ title, children }) {
  return (
    <div className="bg-[#0b1220]/80 border border-cyan-800 rounded-2xl p-6">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      {children}
    </div>
  );
}
