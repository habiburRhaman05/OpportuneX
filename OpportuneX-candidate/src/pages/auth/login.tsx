import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Lock, Loader2 } from "lucide-react";
import useAuth from "@/hooks/useAuth";
import { FaGoogle, FaLinkedin } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ErrorAlert from "@/components/shared/error-alert";
// import { loginMutation } from "@/services/auth.service";

// ✅ Zod Schema
const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const CandidateLoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const { loginMutation } = useAuth();
  const {
    mutateAsync: handleLogin,
    isPending,
    isSuccess,
    isError,
    error,
  } = loginMutation;
  const navigate = useNavigate();

  const onSubmit = async (data: LoginFormData) => {
    await handleLogin({
      email: data.email,
      password: data.password,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/candidate/profile");
    }
  }, [isSuccess]);

  return (
    <div className=" flex items-center justify-center min-h-full  p-6">
      {/* Glass Card */}
      <div className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-2xl shadow-2xl w-full max-w-md p-8 sm:p-10">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-white mb-2 text-center">
          Candidate Login
        </h2>
        <p className="text-zinc-400 text-center mb-8">Access your Profile</p>

        {/* error alert */}
        {isError && (
          <ErrorAlert
            className={"text-red-800 font-bold text-center my-4 text-xl"}
            error={error.message}
          />
        )}
        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email */}
          <div className="relative">
            <Mail className="absolute top-3 left-3 text-zinc-500" size={20} />
            <input
              type="email"
              placeholder="Email"
              {...register("email")}
              className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                errors.email ? "border-red-500" : "border-zinc-700"
              } bg-zinc-800/70 text-white placeholder-zinc-500 focus:border-indigo-500 focus:ring focus:ring-indigo-600/30 outline-none transition`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute top-3 left-3 text-zinc-500" size={20} />
            <input
              type="password"
              placeholder="Password"
              {...register("password")}
              className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                errors.password ? "border-red-500" : "border-zinc-700"
              } bg-zinc-800/70 text-white placeholder-zinc-500 focus:border-indigo-500 focus:ring focus:ring-indigo-600/30 outline-none transition`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <a
              href="#"
              className="text-indigo-400 hover:text-indigo-300 text-sm"
            >
              Forgot password?
            </a>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={isPending && isSubmitting}
            className="w-full flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white py-3 rounded-xl font-semibold shadow-lg shadow-indigo-600/30 transition"
          >
            {isPending && isSubmitting ? "Logging in..." : "Login"}
            {isPending && isSubmitting && (
              <Loader2 className="animate-spin ml-2 text-white" />
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-zinc-700" />
          <span className="px-3 text-zinc-500 text-sm">OR</span>
          <div className="flex-grow h-px bg-zinc-700" />
        </div>

        {/* Social Login */}
        <div className="flex gap-3">
          <button className="w-1/2 py-2 flex items-center hover:bg-blue-800 justify-center gap-x-4 rounded-xl bg-zinc-800  border border-zinc-700 text-white transition">
            <FaGoogle />
            Google
          </button>
          <button className="w-1/2 py-2 flex items-center hover:bg-blue-800 justify-center gap-x-4 rounded-xl bg-zinc-800  border border-zinc-700 text-white transition">
            <FaLinkedin />
            Linkedin
          </button>
        </div>

        {/* Signup */}
        <p className="mt-6 text-center text-zinc-500 text-sm">
          Don’t have an account?{" "}
          <a
            href="/auth/register"
            className="text-indigo-400 hover:text-indigo-300"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default CandidateLoginPage;
