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
  registrationNumber: z.string().min(3, "Registration number is required"),
  tradeLicense: z.number().positive("Trade license must be a positive number"),
  officeAddress: z.string().min(5, "You have must be enter the office address"),
});
export type CompanyInfoFormData = z.infer<typeof companyInfoSchema>;

// Step 3: Terms Acceptance Schema
export const termsSchema = z.object({
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
});

export type TermsFormData = z.infer<typeof termsSchema>;
