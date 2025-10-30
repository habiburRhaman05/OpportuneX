import { z } from "zod";

// Step 1: OTP Validation Schema
export const otpValidationSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  otp: z
    .string()
    .length(6, "OTP must be 6 digits")
    .regex(/^\d+$/, "OTP must contain only numbers"),
});

export type OtpValidationFormData = z.infer<typeof otpValidationSchema>;

// Step 2: Company Info Schema
export const companyInfoSchema = z.object({
  companyName: z.string().min(2, "Company name must be at least 2 characters"),
  registrationNumber: z.string().min(3, "Registration number is required"),
  officialEmail: z.string().email("Please enter a valid email address"),
  tradeLicense: z.number().positive("Trade license must be a positive number"),
});

export type CompanyInfoFormData = z.infer<typeof companyInfoSchema>;

// Step 3: Terms Acceptance Schema
export const termsSchema = z.object({
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
});

export type TermsFormData = z.infer<typeof termsSchema>;
