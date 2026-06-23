import { getBlockchain } from "../utils/blockchain.js";
import { getSecurityMetrics } from "./vote.controller.js";

export const getAISecurityStats = (req, res) => {
  const chain = getBlockchain();
  const { suspiciousAttempts, blockedVotes } = getSecurityMetrics();

  const cleanVotes = chain.length;
  const monitored = cleanVotes + blockedVotes;

  res.json({
    monitored,
    clean: cleanVotes,
    suspicious: suspiciousAttempts,
    blocked: blockedVotes
  });
};