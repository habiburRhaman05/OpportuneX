import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Clock, ChevronRight } from "lucide-react";
import {
  otpValidationSchema,
  type OtpValidationFormData,
} from "@/lib/validation";

interface OtpStepProps {
  onSuccess: (email: string) => void;
  onShowToast: (message: string, type: "success" | "error") => void;
}

export function OtpStep({ onSuccess, onShowToast }: OtpStepProps) {
  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<OtpValidationFormData>({
    resolver: zodResolver(otpValidationSchema),
  });

  const email = watch("email");

  const handleSendOtp = async () => {
    if (!email) {
      onShowToast("Please enter your email", "error");
      return;
    }

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    setOtpSent(true);
    onShowToast("OTP sent successfully to your email", "success");
  };

  const handleVerifyOtp = async (data: OtpValidationFormData) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    onShowToast("Email verified successfully", "success");
    onSuccess(data.email);
  };

  return (
    <div className="bg-gradient-to-br from-zinc-900 to-blue-900/20 border border-blue-900/30 rounded-2xl p-10 backdrop-blur-xl shadow-lg">
      <div className="flex items-start gap-4 mb-8">
        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 flex items-center justify-center flex-shrink-0">
          <Mail className="w-6 h-6 text-blue-400" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">
            Verify Your Email
          </h2>
          <p className="text-zinc-400">
            We'll send a verification code to confirm your email address
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(handleVerifyOtp)} className="space-y-6">
        {!otpSent ? (
          <>
            <div>
              <label className="block text-white font-medium mb-3 text-sm">
                Company Email Address
              </label>
              <input
                type="email"
                placeholder="contact@company.com"
                {...register("email")}
                className={`w-full bg-zinc-800 border rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-1 transition-all ${
                  errors.email
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                    : "border-zinc-700 focus:border-blue-500 focus:ring-blue-500/20"
                }`}
              />
              {errors.email && (
                <p className="text-red-400 text-sm mt-2">
                  {errors.email.message}
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={handleSendOtp}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 disabled:opacity-50 text-white font-semibold py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              {isLoading ? "Sending OTP..." : "Send Verification Code"}
              {!isLoading && <ChevronRight className="w-5 h-5" />}
            </button>
          </>
        ) : (
          <>
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 flex items-center gap-3">
              <Clock className="w-5 h-5 text-blue-400 flex-shrink-0" />
              <div>
                <p className="text-white font-medium text-sm">
                  Code sent to {email}
                </p>
                <p className="text-zinc-400 text-xs">
                  Check your email for the 6-digit code
                </p>
              </div>
            </div>

            <div>
              <label className="block text-white font-medium mb-3 text-sm">
                Verification Code
              </label>
              <input
                type="text"
                placeholder="000000"
                maxLength={6}
                {...register("otp")}
                className={`w-full bg-zinc-800 border rounded-lg px-4 py-4 text-white placeholder-zinc-500 focus:outline-none focus:ring-1 transition-all text-center text-3xl tracking-widest font-mono ${
                  errors.otp
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                    : "border-zinc-700 focus:border-blue-500 focus:ring-blue-500/20"
                }`}
              />
              {errors.otp && (
                <p className="text-red-400 text-sm mt-2">
                  {errors.otp.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 disabled:opacity-50 text-white font-semibold py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              {isLoading ? "Verifying..." : "Verify Code"}
              {!isLoading && <ChevronRight className="w-5 h-5" />}
            </button>

            <button
              type="button"
              onClick={() => {
                setOtpSent(false);
                reset();
              }}
              className="w-full text-blue-400 hover:text-blue-300 font-medium py-2 transition-colors text-sm"
            >
              Use different email
            </button>
          </>
        )}
      </form>
    </div>
  );
}
