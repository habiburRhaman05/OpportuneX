
const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const socialProfilesSchema = new Schema({
  website: { type: String },
  linkedin: { type: String },
  github: { type: String },
  twitter: { type: String },
});

const workExperienceSchema = new Schema({
  company: { type: String, required: true },
  position: { type: String, required: true },
  duration: { type: String },
  description: { type: String },
  logo: { type: String },
});

const educationSchema = new Schema({
  institution: { type: String, required: true },
  degree: { type: String },
  field: { type: String },
  duration: { type: String },
  gpa: { type: String },
});

const projectSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  technologies: [{ type: String }],
  projectUrl: { type: String },
  repoUrl: { type: String },
});

const certificateSchema = new Schema({
  name: { type: String, required: true },
  organization: { type: String },
  issueDate: { type: Date },
  credentialUrl: { type: String },
});

const CandidateSchema = new Schema(
  {
    // About Section
    fullName: { type: String, required: true },
    profilePhoto: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    location: { type: String },
    bio: { type: String },
    role: { type: String, default: "candidate" },
    emailOtp: { type: Number },
    otpExpiresAt: { type: Date },
    onboardingSteps: { 
      emailVerification:{type:Boolean,default:false},
      profileInfo:{type:Boolean,default:false}
     },

    // Social Profiles
    socialProfiles: socialProfilesSchema,

    // Work Experience
    workExperience: [workExperienceSchema],

    // Education
    education: [educationSchema],

    // Skills
    skills: [{ type: String }],

    // Achievements
    achievements: [{ type: String }],


    // Resume/CV
    resumeUrl: { type: String },



  },
  { timestamps: true }
);

//
// 🎯 Profile Completion Virtual (Weighted System)
//
CandidateSchema.virtual("profileCompletion").get(function () {
  let score = 0;

  // Weighted system (total = 100)
  const weights = {
    fullName: 10,
    profilePhoto: 10,
    location: 10,
    skills: 20,
    workExperience: 20,
    education: 10,
    resumeUrl: 20,
  };

  if (this.fullName) score += weights.fullName;
  if (this.profilePhoto) score += weights.profilePhoto;
 
  if (this.location) score += weights.location;
 
  if (this.skills && this.skills.length > 0) score += weights.skills;
  if (this.workExperience && this.workExperience.length > 0)
    score += weights.workExperience;
  if (this.education && this.education.length > 0) score += weights.education;
  if (this.resumeUrl) score += weights.resumeUrl;

  return score; // always between 0 - 100
});
CandidateSchema.virtual("missingFields").get(function () {
  const missing = [];
  if (!this.fullName) missing.push("fullName");
  if (!this.profilePhoto) missing.push("profilePhoto");
  if (!this.location) missing.push("location");
  if (!this.skills || this.skills.length === 0) missing.push("skills");
  if (!this.workExperience || this.workExperience.length === 0) missing.push("workExperience");
  if (!this.education || this.education.length === 0) missing.push("education");
  if (!this.resumeUrl) missing.push("resumeUrl");
  return missing;
});

// make sure virtuals included in JSON responses
CandidateSchema.set("toJSON", { virtuals: true });
CandidateSchema.set("toObject", { virtuals: true });
const Candidate = model("Candidate", CandidateSchema);
module.exports = Candidate;
