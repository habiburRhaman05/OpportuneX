import { z } from "zod";

export const companyEditFormSchema = {};
export const jobPostingSchema = {};
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
