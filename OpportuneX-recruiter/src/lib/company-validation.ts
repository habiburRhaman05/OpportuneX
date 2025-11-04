import { z } from "zod"

// Personal Info Schema
export const personalInfoSchema = z.object({
  companyName: z.string().min(2, "Company name must be at least 2 characters"),
  industry: z.string().min(1, "Industry is required"),
  foundedYear: z.coerce.number().int().min(1900).max(new Date().getFullYear(), "Invalid year"),
  website: z.string().url("Please enter a valid website URL").optional().or(z.literal("")),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must not exceed 500 characters"),
})

export type PersonalInfoFormData = z.infer<typeof personalInfoSchema>

// Professional Info Schema
export const professionalInfoSchema = z.object({
  registrationNumber: z.string().min(3, "Registration number must be at least 3 characters"),
  tradeLicense: z.coerce.number().positive("Trade license must be a positive number"),
  officialEmail: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  country: z.string().min(2, "Country is required"),
  additionalInfo: z.string().optional(),
})

export type ProfessionalInfoFormData = z.infer<typeof professionalInfoSchema>

// Logo Upload Schema
export const logoUploadSchema = z.object({
  logo: z
    .instanceof(File)
    .refine((file) => file.size <= 5242880, "File size must be less than 5MB")
    .refine(
      (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
      "Only JPEG, PNG, and WebP formats are allowed",
    ),
})

export type LogoUploadFormData = z.infer<typeof logoUploadSchema>
