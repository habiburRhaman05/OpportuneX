import { z } from "zod";

export const companyEditFormSchema = {};
export const jobPostingSchema = {};
export const companyFormSchema = {};

export const createCompanySchema = z.object({
  name: z.string().min(2, "Company name is required"),
  officialEmail: z
    .string()
    .min(1, "please provide a valid company work email")
    .email("please enter a valid email"),
  website: z
    .string()
    .min(1, "please enter company site")
    .url("Please enter a Valid url"),
  location: z.string().min(2, "Location is required"),
  size: z.string().min(1, "Company size is required"),
  description: z
    .string()
    .min(10, "About must be at least 10 characters")
    .max(500, "About must be less than 500 characters"),
  industry: z.string().min(1, "Industry is required"),
});
