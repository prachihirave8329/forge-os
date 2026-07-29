import express from "express";
import LifecycleStep from "../models/LifecycleStep";
import Project from "../models/Project";
import { requireAuth } from "../middleware/requireAuth";
import { requireAdmin } from "../middleware/requireAdmin";

const router = express.Router();

const phases = [
  "Planning",
  "Analysis",
  "Design",
  "Development",
  "Testing",
  "Deployment",
  "Maintenance",
] as const;

/*
Get lifecycle steps of a project
*/
router.get("/:projectId", requireAuth, async (req, res) => {
  try {
    const steps = await LifecycleStep.find({
      project: req.params.projectId,
    }).sort({ createdAt: 1 });

    res.json(steps);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

/*
Tick / Untick lifecycle step
*/
router.patch("/step/:stepId", requireAuth, async (req, res) => {
  try {
    const { completed } = req.body;

    const step = await LifecycleStep.findByIdAndUpdate(
      req.params.stepId,
      { completed },
      {  returnDocument: "after" }
    );

    if (!step) {
      return res.status(404).json({
        message: "Step not found",
      });
    }

    res.json(step);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

/*
Advance project phase (Admin Only)
*/
router.patch(
  "/advance/:projectId",
  requireAuth,
  requireAdmin,
  async (req, res) => {
    try {
      const project = await Project.findById(req.params.projectId);

      if (!project) {
        return res.status(404).json({
          message: "Project not found",
        });
      }

      const currentIndex = phases.indexOf(project.lifecyclePhase);

      if (currentIndex === phases.length - 1) {
        return res.status(400).json({
          message: "Project is already in the final phase.",
        });
      }

     project.lifecyclePhase = phases[currentIndex + 1] as typeof phases[number];

      await project.save();

      res.json(project);
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: "Server Error",
      });
    }
  }
);

export default router;