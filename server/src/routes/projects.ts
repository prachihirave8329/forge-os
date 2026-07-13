import express from "express";
import Project from "../models/Project";
import User from "../models/User";
import { requireAuth } from "../middleware/requireAuth";
import { requireAdmin } from "../middleware/requireAdmin";

const router = express.Router();

  // create project (admin only)
router.post("/", requireAuth, requireAdmin, async (req, res) => {
  try {
    const { name, description } = req.body;

    const lifecycleSteps = [
      // Planning
      { phase: "Planning", label: "Write the project scope and goals", done: false },
      { phase: "Planning", label: "List the main requirements", done: false },
      { phase: "Planning", label: "Agree the timeline with the team", done: false },

      // Analysis
      { phase: "Analysis", label: "Gather detailed requirements from stakeholders", done: false },
      { phase: "Analysis", label: "Review and confirm the requirements", done: false },
      { phase: "Analysis", label: "Note risks and constraints", done: false },

      // Design
      { phase: "Design", label: "Decide the architecture and tech stack", done: false },
      { phase: "Design", label: "Design the data model", done: false },
      { phase: "Design", label: "Write the software design document (SDD)", done: false },

      // Coding
      { phase: "Coding", label: "Set up the repository and environment", done: false },
      { phase: "Coding", label: "Build the core features", done: false },
      { phase: "Coding", label: "Produce a working prototype", done: false },

      // Testing
      { phase: "Testing", label: "Write and run tests", done: false },
      { phase: "Testing", label: "Fix the bugs that surface", done: false },
      { phase: "Testing", label: "Confirm the app meets the requirements", done: false },

      // Deployment
      { phase: "Deployment", label: "Prepare the production environment", done: false },
      { phase: "Deployment", label: "Deploy the application", done: false },
      { phase: "Deployment", label: "Confirm end users can access it", done: false },

      // Maintenance
      { phase: "Maintenance", label: "Monitor the application", done: false },
      { phase: "Maintenance", label: "Fix bugs and improve performance", done: false },
      { phase: "Maintenance", label: "Keep documentation updated", done: false },
    ];

    const project = await Project.create({
      name,
      description,
      owner: req.user?.id,
      members: [],
      lifecyclePhase: "Planning",
      lifecycleSteps,
    });

    res.status(201).json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

//get all projects for the logged-in user (admin sees all projects, members see only their projects)

router.get("/", requireAuth, async (req, res) => {
  try {
    let projects;

    if (req.user?.role === "admin") {
      projects = await Project.find()
        .populate("owner", "name email")
        .populate("members", "name email");
    } else {
      projects = await Project.find({
        members: req.user?.id,
      })
        .populate("owner", "name email")
        .populate("members", "name email");
    }

    res.json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

//get all users (admin only)  

router.get("/users/all", requireAuth, requireAdmin, async (req, res) => {
  try {
    const users = await User.find().select("-passwordHash");

    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

//get a single project by ID (admin sees all projects, members see only their projects)

router.get("/:id", requireAuth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate("owner", "name email")
      .populate("members", "name email");

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    const isMember = project.members.some(
      (member: any) => member._id.toString() === req.user?.id
    );

    if (req.user?.role !== "admin" && !isMember) {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    res.json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

//update project (admin only)

router.put("/:id", requireAuth, requireAdmin, async (req, res) => {
  try {
    const { name, description } = req.body;

    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { name, description },
      { new: true }
    );

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    res.json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// assign member (admin only)

router.post("/:id/members", requireAuth, requireAdmin, async (req, res) => {
  try {
    const { userId } = req.body;

    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    const alreadyAssigned = project.members.some(
      (member: any) => member.toString() === userId
    );

    if (!alreadyAssigned) {
      project.members.push(userId);
      await project.save();
    }

    res.json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

//remove member (admin only)

router.delete(
  "/:id/members/:userId",
  requireAuth,
  requireAdmin,
  async (req, res) => {
    try {
      const project = await Project.findById(req.params.id);

      if (!project) {
        return res.status(404).json({
          message: "Project not found",
        });
      }

      project.members = project.members.filter(
        (member: any) => member.toString() !== req.params.userId
      );

      await project.save();

      res.json(project);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  }
);

//delete project (admin only)

router.delete("/:id", requireAuth, requireAdmin, async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    res.json({
      message: "Project deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;