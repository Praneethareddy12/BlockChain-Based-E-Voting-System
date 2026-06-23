import express from "express";
import { getBlocks } from "../controllers/blockchain.controller.js";

const router = express.Router();
router.get("/", getBlocks);
export default router;
