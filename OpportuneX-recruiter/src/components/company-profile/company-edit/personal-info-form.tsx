import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  personalInfoSchema,
  type PersonalInfoFormData,
} from "@/lib/company-validation";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Loader2, CheckCircle } from "lucide-react";

export function PersonalInfoForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PersonalInfoFormData>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      companyName: "Acme Corporation",
      industry: "Technology",
      foundedYear: 2020,
      website: "https://acme.com",
      description: "Leading provider of innovative technology solutions",
    },
  });

  const onSubmit = async (data: PersonalInfoFormData) => {
    setIsSubmitting(true);
    setIsSuccess(false);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSuccess(true);

    toast({
      title: "Success",
      description: "Personal information updated successfully!",
      className: "bg-green-950 border-green-800 text-green-100",
    });

    setTimeout(() => setIsSuccess(false), 3000);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Company Name */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-zinc-300">
            Company Name *
          </label>
          <input
            {...register("companyName")}
            type="text"
            className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all"
            placeholder="Enter company name"
          />
          {errors.companyName && (
            <p className="text-xs text-red-400">{errors.companyName.message}</p>
          )}
        </div>

        {/* Industry */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-zinc-300">
            Industry *
          </label>
          <select
            {...register("industry")}
            className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all"
          >
            <option value="">Select an industry</option>
            <option value="Technology">Technology</option>
            <option value="Finance">Finance</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Retail">Retail</option>
            <option value="Manufacturing">Manufacturing</option>
            <option value="Other">Other</option>
          </select>
          {errors.industry && (
            <p className="text-xs text-red-400">{errors.industry.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Founded Year */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-zinc-300">
            Founded Year *
          </label>
          <input
            {...register("foundedYear")}
            type="number"
            className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all"
            placeholder="2020"
          />
          {errors.foundedYear && (
            <p className="text-xs text-red-400">{errors.foundedYear.message}</p>
          )}
        </div>

        {/* Website */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-zinc-300">
            Website URL
          </label>
          <input
            {...register("website")}
            type="url"
            className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all"
            placeholder="https://example.com"
          />
          {errors.website && (
            <p className="text-xs text-red-400">{errors.website.message}</p>
          )}
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-zinc-300">
          Description *
        </label>
        <textarea
          {...register("description")}
          rows={4}
          className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all resize-none"
          placeholder="Describe your company..."
        />
        {errors.description && (
          <p className="text-xs text-red-400">{errors.description.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <div className="flex items-center justify-between">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-medium rounded-lg hover:from-blue-700 hover:to-cyan-600 transition-all disabled:opacity-50 flex items-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Saving...
            </>
          ) : isSuccess ? (
            <>
              <CheckCircle className="w-4 h-4" />
              Saved
            </>
          ) : (
            "Save Personal Info"
          )}
        </button>
      </div>
    </form>
  );
}
