const mongoose = require("mongoose")

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Job title is required"],
      trim: true,
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Job description is required"],
    },
    responsibility: {
      title: {
        type: String,
        default: "Key Responsibilities",
        trim: true,
      },
      list: {
        type: [String],
        validate: {
          validator: function (arr) {
            return arr.length > 0;
          },
          message: "At least one responsibility is required",
        },
      },
    },
    status: {
      type: String,
      enum: ["open", "closed", ""],
      default: "open",
    },
    requirements: {
      education: {
        type: String,
        required: [true, "Education requirement is required"],
      },
      experience: {
        type: String,
        required: [true, "Experience requirement is required"],
      },
      skills: {
        type: [String],
        validate: {
          validator: function (arr) {
            return arr.length > 0;
          },
          message: "At least one skill is required",
        },
      },
    },
    salary: {
      type: Number,
      min: [0, "Salary must be a positive number"],
      required: true,
    },
    type: {
      type: String,
      required: [true, "Employment type is required"],
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: [true, "Company is required"],
    },
  },
  { timestamps: true }
);


jobSchema.index({ title: "text", description: "text",role:"text" }); // Full-text search

const Job = mongoose.model("Job", jobSchema);
module.exports = Job
