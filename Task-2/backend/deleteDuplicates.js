import mongoose from "mongoose";
import Job from "./models/Job.js";

await mongoose.connect("mongodb://127.0.0.1:27017/mydailywork");

console.log("Connected to DB");

// Find duplicates by title + company
const jobs = await Job.find();

let seen = new Set();
let deleteIds = [];

jobs.forEach(job => {
  const key = `${job.title}-${job.company}`;
  if (seen.has(key)) {
    deleteIds.push(job._id);
  } else {
    seen.add(key);
  }
});

if (deleteIds.length === 0) {
  console.log("No duplicates found.");
  process.exit();
}

await Job.deleteMany({ _id: { $in: deleteIds } });

console.log(`Duplicates deleted: ${deleteIds.length}`);
process.exit();
