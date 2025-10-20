const mongoose = require("mongoose");

const jobApplicationSchema = new mongoose.Schema({
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    required: true
  },
  candidate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  resumeUrl: String,
  coverLetter: String,
  status: {
    type: String,
    enum: ["applied", "rejected", "selected"],
    default: "applied"
  },
  appliedAt: { type: Date, default: Date.now }
}, { timestamps: true });

const JobApplication = mongoose.model("JobApplication", jobApplicationSchema);
module.exports = JobApplication;
