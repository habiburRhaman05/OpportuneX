const mongoose = require("mongoose")
const JobSchema = new mongoose.Schema(
  {
    jobTitle: { type: String, required: true, minlength: 3, trim: true },
    company: { type: String, required: true, minlength: 2, trim: true },

    companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true },

    location: { type: String, required: true, minlength: 2, trim: true },
    status: { type: String, default:"panding"},
    jobType: {
      type: String,
      enum: ["Full-time", "Part-time", "Contract", "Remote"],
      required: true,
    },
    experience: {
      type: String,
      enum: ["Entry-level", "Mid-level", "Senior", "Executive"],
      required: true,
    },
    salaryType: {
      type: String,
      enum: ["fixed", "range", "discuss"],
      required: true,
    },
    salaryMin: Number,
    salaryMax: Number,
    salaryAmount: Number,
    deadline: { type: Date, required: true },
    description: { type: String, required: true, minlength: 50 },
    responsibilities: { type: String, required: true, minlength: 20 },
    qualifications: { type: String, required: true, minlength: 20 },
    benefits: {
      type: [String],
      required: true,
      validate: [(v) => v.length > 0, "Add at least one benefit"],
    },
    searchTags: {
      type: [String],
      required: true,
      validate: [(v) => v.length > 0, "Add at least one search tag"],
      index: true,
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Recruiter", required: true },
  },
  { timestamps: true }
);

JobSchema.index({ title: "text", description: "text",role:"text" }); // Full-text search

const Job = mongoose.model("Job", JobSchema);
module.exports = Job
