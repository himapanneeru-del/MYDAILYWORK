// backend/index.js
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import jobRoutes from "./routes/jobRoutes.js";

const app = express(); // <--- THIS WAS MISSING

app.use(cors());
app.use(express.json());

app.use("/api", jobRoutes);

mongoose
  .connect("mongodb://127.0.0.1:27017/jobboard")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));

app.listen(5000, () => console.log("Backend running on port 5000"));
