import express from "express";
import { getAISecurityStats } from "../controllers/ai.controller.js";

const router = express.Router();
router.get("/", getAISecurityStats);
export default router;
