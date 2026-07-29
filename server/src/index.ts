import express from "express";
import cors from "cors";
import "dotenv/config";
import projectRoutes from "./routes/projects";
import { connectDB } from "./db";
import authRoutes from "./routes/auth";
import ideaRoutes from "./routes/ideas";
import taskRoutes from "./routes/tasks";
import lifecycleRoutes from "./routes/lifecycle";
import path from "path";
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/ideas", ideaRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/lifecycle", lifecycleRoutes);
app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});
app.use(
  "/uploads",
  express.static(path.join(__dirname, "../uploads"))
);
connectDB().then(() => {
  const port = process.env.PORT || 4000;

  app.listen(port, () => {
    console.log(`API on http://localhost:${port}`);
  });
});