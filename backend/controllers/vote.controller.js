import { addBlock, getBlockchain } from "../utils/blockchain.js";
import { getElectionStatus } from "./admin.controller.js";

/* ================= SECURITY METRICS ================= */
let suspiciousAttempts = 0;
let blockedVotes = 0;

/* ================= CAST VOTE ================= */
export const castVote = (req, res) => {
  const { voterId, candidate } = req.body;

  // Invalid input
  if (!voterId || !candidate) {
    blockedVotes++;
    return res.status(400).json({
      success: false,
      message: "Invalid vote data"
    });
  }

  // Voting closed
  if (getElectionStatus() !== "OPEN") {
    blockedVotes++;
    return res.json({
      success: false,
      message: "Voting is currently closed"
    });
  }

  const chain = getBlockchain();

  // Duplicate vote detection
  const alreadyVoted = chain.some(
    block => block.data?.voterId === voterId
  );

  if (alreadyVoted) {
    suspiciousAttempts++;
    blockedVotes++;
    return res.json({
      success: false,
      message: "Voter has already voted"
    });
  }

  const block = addBlock({ voterId, candidate });

  res.json({
    success: true,
    block
  });
};

/* ================= EXPORT SECURITY STATS ================= */
export const getSecurityMetrics = () => {
  return {
    suspiciousAttempts,
    blockedVotes
  };
};