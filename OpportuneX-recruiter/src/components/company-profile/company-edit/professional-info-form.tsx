import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  professionalInfoSchema,
  type ProfessionalInfoFormData,
} from "@/lib/company-validation";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Loader2, CheckCircle } from "lucide-react";

export function ProfessionalInfoForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfessionalInfoFormData>({
    resolver: zodResolver(professionalInfoSchema),
    defaultValues: {
      registrationNumber: "REG123456",
      tradeLicense: 9876543210,
      officialEmail: "contact@acme.com",
      phone: "+1234567890",
      address: "123 Business Street",
      city: "New York",
      country: "United States",
      additionalInfo: "Premium member",
    },
  });

  const onSubmit = async (data: ProfessionalInfoFormData) => {
    setIsSubmitting(true);
    setIsSuccess(false);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSuccess(true);

    toast({
      title: "Success",
      description: "Professional information updated successfully!",
      className: "bg-green-950 border-green-800 text-green-100",
    });

    setTimeout(() => setIsSuccess(false), 3000);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
            type="number"
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Official Email */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-zinc-300">
            Official Email *
          </label>
          <input
            {...register("officialEmail")}
            type="email"
            className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all"
            placeholder="contact@company.com"
          />
          {errors.officialEmail && (
            <p className="text-xs text-red-400">
              {errors.officialEmail.message}
            </p>
          )}
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-zinc-300">
            Phone Number *
          </label>
          <input
            {...register("phone")}
            type="tel"
            className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all"
            placeholder="+1234567890"
          />
          {errors.phone && (
            <p className="text-xs text-red-400">{errors.phone.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* City */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-zinc-300">
            City *
          </label>
          <input
            {...register("city")}
            type="text"
            className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all"
            placeholder="New York"
          />
          {errors.city && (
            <p className="text-xs text-red-400">{errors.city.message}</p>
          )}
        </div>

        {/* Country */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-zinc-300">
            Country *
          </label>
          <input
            {...register("country")}
            type="text"
            className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all"
            placeholder="United States"
          />
          {errors.country && (
            <p className="text-xs text-red-400">{errors.country.message}</p>
          )}
        </div>
      </div>

      {/* Address */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-zinc-300">
          Address *
        </label>
        <input
          {...register("address")}
          type="text"
          className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all"
          placeholder="123 Business Street"
        />
        {errors.address && (
          <p className="text-xs text-red-400">{errors.address.message}</p>
        )}
      </div>

      {/* Additional Info */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-zinc-300">
          Additional Information
        </label>
        <textarea
          {...register("additionalInfo")}
          rows={3}
          className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all resize-none"
          placeholder="Any additional details..."
        />
        {errors.additionalInfo && (
          <p className="text-xs text-red-400">
            {errors.additionalInfo.message}
          </p>
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
            "Save Professional Info"
          )}
        </button>
      </div>
    </form>
  );
}
