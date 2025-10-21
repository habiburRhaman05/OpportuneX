import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
import useAuth from "@/hooks/useAuth";
import { useApiMutation } from "@/hooks/useApi";
import { useNavigate } from "react-router-dom";
import { queryClientIns } from "./QueryClientWrapper";
import { useUser } from "@/context/AuthContext";
const jobPostingSchema = {};

type JobPostingFormValues = {};
export function JobPostingForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { recruiter } = useUser();
  const navigate = useNavigate();
  const form = useForm<JobPostingFormValues>({
    resolver: zodResolver(jobPostingSchema),
    defaultValues: {
      requirements: {
        skills: [""],
        education: "",
        experience: "",
      },
      responsibility: {
        list: [""],
      },
      title: "",
      description: "",
      location: "",
      type: "",
      status: "open",
    },
  });

  const createJobPostMutaion = useApiMutation({
    url: "/job/create",
    method: "post",
    onSuccess: () => {
      toast({
        title: "Job posting created",
        description: "Your job has been successfully posted.",
      });
      queryClientIns.invalidateQueries({
        queryKey: ["posted-jobs-data"],
      });
      navigate("/recruiter/posted-jobs");
    },
    onError: (err) => {
      toast({
        title: err.message,
        description: "Your job has been failed to create.",
        variant: "destructive",
      });
    },
  });

  async function onSubmit(data: JobPostingFormValues) {
    await createJobPostMutaion.mutateAsync(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            disabled={!recruiter.company.verified}
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter job title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            disabled={!recruiter.company.verified}
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="Enter job location" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          disabled={!recruiter.company.verified}
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
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* <FormField
          control={form.control}
          name="responsibility.title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Responsibilities Section Title</FormLabel>
              <FormControl>
                <Input placeholder="Section title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}

        <div className="space-y-2">
          <FormLabel>Responsibilities</FormLabel>
          {form.watch("responsibility.list").map((_, index) => (
            <FormField
              disabled={!recruiter.company.verified}
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
                              currentList.filter((_, i) => i !== index)
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
              form.setValue("responsibility.list", [...currentList, ""]);
            }}
          >
            Add Responsibility
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            disabled={!recruiter.company.verified}
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
            disabled={!recruiter.company.verified}
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Employment Type</FormLabel>
                <Select
                  disabled={!recruiter.company.verified}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Job Type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="full-time">Full-Time</SelectItem>
                    <SelectItem value="part-time">Part-Time</SelectItem>
                    <SelectItem value="remote">Remote</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Card className="p-4">
          <h3 className="font-semibold mb-4">Requirements</h3>
          <div className="space-y-4">
            <FormField
              disabled={!recruiter.company.verified}
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
              disabled={!recruiter.company.verified}
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

            <div className="space-y-2">
              <FormLabel>Skills</FormLabel>
              {form.watch("requirements.skills").map((_, index) => (
                <FormField
                  disabled={!recruiter.company.verified}
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
                                  currentSkills.filter((_, i) => i !== index)
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
                  form.setValue("requirements.skills", [...currentSkills, ""]);
                }}
              >
                Add Skill
              </Button>
            </div>
          </div>
        </Card>

        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={
              !recruiter.company.verified || createJobPostMutaion.isPending
            }
          >
            {createJobPostMutaion.isPending ? "Posting..." : "Post Job"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
