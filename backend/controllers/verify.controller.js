import { getBlockchain } from "../utils/blockchain.js";

export const verifyVote = (req, res) => {
  const { transactionId } = req.body;

  const found = getBlockchain().find(
    block => block.id === transactionId
  );

  res.json({
    verified: !!found,
    block: found || null
  });
};
