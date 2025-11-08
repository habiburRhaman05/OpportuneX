import { z } from "zod";

export const companyEditFormSchema = {};

export const companyFormSchema = {};

// 🧾 createCompanySchema.ts
// -------------------------------------------
// ✅ Custom validation rules for company creation form
// ইংরেজি + বাংলা ব্যাখ্যা সহ
// -------------------------------------------

export const createCompanySchema = z
  .object({
    name: z.string().min(2, "Company name must be at least 2 characters"),
    officialEmail: z.string().email("Enter a valid company email address"),
    website: z
      .string()
      .url("Enter a valid website URL (e.g. https://example.com)"),
    location: z.string().min(1, "Location is required"),
    size: z.string().min(1, "Company size is required"),
    industry: z.string().min(1, "Industry is required"),
    description: z
      .string()
      .min(50, "Description should be at least 50 characters")
      .max(500, "Maximum 500 characters allowed"),
  })
  .superRefine((data, ctx) => {
    const companyName = data.name.toLowerCase().replace(/\s+/g, "");
    const email = data.officialEmail.toLowerCase();
    const website = data.website.toLowerCase();

    // ✅ Rule 1: Email must contain company name
    if (!email.includes(companyName)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["officialEmail"],
        message: `Email must include the company name (${companyName})`,
      });
    }

    // ✅ Rule 2: Website must contain company name
    if (!website.includes(companyName)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["website"],
        message: `Website must include the company name (${companyName})`,
      });
    }
  });

//

export const jobPostingSchema = z
  .object({
    jobTitle: z.string().min(3, "Job title must be at least 3 characters"),
    company: z.string().min(2, "Company name is required"),
    companyId: z.string().min(8, "Company name is required"),
    location: z.string().min(2, "Location is required"),
    jobType: z.enum(["Full-time", "Part-time", "Contract", "Remote"], {
      errorMap: () => ({ message: "Please select a job type" }),
    }),
    experience: z.enum(["Entry-level", "Mid-level", "Senior", "Executive"], {
      errorMap: () => ({ message: "Please select experience level" }),
    }),
    salaryType: z.enum(["fixed", "range", "discuss"], {
      errorMap: () => ({ message: "Please select salary type" }),
    }),
    salaryMin: z.number().optional(),
    salaryMax: z.number().optional(),
    salaryAmount: z.number().optional(),
    deadline: z.date({
      errorMap: () => ({ message: "Application deadline is required" }),
    }),
    description: z
      .string()
      .min(50, "Description must be at least 50 characters"),
    responsibilities: z.string().min(20, "Responsibilities are required"),
    qualifications: z.string().min(20, "Qualifications are required"),
    benefits: z.array(z.string()).min(1, "Add at least one benefit"),
    searchTags: z.array(z.string()).min(1, "Add at least one searchTags"),
  })
  .refine(
    (data) => {
      if (data.salaryType === "range") {
        return (
          data.salaryMin && data.salaryMax && data.salaryMin < data.salaryMax
        );
      }
      if (data.salaryType === "fixed") {
        return !!data.salaryAmount;
      }
      return true;
    },
    {
      message: "Please provide valid salary information",
      path: ["salaryType"],
    }
  );

export const availableBenefits = [
  "Health Insurance",
  "Dental Insurance",
  "Vision Insurance",
  "401(k) Plan",
  "Stock Options",
  "Flexible Hours",
  "Remote Work",
  "Paid Time Off",
  "Professional Development",
  "Gym Membership",
  "Free Meals",
  "Bonus Program",
];
