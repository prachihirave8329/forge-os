import express from "express";
import Project from "../models/Project";
import User from "../models/User";
import { requireAuth } from "../middleware/requireAuth";
import { requireAdmin } from "../middleware/requireAdmin";
import LifecycleStep from "../models/LifecycleStep";
const lifecycleTemplate = [
  {
    phase: "Planning",
    steps: [
      "Gather Requirements",
      "Define Scope",
      "Identify Stakeholders",
    ],
  },
  {
    phase: "Analysis",
    steps: [
      "Analyze Requirements",
      "Risk Assessment",
    ],
  },
  {
    phase: "Design",
    steps: [
      "Create UI Design",
      "Design Database",
    ],
  },
  {
    phase: "Development",
    steps: [
      "Build Backend",
      "Build Frontend",
    ],
  },
  {
    phase: "Testing",
    steps: [
      "Unit Testing",
      "Integration Testing",
    ],
  },
  {
    phase: "Deployment",
    steps: [
      "Deploy Backend",
      "Deploy Frontend",
    ],
  },
  {
    phase: "Maintenance",
    steps: [
      "Bug Fixes",
      "Performance Improvements",
    ],
  },
];
const router = express.Router();

  // create project (admin only)
router.post("/", requireAuth, requireAdmin, async (req, res) => {
  try {
    const { name, description } = req.body;

// create the project with the lifecycle steps
    const project = await Project.create({
      name,
      description,
      owner: req.user?.id,
      members: [],
      lifecyclePhase: "Planning"
    });// Create lifecycle checklist
const lifecycleSteps = lifecycleTemplate.flatMap((phase) =>
  phase.steps.map((title) => ({
    project: project._id,
    phase: phase.phase,
    title,
  }))
);

await LifecycleStep.insertMany(lifecycleSteps);
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
      projects = await Project.find()//projects = await Project.find()If the user is an admin, this queries the database to find every single project in the collection.
        .populate("owner", "name email")
        .populate("members", "name email");
    } else {
      /*if (req.user?.role === "admin") {
        // Checks if the logged-in user has an admin role. 
        // It uses optional chaining (?.) to safely read the role without throwing an error if req.user is undefined.
      }*/
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
//Queries the database to find all user documents. 
// The .select("-passwordHash") chain explicitly excludes the passwordHash field from the results for security.
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
/* 
(member: any) => member._id.toString() === req.user?.id
This is the condition checked for every member:(member: any): Loops through each member object
 (typed as any).member._id.toString(): Converts the database ObjectID (_id) of the member into a standard text
  string.=== req.user?.id: Compares that string to the logged-in user's ID. The ?. (optional chaining) prevents a crash if req.user is missing.
*/
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
      { returnDocument: "after" }
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