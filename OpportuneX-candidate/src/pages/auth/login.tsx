import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Lock, Loader2 } from "lucide-react";
import useAuth from "@/hooks/useAuth";
import { FaGoogle, FaLinkedin } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import ErrorAlert from "@/components/shared/error-alert";

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
    <div className="min-h-screen w-full grid md:grid-cols-2 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white overflow-hidden">
      {/* ==== LEFT SIDE ==== */}
      <div className="hidden md:flex flex-col justify-center items-start px-16 relative">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-700/70 via-indigo-900/80 to-gray-950/90" />
        <div className="relative z-10 space-y-6">
          <h1 className="text-5xl font-extrabold leading-tight drop-shadow-lg">
            Welcome Back, <br /> Future Candidate 🚀
          </h1>
          <p className="text-zinc-300 text-lg max-w-lg leading-relaxed">
            Join thousands of professionals finding their dream jobs every day.
            Log in and continue your journey toward success.
          </p>
        </div>
      </div>

      {/* ==== RIGHT SIDE LOGIN ==== */}
      <div className="flex items-center justify-center px-6 sm:px-10 py-16 relative">
        {/* glowing background accent */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-indigo-600/30 blur-[150px] rounded-full" />

        <div className="relative z-10 w-full max-w-md bg-gradient-to-br from-zinc-900/80 via-zinc-900/60 to-zinc-800/70 backdrop-blur-2xl border border-zinc-700/60 shadow-[0_0_25px_rgba(99,102,241,0.2)] rounded-2xl p-10">
          {/* Heading */}
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-indigo-600 bg-clip-text text-transparent drop-shadow-sm">
              Candidate Login
            </h2>
            <p className="text-zinc-400 mt-2">Access your profile securely</p>
          </div>

          {/* Error */}
          {isError && (
            <ErrorAlert
              className="text-red-500 font-semibold text-center mb-4"
              error={error.message}
            />
          )}

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email */}
            <div className="relative group">
              <Mail
                className="absolute top-3.5 left-3 text-zinc-500 group-focus-within:text-indigo-400 transition"
                size={20}
              />
              <input
                type="email"
                placeholder="Email Address"
                {...register("email")}
                className={`w-full pl-10 pr-4 py-3 rounded-xl border bg-zinc-800/60 text-white placeholder-zinc-500 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition ${
                  errors.email ? "border-red-500" : "border-zinc-700"
                }`}
              />
              {errors.email && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="relative group">
              <Lock
                className="absolute top-3.5 left-3 text-zinc-500 group-focus-within:text-indigo-400 transition"
                size={20}
              />
              <input
                type="password"
                placeholder="Password"
                {...register("password")}
                className={`w-full pl-10 pr-4 py-3 rounded-xl border bg-zinc-800/60 text-white placeholder-zinc-500 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition ${
                  errors.password ? "border-red-500" : "border-zinc-700"
                }`}
              />
              {errors.password && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Forgot */}
            <div className="text-right">
              <Link
                to="/forgot-password"
                className="text-indigo-400 hover:text-indigo-300 text-sm transition"
              >
                Forgot password?
              </Link>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isPending && isSubmitting}
              className="w-full flex items-center justify-center bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 disabled:opacity-60 text-white py-3 rounded-xl font-semibold shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-transform active:scale-[0.98]"
            >
              {isPending && isSubmitting ? "Logging in..." : "Login"}
              {isPending && isSubmitting && (
                <Loader2 className="animate-spin ml-2 text-white" />
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-8">
            <div className="flex-grow h-px bg-zinc-700/70" />
            <span className="px-3 text-zinc-500 text-sm">OR</span>
            <div className="flex-grow h-px bg-zinc-700/70" />
          </div>

          {/* Social */}
          <div className="flex gap-3">
            <button className="w-1/2 py-2 flex items-center justify-center gap-x-3 bg-zinc-800/50 border border-zinc-700 rounded-xl hover:bg-indigo-700/40 transition shadow-inner">
              <FaGoogle />
              Google
            </button>
            <button className="w-1/2 py-2 flex items-center justify-center gap-x-3 bg-zinc-800/50 border border-zinc-700 rounded-xl hover:bg-indigo-700/40 transition shadow-inner">
              <FaLinkedin />
              LinkedIn
            </button>
          </div>

          {/* Signup */}
          <p className="mt-6 text-center text-zinc-400 text-sm">
            Don’t have an account?{" "}
            <a
              href="/auth/register"
              className="text-indigo-400 hover:text-indigo-300 font-medium transition"
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CandidateLoginPage;
