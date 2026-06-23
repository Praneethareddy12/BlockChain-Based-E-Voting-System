import express from "express";
import {
  getAdminStats,
  toggleVoting,
  getCandidates,
  addCandidate,
  deleteCandidate
} from "../controllers/admin.controller.js";

const router = express.Router();

router.get("/stats", getAdminStats);
router.post("/toggle", toggleVoting);

router.get("/candidates", getCandidates);
router.post("/candidate", addCandidate);
router.delete("/candidate/:id", deleteCandidate);

export default router;
