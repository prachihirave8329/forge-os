import express from "express";
import cors from "cors";
import "dotenv/config";

import { connectDB } from "./db";
import authRoutes from "./routes/auth";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

connectDB().then(() => {
  const port = process.env.PORT || 4000;

  app.listen(port, () => {
    console.log(`API on http://localhost:${port}`);
  });
});