import AppIntro from "@/components/AppIntro";
import { FormField } from "@/components/forms/FormField";
import { PhotoUpload } from "@/components/forms/PhotoUpload";
import { OnboardingLayout } from "@/components/onboarding/OnboardingLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@/context/AuthContext";
import useAuth from "@/hooks/useAuth";
import { delay } from "@/utils/delay";
import { zodResolver } from "@hookform/resolvers/zod";
import { P } from "node_modules/framer-motion/dist/types.d-Cjd591yU";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import { z } from "zod";

const registerSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  bio: z
    .string()
    .min(10, "Bio must be at least 10 characters")
    .max(500, "Bio must be less than 500 characters"),
  location: z.string().min(2, "Location is required"),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const navigate = useNavigate();
  const {
    registerMutation: {
      mutateAsync: handleRegister,
      isError,
      isPending,
      isSuccess,
    },
  } = useAuth();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const bioLength = watch("bio")?.length || 0;

  const onSubmit = async (data: RegisterFormData) => {
    await handleRegister(data);
  };

  return (
    <OnboardingLayout currentStep={1}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <FormField label="Full Name" required error={errors.fullName?.message}>
          <Input {...register("fullName")} placeholder="Enter your full name" />
        </FormField>

        <FormField label="Email" required error={errors.email?.message}>
          <Input
            {...register("email")}
            type="email"
            placeholder="Enter your email address"
          />
        </FormField>

        <FormField label="Password" required error={errors.password?.message}>
          <Input
            {...register("password")}
            type="password"
            placeholder="Create a secure password"
          />
        </FormField>

        <FormField
          label="Bio"
          required
          error={errors.bio?.message}
          description={`${bioLength}/500 characters`}
        >
          <Textarea
            {...register("bio")}
            placeholder="Tell us about yourself and your recruiting experience..."
            className="min-h-[100px] resize-none"
            maxLength={500}
          />
        </FormField>

        <FormField label="Location" required error={errors.location?.message}>
          <Input {...register("location")} placeholder="City, State/Country" />
        </FormField>

        <div className="flex justify-between pt-6">
          <Button type="button" variant="outline" onClick={() => navigate("/")}>
            Back
          </Button>

          <Button type="submit" disabled={isPending} className="min-w-[140px]">
            {isPending ? "Creating..." : "Create Account"}
          </Button>
        </div>
      </form>
    </OnboardingLayout>
  );
}
