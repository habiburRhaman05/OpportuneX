const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    verified: {
      type: Boolean,
      default:false
    },
    verified_application_submit: {
      type: Boolean,
      default:false
    },
    verified_application_expiry: {
     type: Date,
   
    },
    officialEmail: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    logo: {
      type: String, // URL or file path
      default: null,
    },
    website: {
      type: String,
      default: null,
      trim: true,
    },
    industry: {
      type: String, // e.g. IT, Finance, Healthcare
      required: true,
      trim: true,
    },
    size: {
      type: String, // e.g. "1-10", "11-50", "51-200"
      default: null,
    },
    location: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recruiter", // Who created the company entry
      required: true,
    },
  },
  { timestamps: true }
);

const Company = mongoose.model("Company", companySchema);

module.exports = Company;
