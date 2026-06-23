import CryptoJS from "crypto-js";
import { v4 as uuid } from "uuid";
import fs from "fs";

const FILE_PATH = "./blockchain.json";

// Load blockchain from file
let blockchain = fs.existsSync(FILE_PATH)
  ? JSON.parse(fs.readFileSync(FILE_PATH))
  : [];

const saveBlockchain = () => {
  fs.writeFileSync(FILE_PATH, JSON.stringify(blockchain, null, 2));
};

export const addBlock = (data) => {
  const previousHash =
    blockchain.length === 0
      ? "GENESIS"
      : blockchain[blockchain.length - 1].hash;

  const block = {
    id: uuid(),
    timestamp: new Date().toISOString(),
    data,
    previousHash,
    hash: CryptoJS.SHA256(
      JSON.stringify(data) + previousHash
    ).toString()
  };

  blockchain.push(block);
  saveBlockchain();
  return block;
};

export const getBlockchain = () => blockchain;