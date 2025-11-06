"use client";

import { queryClientIns } from "@/components/QueryClientWrapper";
import { useUser } from "@/context/AuthContext";
import { toast } from "@/hooks/use-toast";
import { useApiMutation } from "@/hooks/useApi";
import {
  professionalInfoSchema,
  type ProfessionalInfoFormData,
} from "@/lib/company-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export function ProfessionalInfoForm() {
  const [isSuccess, setIsSuccess] = useState(false);
  const { recruiter } = useUser();

  // ✅ Backend mutation
  const updateCompanyMutation = useApiMutation({
    url: "/company/auth/profile/update",
    method: "put",
    onSuccess: () => {
      queryClientIns.invalidateQueries({ queryKey: ["fetch-company-profile"] });
      toast({
        title: "✅ Profile Updated",
        description: "Professional information updated successfully.",
        className: "bg-green-950 border-green-800 text-green-100",
      });
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 3000);
    },
    onError: () => {
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
    control,
    formState: { errors, isDirty },
  } = useForm<ProfessionalInfoFormData>({
    resolver: zodResolver(professionalInfoSchema),
    defaultValues: {
      registrationNumber: recruiter?.company.registrationNumber || "",
      tradeLicense: recruiter?.company.tradeLicense || "",

      location: recruiter?.company.location || "",
    },
  });

  const onSubmit = async (data: ProfessionalInfoFormData) => {
    await updateCompanyMutation.mutateAsync({
      ...data,
      _id: recruiter.company._id,
    });
  };

  const isSubmitting = updateCompanyMutation.isPending;

  useEffect(() => {
    if (recruiter) {
    }
  }, [recruiter]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Registration + Trade License */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Registration Number */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-zinc-300">
            Registration Number *
          </label>
          <input
            {...register("registrationNumber")}
            type="text"
            className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all"
            placeholder="REG123456"
          />
          {errors.registrationNumber && (
            <p className="text-xs text-red-400">
              {errors.registrationNumber.message}
            </p>
          )}
        </div>

        {/* Trade License */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-zinc-300">
            Trade License *
          </label>
          <input
            {...register("tradeLicense")}
            type="text"
            className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all"
            placeholder="1234567890"
          />
          {errors.tradeLicense && (
            <p className="text-xs text-red-400">
              {errors.tradeLicense.message}
            </p>
          )}
        </div>
      </div>

      {/* Founded Year + Phone + Address */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Founded Year */}

        {/* Address */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-zinc-300">
            Location *
          </label>
          <input
            {...register("location")}
            type="text"
            className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all"
            placeholder="123 Business Street"
          />
          {errors.location && (
            <p className="text-xs text-red-400">{errors.location.message}</p>
          )}
        </div>
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
            "Save Professional Info"
          )}
        </button>
      </div>
    </form>
  );
}
