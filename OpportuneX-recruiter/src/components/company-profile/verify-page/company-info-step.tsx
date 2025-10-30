import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Building2, Upload, ChevronRight } from "lucide-react";
import { companyInfoSchema, type CompanyInfoFormData } from "@/lib/validation";
import { toast } from "sonner";

interface CompanyInfoStepProps {
  onContinue: (data: CompanyInfoFormData) => void;
  onBack: () => void;
  onShowToast: (message: string, type: "success" | "error") => void;
}

export function CompanyInfoStep({
  onContinue,
  onBack,
  onShowToast,
}: CompanyInfoStepProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CompanyInfoFormData>({
    resolver: zodResolver(companyInfoSchema),
  });

  console.log(errors);
  const onSubmit = (data: CompanyInfoFormData) => {
    onContinue(data);
  };

  return (
    <div className="bg-gradient-to-br from-zinc-900 to-blue-900/20 border border-blue-900/30 rounded-2xl p-10 backdrop-blur-xl shadow-lg">
      <div className="flex items-start gap-4 mb-8">
        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30 flex items-center justify-center flex-shrink-0">
          <Building2 className="w-6 h-6 text-blue-400" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">
            Company Information
          </h2>
          <p className="text-zinc-400">
            Provide your company details and required documents
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-white font-medium mb-3 text-sm">
              Company Name *
            </label>
            <input
              type="text"
              placeholder="Enter your company name"
              {...register("companyName")}
              className={`w-full bg-zinc-800 border rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-1 transition-all ${
                errors.companyName
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                  : "border-zinc-700 focus:border-blue-500 focus:ring-blue-500/20"
              }`}
            />
            {errors.companyName && (
              <p className="text-red-400 text-sm mt-2">
                {errors.companyName.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-white font-medium mb-3 text-sm">
              Registration Number *
            </label>
            <input
              type="text"
              placeholder="e.g., BRN-123456789"
              {...register("registrationNumber")}
              className={`w-full bg-zinc-800 border rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-1 transition-all ${
                errors.registrationNumber
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                  : "border-zinc-700 focus:border-blue-500 focus:ring-blue-500/20"
              }`}
            />
            {errors.registrationNumber && (
              <p className="text-red-400 text-sm mt-2">
                {errors.registrationNumber.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-white font-medium mb-3 text-sm">
            Official Email *
          </label>
          <input
            type="email"
            placeholder="contact@company.com"
            {...register("officialEmail")}
            className={`w-full bg-zinc-800 border rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-1 transition-all ${
              errors.officialEmail
                ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                : "border-zinc-700 focus:border-blue-500 focus:ring-blue-500/20"
            }`}
          />
          {errors.officialEmail && (
            <p className="text-red-400 text-sm mt-2">
              {errors.officialEmail.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-white font-medium mb-3 text-sm">
            Trade License Number *
          </label>
          <input
            type="number"
            placeholder="e.g., 123456789"
            {...register("tradeLicense", { valueAsNumber: true })}
            className={`w-full bg-zinc-800 border rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-1 transition-all ${
              errors.tradeLicense
                ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                : "border-zinc-700 focus:border-blue-500 focus:ring-blue-500/20"
            }`}
          />
          {errors.tradeLicense && (
            <p className="text-red-400 text-sm mt-2">
              {errors.tradeLicense.message}
            </p>
          )}
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 border border-zinc-700"
          >
            Back
          </button>
          <button
            type="submit"
            className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-semibold py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
          >
            Continue to Confirmation
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}
