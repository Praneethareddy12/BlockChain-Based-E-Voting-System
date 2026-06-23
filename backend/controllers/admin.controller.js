import { getBlockchain } from "../utils/blockchain.js";

/* ---------------- ELECTION STATE ---------------- */
let electionStatus = "OPEN";

/* ---------------- CANDIDATES (IN-MEMORY) ---------------- */
let candidates = [
  { id: 1, name: "Rahul Sharma", party: "NDA" },
  { id: 2, name: "Priya Verma", party: "PIP" },
  { id: 3, name: "Amit Patel", party: "BRP" },
  { id: 4, name: "Neha Iyer", party: "PDF" }
];

/* ---------------- ADMIN STATS ---------------- */
export const getAdminStats = (req, res) => {
  const chain = getBlockchain();

  let totalVotes = 0;
  const voteMap = {};

  chain.forEach(block => {
    if (block.data?.candidate) {
      totalVotes++;
      voteMap[block.data.candidate] =
        (voteMap[block.data.candidate] || 0) + 1;
    }
  });

  res.json({
    totalVotes,
    candidates: candidates.length,
    status: electionStatus,
    voteCount: voteMap
  });
};

/* ---------------- GET CANDIDATES ---------------- */
export const getCandidates = (req, res) => {
  const chain = getBlockchain();
  const voteMap = {};

  chain.forEach(block => {
    if (block.data?.candidate) {
      voteMap[block.data.candidate] =
        (voteMap[block.data.candidate] || 0) + 1;
    }
  });

  const result = candidates.map(c => ({
    ...c,
    votes: voteMap[c.name] || 0
  }));

  res.json({ candidates: result });
};

/* ---------------- ADD CANDIDATE ---------------- */
export const addCandidate = (req, res) => {
  const { name, party } = req.body;

  if (!name || !party) {
    return res.status(400).json({ success: false });
  }

  candidates.push({
    id: Date.now(),
    name,
    party
  });

  res.json({ success: true });
};

/* ---------------- DELETE CANDIDATE ---------------- */
export const deleteCandidate = (req, res) => {
  const { id } = req.params;
  candidates = candidates.filter(c => c.id != id);
  res.json({ success: true });
};

/* ---------------- TOGGLE VOTING ---------------- */
export const toggleVoting = (req, res) => {
  electionStatus = electionStatus === "OPEN" ? "CLOSED" : "OPEN";
  res.json({ status: electionStatus });
};
export const getElectionStatus = () => electionStatus;