import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useParams } from "react-router-dom";
import { resetPassword } from "./../../../../OpportuneX-backend/controllers/candidateController";
import { useApiMutation } from "@/hooks/useApi";

// Zod schema for password validation
const changePasswordSchema = z
  .object({
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
// ✅ Type inference from schema
type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;

const ResetPasswordPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
  });

  const token = useParams().token;

  const resetPasswordMutation = useApiMutation({
    url: `/candidate/auth/reset-password/${token}`,
    method: "post",
  });

  const onSubmit = async (data) => {
    await resetPasswordMutation.mutateAsync({ password: data.password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      {resetPasswordMutation.isSuccess ? (
        <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Password Changed Successfully!
          </h2>
          <p className="text-gray-300 mb-6">
            Your password has been updated. You can now login with your new
            password.
          </p>
          <Link
            to="/auth/login"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md transition-colors"
          >
            Back to Login
          </Link>
        </div>
      ) : (
        <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">
            Change Password
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label className="block text-gray-200 mb-2">New Password</label>
            <input
              type="password"
              placeholder="Enter new password"
              {...register("password")}
              className={`w-full p-3 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 mb-2 ${
                errors.password
                  ? "focus:ring-red-500 border border-red-500"
                  : "focus:ring-blue-500"
              }`}
              disabled={resetPasswordMutation.isPending}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mb-4">
                {errors.password.message}
              </p>
            )}

            <label className="block text-gray-200 mb-2">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm new password"
              {...register("confirmPassword")}
              className={`w-full p-3 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 mb-2 ${
                errors.confirmPassword
                  ? "focus:ring-red-500 border border-red-500"
                  : "focus:ring-blue-500"
              }`}
              disabled={resetPasswordMutation.isPending}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mb-4">
                {errors.confirmPassword.message}
              </p>
            )}

            <button
              type="submit"
              disabled={resetPasswordMutation.isPending}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition-colors flex items-center justify-center gap-2"
            >
              {resetPasswordMutation.isPending && (
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
              {resetPasswordMutation.isPending
                ? "Updating..."
                : "Change Password"}
            </button>
          </form>
          <p className="text-gray-400 text-sm mt-4 text-center">
            Remembered your password?{" "}
            <Link to="/auth/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        </div>
      )}
    </div>
  );
};

export default ResetPasswordPage;
