import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, ArrowLeft, Plus, X, Trash } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/context/AuthContext";
import { useApiMutation, useApiQuery } from "@/hooks/useApi";
import { availableBenefits, jobPostingSchema } from "@/schemas/form-schema";
import { queryClientIns } from "@/components/QueryClientWrapper";

type JobPostFormData = z.infer<typeof jobPostingSchema>;

export default function UpdateJobPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const [newBenefit, setNewBenefit] = useState("");
  const { recruiter } = useUser();
  const form = useForm<JobPostFormData>({
    resolver: zodResolver(jobPostingSchema),
    defaultValues: {
      jobTitle: "",
      company: "",
      location: "",
      jobType: "Full-time",
      experience: "Entry-level",
      salaryType: "discuss",
      description: "",
      responsibilities: "",
      qualifications: "",
      benefits: [],
      searchTags: [],
    },
  });

  const [selectedBenefits, setSelectedBenefits] = useState<string[]>(
    form.watch("benefits") || []
  );
  const [newSearchTag, setnewSearchTag] = useState("");
  const searchTags = form.watch("searchTags");
  const salaryType = form.watch("salaryType");

  const createJobMutation = useApiMutation({
    url: "/job/create",
    method: "post",
  });

  const onSubmit = async (data: JobPostFormData) => {
    await createJobMutation.mutateAsync({ data });
  };

  const handleAddBenefit = () => {
    if (newBenefit.trim() && !selectedBenefits.includes(newBenefit)) {
      const updatedBenefits = [...selectedBenefits, newBenefit];
      setSelectedBenefits(updatedBenefits);
      form.setValue("benefits", updatedBenefits);
      setNewBenefit("");
    }
  };

  const handleRemoveBenefit = (benefit: string) => {
    const updatedBenefits = selectedBenefits.filter((b) => b !== benefit);
    setSelectedBenefits(updatedBenefits);
    form.setValue("benefits", updatedBenefits);
  };

  const handleSelectBenefit = (benefit: string) => {
    if (selectedBenefits.includes(benefit)) {
      handleRemoveBenefit(benefit);
    } else {
      const updatedBenefits = [...selectedBenefits, benefit];
      setSelectedBenefits(updatedBenefits);
      form.setValue("benefits", updatedBenefits);
    }
  };
  const handleAddSearchTag = () => {
    const values = form.getValues("searchTags");

    if (newSearchTag.trim() && !values.includes(newSearchTag)) {
      const updatedTags = [...values, newSearchTag.trim()];
      form.setValue("searchTags", updatedTags);
      setnewSearchTag("");
    }
  };

  const handleRemoveSearchTag = (tag: string) => {
    const values = form.getValues("searchTags");
    let updatedTags = [...searchTags];

    updatedTags = updatedTags.filter(
      (t) => t.toLowerCase() !== tag.toLowerCase()
    );

    form.setValue("searchTags", updatedTags);
  };

  const deleteJobMutation = useApiMutation({
    url: `/job/${id}/delete`,

    method: "delete",
  });

  const { refetch, data, isLoading, error } = useApiQuery<{ data: any }>({
    url: `/job/${id}/details`,
    queryKey: ["job-details", id],
    enabled: true,
  });

  useEffect(() => {
    if (data?.data) {
      form.reset(data.data);
      setSelectedBenefits(form.getValues("benefits"));
    }
  }, [data]);

  const [deleteModelOpen, setDeleteModalOpen] = useState(false);

  useEffect(() => {
    if (deleteJobMutation.isSuccess) {
      setDeleteModalOpen(false);
      navigate("/recruiter/dashboard/posted-jobs");
      queryClientIns.invalidateQueries({
        queryKey: ["posted-jobs-data"],
      });
    }
  }, [deleteJobMutation.isSuccess]);

  useEffect(() => {
    if (createJobMutation.isSuccess) {
      form.reset();
      setSelectedBenefits([]);
    }
  }, [createJobMutation.isSuccess]);

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-zinc-950/80 backdrop-blur-xl border-b border-blue-400/20">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-blue-500/20 text-blue-300"
              >
                <ArrowLeft size={20} />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold">Post a New Job</h1>
              <p className="text-sm text-gray-400">Fill in the details below</p>
            </div>
          </div>
          <AlertDialog open={deleteModelOpen}>
            <AlertDialogTrigger asChild>
              <Button
                variant="destructive"
                onClick={() => {
                  setDeleteModalOpen(true);
                }}
              >
                {" "}
                <Trash /> Delete This Job
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-red-600 hover:bg-red-700"
                  onClick={async () => {
                    await deleteJobMutation.mutateAsync({});
                  }}
                >
                  {deleteJobMutation.isPending ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <Trash />
                  )}{" "}
                  Sure Delete The Job
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
      {!recruiter.company.verified && (
        <div className="flex items-center justify-between ">
          <h1 className="text-xl font-semibold text-red-800">
            You cannot post a job - please verify you company EMail
          </h1>{" "}
          <Button>
            <Link
              to={"/recruiter/dashboard/company-profile/verify"}
              className="underline "
            >
              Verify Now
            </Link>
          </Button>
        </div>
      )}

      {/* Form Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Section 1: Basic Info */}
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-white mb-4">
                  Job Details
                </h2>
                <p className="text-sm text-gray-400 mb-6">
                  Basic information about the position
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="jobTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">
                        Job Title *
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., Senior React Developer"
                          className="bg-blue-500/10 border-blue-400/30 text-white placeholder-gray-500 focus:border-blue-400/60 focus:ring-2 focus:ring-blue-500/20"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">
                        Company Name *
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your company name"
                          className="bg-blue-500/10 border-blue-400/30 text-white placeholder-gray-500 focus:border-blue-400/60 focus:ring-2 focus:ring-blue-500/20"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">
                        Location *
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., San Francisco, CA"
                          className="bg-blue-500/10 border-blue-400/30 text-white placeholder-gray-500 focus:border-blue-400/60 focus:ring-2 focus:ring-blue-500/20"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="jobType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">
                        Job Type *
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-blue-500/10 border-blue-400/30 text-white focus:border-blue-400/60">
                            <SelectValue placeholder="Select job type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-zinc-900 border-blue-400/30">
                          <SelectItem value="Full-time">Full-time</SelectItem>
                          <SelectItem value="Part-time">Part-time</SelectItem>
                          <SelectItem value="Contract">Contract</SelectItem>
                          <SelectItem value="Remote">Remote</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="experience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">
                        Experience Level *
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-blue-500/10 border-blue-400/30 text-white focus:border-blue-400/60">
                            <SelectValue placeholder="Select level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-zinc-900 border-blue-400/30">
                          <SelectItem value="Entry-level">
                            Entry-level
                          </SelectItem>
                          <SelectItem value="Mid-level">Mid-level</SelectItem>
                          <SelectItem value="Senior">Senior</SelectItem>
                          <SelectItem value="Executive">Executive</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="deadline"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">
                        Application Deadline *
                      </FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className="w-full justify-start text-left font-normal bg-blue-500/10 border-blue-400/30 text-white hover:bg-blue-500/20"
                            >
                              {field.value
                                ? format(field.value, "PPP")
                                : "Pick a date"}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent
                          className="w-auto p-0 bg-zinc-900 border-blue-400/30"
                          align="start"
                        >
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date < new Date()}
                            className="text-white"
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Section 2: Salary */}
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-white mb-4">
                  Salary Information
                </h2>
                <p className="text-sm text-gray-400 mb-6">
                  How do you want to display salary?
                </p>
              </div>

              <FormField
                control={form.control}
                name="salaryType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">
                      Salary Type *
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-blue-500/10 border-blue-400/30 text-white focus:border-blue-400/60">
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-zinc-900 border-blue-400/30">
                        <SelectItem value="fixed">Fixed Amount</SelectItem>
                        <SelectItem value="range">Salary Range</SelectItem>
                        <SelectItem value="discuss">
                          Discuss with Candidate
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              {salaryType === "fixed" && (
                <FormField
                  control={form.control}
                  name="salaryAmount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">
                        Salary Amount (Annual) *
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <span className="absolute left-3 top-3 text-gray-400">
                            $
                          </span>
                          <Input
                            type="number"
                            placeholder="100000"
                            className="pl-8 bg-blue-500/10 border-blue-400/30 text-white placeholder-gray-500 focus:border-blue-400/60 focus:ring-2 focus:ring-blue-500/20"
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
              )}

              {salaryType === "range" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="salaryMin"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300">
                          Minimum Salary (Annual) *
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <span className="absolute left-3 top-3 text-gray-400">
                              $
                            </span>
                            <Input
                              type="number"
                              placeholder="80000"
                              className="pl-8 bg-blue-500/10 border-blue-400/30 text-white placeholder-gray-500 focus:border-blue-400/60 focus:ring-2 focus:ring-blue-500/20"
                              {...field}
                              onChange={(e) =>
                                field.onChange(Number(e.target.value))
                              }
                            />
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="salaryMax"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300">
                          Maximum Salary (Annual) *
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <span className="absolute left-3 top-3 text-gray-400">
                              $
                            </span>
                            <Input
                              type="number"
                              placeholder="120000"
                              className="pl-8 bg-blue-500/10 border-blue-400/30 text-white placeholder-gray-500 focus:border-blue-400/60 focus:ring-2 focus:ring-blue-500/20"
                              {...field}
                              onChange={(e) =>
                                field.onChange(Number(e.target.value))
                              }
                            />
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {salaryType === "discuss" && (
                <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-400/30">
                  <p className="text-sm text-gray-300">
                    Salary will be discussed with selected candidates
                  </p>
                </div>
              )}
            </div>

            {/* Section 3: Description */}
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-white mb-4">
                  Job Description
                </h2>
                <p className="text-sm text-gray-400 mb-6">
                  Provide detailed information about the position
                </p>
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">
                      Job Description *
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe the job role, company culture, and what makes this position unique..."
                        className="min-h-32 bg-blue-500/10 border-blue-400/30 text-white placeholder-gray-500 focus:border-blue-400/60 focus:ring-2 focus:ring-blue-500/20"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-gray-400">
                      Minimum 50 characters
                    </FormDescription>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="responsibilities"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">
                      Responsibilities *
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="List key responsibilities (e.g., 'Design scalable systems', 'Lead technical meetings')..."
                        className="min-h-32 bg-blue-500/10 border-blue-400/30 text-white placeholder-gray-500 focus:border-blue-400/60 focus:ring-2 focus:ring-blue-500/20"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="qualifications"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">
                      Qualifications *
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Required skills and qualifications (e.g., '5+ years React experience', 'BS in Computer Science')..."
                        className="min-h-32 bg-blue-500/10 border-blue-400/30 text-white placeholder-gray-500 focus:border-blue-400/60 focus:ring-2 focus:ring-blue-500/20"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
            </div>

            {/* Section 4: Benefits */}
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-white mb-4">
                  Benefits & Perks
                </h2>
                <p className="text-sm text-gray-400 mb-6">
                  Select or add benefits for this position
                </p>
              </div>

              {/* Predefined Benefits */}
              <div className="space-y-4">
                <p className="text-sm text-gray-400">Quick select:</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {availableBenefits.map((benefit) => (
                    <button
                      key={benefit}
                      type="button"
                      onClick={() => handleSelectBenefit(benefit)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        selectedBenefits.includes(benefit)
                          ? "bg-blue-500 text-white border-blue-400/60"
                          : "bg-blue-500/10 text-gray-300 border border-blue-400/30 hover:bg-blue-500/20"
                      }`}
                    >
                      {benefit}
                    </button>
                  ))}
                </div>
              </div>

              {/* Add Custom Benefit */}
              <div className="space-y-3">
                <p className="text-sm text-gray-400">Add custom benefit:</p>
                <div className="flex gap-2">
                  <Input
                    value={newBenefit}
                    onChange={(e) => setNewBenefit(e.target.value)}
                    placeholder="e.g., Company car, Housing allowance"
                    className="bg-blue-500/10 border-blue-400/30 text-white placeholder-gray-500 focus:border-blue-400/60 focus:ring-2 focus:ring-blue-500/20"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddBenefit();
                      }
                    }}
                  />
                  <Button
                    type="button"
                    onClick={handleAddBenefit}
                    className="bg-blue-500 hover:bg-blue-600 text-white shrink-0"
                  >
                    <Plus size={18} />
                  </Button>
                </div>
              </div>

              {/* Selected Benefits Display */}
              {selectedBenefits.length > 0 && (
                <div className="space-y-3">
                  <p className="text-sm text-gray-400">Selected benefits:</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedBenefits.map((benefit) => (
                      <div
                        key={benefit}
                        className="bg-blue-500/20 border border-blue-400/40 text-white px-3 py-1 rounded-lg text-sm flex items-center gap-2"
                      >
                        {benefit}
                        <button
                          type="button"
                          onClick={() => handleRemoveBenefit(benefit)}
                          className="hover:text-red-400 transition-colors"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <FormMessage className="text-red-400">
                {form.formState.errors.benefits?.message}
              </FormMessage>
            </div>

            {/* Add search tags */}
            <div className="space-y-3">
              {form.getValues("searchTags").length > 0 && (
                <div className="space-y-3">
                  <p className="text-sm text-gray-400">Search Tags:</p>
                  <div className="flex flex-wrap gap-2">
                    {form.getValues("searchTags").map((tag) => (
                      <div
                        key={tag}
                        className="bg-blue-500/20 border border-blue-400/40 text-white px-3 py-1 rounded-lg text-sm flex items-center gap-2"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => handleRemoveSearchTag(tag)}
                          className="hover:text-red-400 transition-colors"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <p className="text-sm text-gray-400">Add Search Tags:</p>
              <div className="flex gap-2">
                <Input
                  value={newSearchTag}
                  onChange={(e) => setnewSearchTag(e.target.value)}
                  placeholder="e.g., react, fullstack, javascript"
                  className="bg-blue-500/10 border-blue-400/30 text-white placeholder-gray-500 focus:border-blue-400/60 focus:ring-2 focus:ring-blue-500/20"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddSearchTag();
                    }
                  }}
                />
                <Button
                  type="button"
                  onClick={handleAddSearchTag}
                  className="bg-blue-500 hover:bg-blue-600 text-white shrink-0"
                >
                  <Plus size={18} />
                </Button>
              </div>

              <FormMessage className="text-red-400">
                {form.formState.errors.searchTags?.message}
              </FormMessage>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4 pt-8">
              <Link to="/" className="flex-1">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full bg-blue-500/10 border-blue-400/30 text-blue-300 hover:bg-blue-500/20 h-12"
                >
                  Cancel
                </Button>
              </Link>
              <Button
                type="submit"
                disabled={createJobMutation.isPending}
                className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold h-12 transition-all"
              >
                {createJobMutation.isPending && (
                  <Loader2 size={18} className="mr-2 animate-spin" />
                )}
                {createJobMutation.isPending
                  ? "Creating Job Post..."
                  : "Create Job Post"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
