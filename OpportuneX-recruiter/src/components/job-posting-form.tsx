import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { toast } from "./ui/use-toast";
import { useNavigate } from "react-router-dom";
import { queryClientIns } from "./QueryClientWrapper";
import { useUser } from "@/context/AuthContext";
import { useApiMutation } from "@/hooks/useApi";

// ================= ZOD Schema =================
export const jobPostingSchema = z.object({
  _id: z.string().optional(),
  title: z.string().min(3, "Title must be at least 3 characters").max(100),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(1000),
  location: z.string().min(2, "Location is required").max(100),
  responsibility: z.object({
    title: z.string().default("Key Responsibilities").optional(),
    list: z
      .array(
        z
          .string()
          .min(3, "Each responsibility must be at least 3 characters")
          .max(200)
      )
      .min(1, "At least one responsibility is required"),
  }),
  requirements: z.object({
    education: z.string().min(3, "Education is required").max(100),
    experience: z.string().min(2, "Experience is required").max(100),
    skills: z
      .array(
        z.string().min(2, "Each skill must be at least 2 characters").max(50)
      )
      .min(1, "At least one skill is required"),
  }),
  employment_type: z.enum([
    "Full-time",
    "Part-time",
    "Remote",
    "Contract",
    "Internship",
  ]),
  status: z.enum(["open", "closed"]),
  appliedDeadLine: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), "Invalid applied deadline date"),
  postedAt: z.string(),
  company: z.string().optional(),
});

export type JobPostingSchemaType = z.infer<typeof jobPostingSchema>;

// ================= Component =================
export function JobPostingForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { recruiter } = useUser();
  const navigate = useNavigate();

  const form = useForm<JobPostingSchemaType>({
    resolver: zodResolver(jobPostingSchema),
    defaultValues: {
      title: "",
      description: "",
      location: "",
      employment_type: "Full-time",
      status: "open",
      responsibility: { list: [""] },
      requirements: { skills: [""], education: "", experience: "" },
      appliedDeadLine: "",
      postedAt: new Date().toISOString(),
    },
  });

  const createJobPostMutation = useApiMutation({
    url: "/job/create",
    method: "post",
    onSuccess: () => {
      toast({
        title: "Job posting created",
        description: "Your job has been successfully posted.",
      });
      queryClientIns.invalidateQueries({ queryKey: ["posted-jobs-data"] });
      navigate("/recruiter/dashboard/posted-jobs");
    },
    onError: (err) => {
      toast({
        title: err.message,
        description: "Failed to create the job post.",
        variant: "destructive",
      });
    },
  });

  async function onSubmit(data: JobPostingSchemaType) {
    setIsSubmitting(true);
    try {
      const payload = {
        ...data,
        postedAt: new Date().toISOString(),
        company: recruiter.company._id,
      };
      await createJobPostMutation.mutateAsync(payload);
    } finally {
      setIsSubmitting(false);
    }
  }
  console.log(form.formState.errors);
  console.log(form.getValues());

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic Info */}
        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter job title"
                    {...field}
                    disabled={!recruiter.company.verified}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter job location"
                    {...field}
                    disabled={!recruiter.company.verified}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter job description"
                  className="min-h-32"
                  {...field}
                  disabled={!recruiter.company.verified}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Responsibilities */}
        <Card className="p-4">
          <h3 className="font-semibold mb-4">Responsibilities</h3>
          {form.watch("responsibility.list").map((_, index) => (
            <FormField
              key={index}
              control={form.control}
              name={`responsibility.list.${index}`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex gap-2">
                      <Input
                        placeholder={`Responsibility ${index + 1}`}
                        {...field}
                      />
                      {index > 0 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => {
                            const currentList = form.getValues(
                              "responsibility.list"
                            );
                            form.setValue(
                              "responsibility.list",
                              currentList.filter((_, i) => i !== index),
                              { shouldValidate: true }
                            );
                          }}
                        >
                          ×
                        </Button>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              const currentList = form.getValues("responsibility.list");
              form.setValue("responsibility.list", [...currentList, ""], {
                shouldValidate: true,
              });
            }}
          >
            Add Responsibility
          </Button>
        </Card>

        {/* Status + Type */}
        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={!recruiter.company.verified}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="employment_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Employment Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={!recruiter.company.verified}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select job type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Full-time">Full-Time</SelectItem>
                    <SelectItem value="Part-time">Part-Time</SelectItem>
                    <SelectItem value="Remote">Remote</SelectItem>
                    <SelectItem value="Contract">Contract</SelectItem>
                    <SelectItem value="Internship">Internship</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Requirements */}
        <Card className="p-4">
          <h3 className="font-semibold mb-4">Requirements</h3>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="requirements.education"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Education</FormLabel>
                  <FormControl>
                    <Input placeholder="Required education" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="requirements.experience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Experience</FormLabel>
                  <FormControl>
                    <Input placeholder="Required experience" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Skills */}
            <Card className="p-4">
              <h4 className="font-semibold mb-2">Skills</h4>
              {form.watch("requirements.skills").map((_, index) => (
                <FormField
                  key={index}
                  control={form.control}
                  name={`requirements.skills.${index}`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex gap-2">
                          <Input
                            placeholder={`Skill ${index + 1}`}
                            {...field}
                          />
                          {index > 0 && (
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              onClick={() => {
                                const currentSkills = form.getValues(
                                  "requirements.skills"
                                );
                                form.setValue(
                                  "requirements.skills",
                                  currentSkills.filter((_, i) => i !== index),
                                  { shouldValidate: true }
                                );
                              }}
                            >
                              ×
                            </Button>
                          )}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  const currentSkills = form.getValues("requirements.skills");
                  form.setValue("requirements.skills", [...currentSkills, ""], {
                    shouldValidate: true,
                  });
                }}
              >
                Add Skill
              </Button>
            </Card>
          </div>
        </Card>

        {/* Applied Deadline */}
        <FormField
          control={form.control}
          name="appliedDeadLine"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Application Deadline</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit */}
        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={!recruiter.company.verified || isSubmitting}
          >
            {isSubmitting ? "Posting..." : "Post Job"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
