import { z } from "zod";

export const RegisterInput = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  password: z.string().min(8),
});

export const LoginInput = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const Profile = z.object({
  // data: z.any(),
  // success: z.boolean(),
  message: z.string(),
});

export const ApiEnvelope = <T extends z.ZodTypeAny>(schema: T) =>
  z.object({
    data: schema,
    message: z.string().optional(),
    traceId: z.string().optional(),
  });

export type TProfile = z.infer<typeof Profile>;
