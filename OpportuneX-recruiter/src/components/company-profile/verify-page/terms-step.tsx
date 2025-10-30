import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileText, ChevronRight } from "lucide-react";
import { termsSchema, type TermsFormData } from "@/lib/validation";

interface TermsStepProps {
  onSubmit: () => void;
  onBack: () => void;
  isSubmitting: boolean;
}

export function TermsStep({ onSubmit, onBack, isSubmitting }: TermsStepProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TermsFormData>({
    resolver: zodResolver(termsSchema),
  });

  return (
    <div className="bg-gradient-to-br from-zinc-900 to-blue-900/20 border border-blue-900/30 rounded-2xl p-10 backdrop-blur-xl shadow-lg">
      <div className="flex items-start gap-4 mb-8">
        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30 flex items-center justify-center flex-shrink-0">
          <FileText className="w-6 h-6 text-blue-400" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">
            Review & Confirm
          </h2>
          <p className="text-zinc-400">
            Please review and accept our terms before completing verification
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-blue-500/5 border border-blue-700/30 rounded-lg p-6 max-h-80 overflow-y-auto space-y-5">
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">
              Platform Policies
            </h3>
            <p className="text-zinc-300 text-sm leading-relaxed">
              By verifying your company, you agree to comply with all platform
              policies and guidelines. You commit to maintaining accurate
              company information and following all applicable laws and
              regulations.
            </p>
          </div>

          <div className="border-t border-blue-700/30 pt-5">
            <h3 className="text-white font-semibold mb-2 text-sm">
              Terms of Service
            </h3>
            <p className="text-zinc-300 text-sm leading-relaxed">
              You agree to use our platform solely for legitimate business
              purposes. You will not engage in any fraudulent, deceptive, or
              illegal activities. All information provided must be accurate and
              truthful.
            </p>
          </div>

          <div className="border-t border-blue-700/30 pt-5">
            <h3 className="text-white font-semibold mb-2 text-sm">
              Data Privacy
            </h3>
            <p className="text-zinc-300 text-sm leading-relaxed">
              We collect and process your company information in accordance with
              applicable data protection laws. Your data will be used solely for
              verification and platform operations.
            </p>
          </div>

          <div className="border-t border-blue-700/30 pt-5">
            <h3 className="text-white font-semibold mb-2 text-sm">
              Verification Process
            </h3>
            <p className="text-zinc-300 text-sm leading-relaxed">
              Our team reserves the right to reject any verification application
              that does not meet our standards. We may request additional
              information or documentation at any time.
            </p>
          </div>
        </div>

        <div
          className={`flex items-start gap-3 p-4 border rounded-lg transition-colors ${
            errors.termsAccepted
              ? "bg-red-500/5 border-red-500/30"
              : "bg-blue-500/5 border-blue-700/30 hover:border-blue-500/50"
          }`}
        >
          <input
            type="checkbox"
            id="terms-checkbox"
            {...register("termsAccepted")}
            className="w-5 h-5 mt-0.5 rounded border-zinc-600 bg-zinc-700 text-blue-500 focus:ring-blue-500 cursor-pointer flex-shrink-0"
          />
          <label
            htmlFor="terms-checkbox"
            className="text-zinc-300 cursor-pointer flex-1 text-sm"
          >
            I have read and agree to the{" "}
            <span className="text-white font-medium">Platform Policies</span>,{" "}
            <span className="text-white font-medium">Terms of Service</span>,
            and <span className="text-white font-medium">Data Privacy</span>{" "}
            terms
          </label>
        </div>
        {errors.termsAccepted && (
          <p className="text-red-400 text-sm">{errors.termsAccepted.message}</p>
        )}

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
            disabled={isSubmitting}
            className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 disabled:opacity-50 text-white font-semibold py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
          >
            {isSubmitting ? "Submitting..." : "Complete Verification"}
            {!isSubmitting && <ChevronRight className="w-5 h-5" />}
          </button>
        </div>
      </form>
    </div>
  );
}
