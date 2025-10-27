const mongoose = require("mongoose");

const recruiterSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    profilePhoto: {
      type: String, // URL or file path
      default: null,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    emailOtp: {
      type: Number,
      default: null,
    },
    otpExpiresAt: {
      type: Date,
      default: null,
    },
    onboardingSteps: {
      emailVerification: { type: Boolean, default: false },
      company: { type: Boolean, default: false },
    },
    password: {
      type: String,
      required: true,
    },
    position: {
      type: String, // e.g. HR Manager, Recruiter
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company", // Recruiter belongs to a company
      default: null,
    },
    bio: {
      type: String,
      trim: true,
    },
    role: {
      type: String,
      deafult: "recruiter",
    },
 
  },
  { timestamps: true }
);

const Recruiter = mongoose.model("Recruiter", recruiterSchema);

module.exports = Recruiter;
