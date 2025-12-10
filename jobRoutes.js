import express from "express";
import Job from "../models/Job.js";

const router = express.Router();

// CREATE job
router.post("/jobs", async (req, res) => {
  try {
    const job = await Job.create(req.body);
    res.json(job);
  } catch (err) {
    res.status(500).send("Failed to create job");
  }
});

// GET all jobs
router.get("/jobs", async (req, res) => {
  try {
    const jobs = await Job.find().sort({ _id: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).send("Failed to fetch jobs");
  }
});

// DELETE job (used by delete button or duplicates script)
router.delete("/jobs/:id", async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).send("Failed to delete");
  }
});

export default router;
