import express from "express";
import { verifyVoter } from "../controllers/auth.controller.js";

const router = express.Router();
router.post("/verify", verifyVoter);
export default router;
