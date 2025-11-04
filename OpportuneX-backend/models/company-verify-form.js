const mongoose = require("mongoose");

const companyVerifyForm = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    verified: {
      type: Boolean,
      default:false
    },
    application_submitAt: {
      type: Date,
 default: Date.now,
    },
    application_expiry: {
 type: Date,
    default: () => new Date(Date.now() + 24 * 60 * 60 * 1000),
   
    },
    registationNumber: {
      type: Number, // URL or file path
        required: true,

    },
    tradeNumber: {
      type: Number, // URL or file path
        required: true,
    },
    mainOfficeAddress: {
      type: String, // e.g. IT, Finance, Healthcare
      required: true,
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

const CompanyVerifyForm = mongoose.model("CompanyVerifyForm", companyVerifyForm);

module.exports = CompanyVerifyForm;
