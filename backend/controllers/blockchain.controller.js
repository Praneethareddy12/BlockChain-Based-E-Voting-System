import { getBlockchain } from "../utils/blockchain.js";

export const getBlocks = (req, res) => {
  const chain = getBlockchain();
  res.json({ chain });
};
