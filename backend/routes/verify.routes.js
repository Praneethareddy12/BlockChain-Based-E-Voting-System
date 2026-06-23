import express from "express";
import { verifyVote } from "../controllers/verify.controller.js";

const router = express.Router();
router.post("/", verifyVote);
export default router;
