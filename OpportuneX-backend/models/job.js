const mongoose = require("mongoose")

const jobSchema = new mongoose.Schema(
    {
    // Unique Job ID
    _id: {
      type: String,
      required: true,
      unique: true,
    },

    // 🏷️ Title & Description
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },

    // 📍 Location
    location: { type: String, required: true },

    /**
     * 🧾 Responsibility Section
     * English: Contains a title and list of key responsibilities.
     * বাংলা: টাইটেল এবং দায়িত্বের লিস্ট রাখা হয় এখানে।
     */
    responsibility: {
      title: { type: String, default: "Key Responsibilities" },
      list: [
        {
          type: String,
          required: true,
        },
      ],
    },

    /**
     * 🧩 Requirements Section
     * English: Includes education, experience, and skill requirements.
     * বাংলা: শিক্ষাগত যোগ্যতা, অভিজ্ঞতা এবং স্কিল সংরক্ষণ করা হয়।
     */
    requirements: {
      education: { type: String, required: true },
      experience: { type: String, required: true },
      skills: [
        {
          type: String,
          required: true,
        },
      ],
    },

    // 📦 Job Type (Full-time, Part-time, etc.)
    employment_type: {
      type: String,
      enum: ["Full-time", "Part-time", "Remote", "Contract", "Internship"],
      default: "Full-time",
    },
    // ✅ Job Status (open/closed)
    status: {
      type: String,
      enum: ["open", "closed"],
      default: "open",
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    // 📅 Dates
    postedAt: { type: String, required: true },
    appliedDeadLine: { type: String, required: true },
  },
  { timestamps: true }
);


jobSchema.index({ title: "text", description: "text",role:"text" }); // Full-text search

const Job = mongoose.model("Job", jobSchema);
module.exports = Job
