import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { useApiMutation } from "@/hooks/useApi";
import { candidatesRoutes } from "@/api/endpoints/routes";

/**
 * ✅ Zod Schema Validation
 * English: Ensures email is valid format.
 * বাংলা: এই স্কিমা ইমেইল ফরম্যাট সঠিক আছে কিনা যাচাই করে।
 */
const resetPasswordSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

const ForgetPassword: React.FC = () => {
  const [sentEmail, setSentEmail] = useState<string | null>(null);

  // ✅ React Hook Form Setup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  /**
   * ✅ useApiMutation for async API request
   * English: Custom hook that manages API call state (loading, success, error)
   * বাংলা: এই হুকটি API রিকোয়েস্টের স্টেট (লোডিং, সফল, ব্যর্থ) ম্যানেজ করে।
   */
  const forgotPasswordMutation = useApiMutation({
    url: candidatesRoutes.forgotPassword,
    method: "post",
  });

  /**
   * ✅ Submit handler
   * English: Sends email to API and stores it in state on success.
   * বাংলা: ইমেইল API তে পাঠায় এবং সফল হলে সেটি স্টেটে সংরক্ষণ করে।
   */
  const onSubmit = async (data: ResetPasswordFormData) => {
    try {
      await forgotPasswordMutation.mutateAsync({ email: data.email });
      setSentEmail(data.email);
    } catch (error) {
      console.error("Password reset failed:", error);
    }
  };

  // ✅ If success, show success card
  if (forgotPasswordMutation.isSuccess && sentEmail) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md text-center">
          <div className="flex flex-col items-center">
            {/* ✅ Success Icon */}
            <svg
              className="w-16 h-16 text-green-500 mb-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>

            <h2 className="text-2xl font-bold text-white mb-2">
              Email Sent Successfully!
            </h2>
            <p className="text-gray-300 mb-2">Reset link has been sent to:</p>
            <p className="text-blue-400 font-semibold mb-6">{sentEmail}</p>

            <Link
              target="_blank"
              to="https://mail.google.com/"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md transition-colors"
            >
              View your Inbox
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ✅ Default form UI
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          Reset Password
        </h2>
        <p className="text-gray-300 mb-6 text-center">
          Enter your email to receive a password reset link
        </p>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <label className="block text-gray-200 mb-2">Email Address</label>
          <input
            type="email"
            placeholder="Enter your email"
            {...register("email")}
            className={`w-full p-3 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 mb-2 ${
              errors.email
                ? "focus:ring-red-500 border border-red-500"
                : "focus:ring-blue-500"
            }`}
            disabled={forgotPasswordMutation.isPending}
          />

          {errors.email && (
            <p className="text-red-500 text-sm mb-4">{errors.email.message}</p>
          )}

          {forgotPasswordMutation.isError && (
            <p className="text-red-500 text-sm mb-4">
              {(forgotPasswordMutation.error as any)?.message ||
                "Failed to send reset link. Try again."}
            </p>
          )}

          <button
            type="submit"
            disabled={forgotPasswordMutation.isPending}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition-colors flex items-center justify-center gap-2"
          >
            {forgotPasswordMutation.isPending && (
              <svg
                className="w-5 h-5 animate-spin text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
            )}
            {forgotPasswordMutation.isPending ? "Sending..." : "Next"}
          </button>
        </form>

        <p className="text-gray-400 text-sm mt-4 text-center">
          Remembered your password?{" "}
          <Link to="/auth/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgetPassword;
