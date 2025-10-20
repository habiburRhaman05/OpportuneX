import { FormField } from "@/components/forms/FormField";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@/context/AuthContext";
import useAuth from "@/hooks/useAuth";
import { createCompanySchema } from "@/schemas/form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

type CreateCompanyFormData = z.infer<typeof createCompanySchema>;

export default function CreateCompanyForm({ toggleSearchForm }) {
  const { recruiter } = useUser();

  const {
    createCompanyMutation: {
      mutateAsync: createCompanyHandler,
      isPending,
      isSuccess,
    },
  } = useAuth();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CreateCompanyFormData>({
    resolver: zodResolver(createCompanySchema),
  });

  const aboutLength = watch("description")?.length || 0;
  const onSubmit = async (data: CreateCompanyFormData) => {
    await createCompanyHandler(data);
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/recruiter/auth/onboarding/welcome");
    }
  }, [isSuccess]);

  return (
    <div>
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold">Provide your company information</h1>
        <p className="text-muted-foreground">
          create a compnay by filling the form
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <FormField label="Company Name" required error={errors.name?.message}>
          <Input {...register("name")} placeholder="Enter company name" />
        </FormField>

        <FormField
          label="Official Email"
          required
          error={errors.officialEmail?.message}
        >
          <Input
            {...register("officialEmail")}
            placeholder="example@company.com"
          />
        </FormField>
        <FormField label="Website" required error={errors.website?.message}>
          <Input {...register("website")} placeholder="www.example.co" />
        </FormField>
        <FormField label="Location" required error={errors.location?.message}>
          <Input {...register("location")} placeholder="City, State/Country" />
        </FormField>

        <FormField label="Company Size" required error={errors.size?.message}>
          <Select onValueChange={(value) => setValue("size", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select company size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1-10">1-10 employees</SelectItem>
              <SelectItem value="11-50">11-50 employees</SelectItem>
              <SelectItem value="51-200">51-200 employees</SelectItem>
              <SelectItem value="201-500">201-500 employees</SelectItem>
              <SelectItem value="501-1000">501-1000 employees</SelectItem>
              <SelectItem value="1000+">1000+ employees</SelectItem>
            </SelectContent>
          </Select>
        </FormField>

        <FormField label="Industry" required error={errors.industry?.message}>
          <Select onValueChange={(value) => setValue("industry", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select industry" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="technology">Technology</SelectItem>
              <SelectItem value="finance">Finance</SelectItem>
              <SelectItem value="healthcare">Healthcare</SelectItem>
              <SelectItem value="education">Education</SelectItem>
              <SelectItem value="retail">Retail</SelectItem>
              <SelectItem value="manufacturing">Manufacturing</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </FormField>

        <FormField
          label="About Us"
          required
          error={errors.description?.message}
          description={`${aboutLength}/500 characters`}
        >
          <Textarea
            {...register("description")}
            placeholder="Tell us about your company, culture, and what makes it unique..."
            className="min-h-[100px] resize-none"
            maxLength={500}
          />
        </FormField>

        <div className="flex justify-between pt-6">
          <Button
            type="button"
            variant="outline"
            onClick={() => toggleSearchForm(true)}
          >
            Back to Search
          </Button>

          <Button type="submit" disabled={isPending} className="min-w-[140px]">
            {isPending ? "Creating..." : "Create Company"}
          </Button>
        </div>
      </form>
    </div>
  );
}
