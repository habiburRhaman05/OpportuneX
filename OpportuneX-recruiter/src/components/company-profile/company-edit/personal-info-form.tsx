import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  personalInfoSchema,
  type PersonalInfoFormData,
} from "@/lib/company-validation";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";
import { Loader2, CheckCircle } from "lucide-react";
import { useApiMutation } from "@/hooks/useApi";
import { queryClientIns } from "@/components/QueryClientWrapper";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUser } from "@/context/AuthContext";

/**
 * 🧠 PersonalInfoForm Component
 *
 * ✅ Modern Select menu (industry)
 * ✅ Backend integrated with useApiMutation
 * ✅ Zod validation with react-hook-form
 * ✅ Proper toast + loading + success state
 * ✅ Keeps same layout and styling
 */

export function PersonalInfoForm() {
  const [isSuccess, setIsSuccess] = useState(false);
  const { recruiter } = useUser();
  // ✅ Backend Mutation Hook
  const updateCompanyMutation = useApiMutation({
    url: "/company/auth/profile/update",
    method: "put",
    onSuccess: (data) => {
      queryClientIns.invalidateQueries({
        queryKey: ["fetch-company-profile"],
      });
      toast({
        title: "✅ Profile Updated",
        description: "Company information updated successfully.",
        className: "bg-green-950 border-green-800 text-green-100",
      });
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 3000);
    },
    onError: (error) => {
      toast({
        title: "❌ Update Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });

  // ✅ Form setup
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isDirty },
  } = useForm<PersonalInfoFormData>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      name: recruiter?.company.name || "",
      industry: recruiter?.company.industry || "",
      foundedYear: recruiter?.company.foundedYear || null,
      website: recruiter?.company.website || "",
      description: recruiter?.company.description || "",
    },
  });

  // ✅ Submit handler
  const onSubmit = async (data: PersonalInfoFormData) => {
    await updateCompanyMutation.mutateAsync({
      ...data,
      _id: recruiter.company._id,
    });
  };

  const isSubmitting = updateCompanyMutation.isPending;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Company Name */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-zinc-300">
            Company Name *
          </label>
          <input
            {...register("name")}
            type="text"
            className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all"
            placeholder="Enter company name"
          />
          {errors.name && (
            <p className="text-xs text-red-400">{errors.name.message}</p>
          )}
        </div>

        {/* ✅ Modern Industry Select */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-zinc-300">
            Industry *
          </label>
          <Select
            value={watch("industry") || recruiter.company.industry || "other"}
            onValueChange={(value) =>
              setValue("industry", value, { shouldDirty: true })
            }
          >
            <SelectTrigger className="w-full bg-zinc-900 border border-zinc-800 text-white rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50">
              <SelectValue placeholder="Select industry" />
            </SelectTrigger>
            <SelectContent className="bg-zinc-900 border border-zinc-700 text-white">
              <SelectItem value="Technology">💻 Technology</SelectItem>
              <SelectItem value="Finance">💰 Finance</SelectItem>
              <SelectItem value="Healthcare">🏥 Healthcare</SelectItem>
              <SelectItem value="Retail">🛍️ Retail</SelectItem>
              <SelectItem value="Manufacturing">🏭 Manufacturing</SelectItem>
              <SelectItem value="Education">🎓 Education</SelectItem>

              <SelectItem value="Other">🔹 Other</SelectItem>
            </SelectContent>
          </Select>
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
          disabled={!isDirty || isSubmitting}
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
