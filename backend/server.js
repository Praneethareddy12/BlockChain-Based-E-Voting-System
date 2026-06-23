import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import voteRoutes from "./routes/vote.routes.js";
import blockchainRoutes from "./routes/blockchain.routes.js";
import verifyRoutes from "./routes/verify.routes.js";
import aiRoutes from "./routes/ai.routes.js";
import adminRoutes from "./routes/admin.routes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/vote", voteRoutes);
app.use("/api/blockchain", blockchainRoutes);
app.use("/api/verify", verifyRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/admin", adminRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
