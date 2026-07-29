import express from "express";
import Idea from "../models/Idea";
import { requireAuth } from "../middleware/requireAuth";
import upload from "../middleware/upload";

const router = express.Router();

/*
Create Idea
Supports:
- text
- link
- image
- video
- document
*/
router.post(
  "/",
  requireAuth,
  upload.single("file"),
  async (req, res) => {
    try {
      const { title, type, content, projectId } = req.body;

      let finalContent = content;

      // If a file is uploaded, save its filename instead of the content field
      if (req.file) {
        finalContent = req.file.filename;
      }

      const idea = await Idea.create({
        title,
        type,
        content: finalContent,
        project: projectId,
        createdBy: req.user?.id,
      });

      res.status(201).json(idea);
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: "Server Error",
      });
    }
  }
);

/*
Get all ideas for a project
*/
router.get("/:projectId", requireAuth, async (req, res) => {
  try {
    const ideas = await Idea.find({
      project: req.params.projectId,
    })
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });

    res.json(ideas);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

/*
Update Idea
*/
router.put("/:id", requireAuth, async (req, res) => {
  try {
    const idea = await Idea.findByIdAndUpdate(
      req.params.id,
      req.body,
      {  returnDocument: "after" }
    );

    if (!idea) {
      return res.status(404).json({
        message: "Idea not found",
      });
    }

    res.json(idea);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

/*
Delete Idea
*/
router.delete("/:id", requireAuth, async (req, res) => {
  try {
    const idea = await Idea.findByIdAndDelete(req.params.id);

    if (!idea) {
      return res.status(404).json({
        message: "Idea not found",
      });
    }

    res.json({
      message: "Idea deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

export default router;