import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Lock, Loader2, User } from "lucide-react";
import useAuth from "@/hooks/useAuth";
import { FaGoogle, FaLinkedin } from "react-icons/fa";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ErrorAlert from "@/components/shared/error-alert";

// ✅ Zod Schema
const registerFormSchema = z.object({
  fullName: z.string().min(5, "Full name must be at least 5 characters"),
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  terms: z.literal(true, {
    errorMap: () => ({ message: "You must accept terms & conditions" }),
  }),
});

type RegisterFormData = z.infer<typeof registerFormSchema>;

const CandidateRegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  });

  const navigate = useNavigate();
  const {
    registerMutation: {
      mutateAsync: handleRegister,
      isSuccess,
      isPending,
      isError,
      error,
    },
  } = useAuth();

  const onSubmit = async (data: RegisterFormData) => {
    await handleRegister({
      email: data.email,
      password: data.password,
      fullName: data.fullName,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/candidate/profile");
    }
  }, [isSuccess]);

  return (
    <div className="min-h-screen w-full grid md:grid-cols-2 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white overflow-hidden">
      {/* ==== LEFT SIDE CONTENT ==== */}
      <div className="hidden md:flex flex-col justify-center items-start px-16 relative">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-700/70 via-indigo-900/80 to-gray-950/90" />
        <div className="relative z-10 space-y-6">
          <h1 className="text-5xl font-extrabold leading-tight drop-shadow-lg">
            Join Our Platform <br /> and Grow Your Career 🚀
          </h1>
          <p className="text-zinc-300 text-lg max-w-lg leading-relaxed">
            Create your account and start exploring thousands of job
            opportunities available for you. Track applications, build your
            profile, and connect with top employers.
          </p>
        </div>
      </div>

      {/* ==== RIGHT SIDE REGISTER FORM ==== */}
      <div className="flex items-center justify-center px-6 sm:px-10 py-16 relative">
        {/* glowing background accent */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-indigo-600/20 blur-[160px] rounded-full pointer-events-none hidden lg:block" />

        <div className="relative z-10 w-full max-w-md bg-gradient-to-br from-zinc-900/80 via-zinc-900/60 to-zinc-800/70 backdrop-blur-2xl border border-zinc-700/60 shadow-[0_0_25px_rgba(99,102,241,0.2)] rounded-2xl p-10">
          {/* Heading */}
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-indigo-600 bg-clip-text text-transparent drop-shadow-sm">
              Create Account
            </h2>
            <p className="text-zinc-400 mt-2">Start your journey today</p>
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
            {/* Full Name */}
            <div className="relative group">
              <User
                className="absolute top-3.5 left-3 text-zinc-500 group-focus-within:text-indigo-400 transition"
                size={20}
              />
              <input
                placeholder="John Doe"
                {...register("fullName")}
                className={`w-full pl-10 pr-4 py-3 rounded-xl border bg-zinc-800/60 text-white placeholder-zinc-500 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition ${
                  errors.fullName ? "border-red-500" : "border-zinc-700"
                }`}
              />
              {errors.fullName && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.fullName.message}
                </p>
              )}
            </div>

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

            {/* Terms */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                {...register("terms")}
                className="w-4 h-4 rounded border-zinc-700 bg-zinc-900 text-blue-500 focus:ring-0"
              />
              <span className="text-sm text-zinc-400">
                I accept the{" "}
                <span className="text-blue-500">Terms & Conditions</span>
              </span>
            </div>
            {errors.terms && (
              <p className="text-red-400 text-sm">{errors.terms.message}</p>
            )}

            {/* Register Button */}
            <button
              type="submit"
              disabled={isPending && isSubmitting}
              className="w-full flex items-center justify-center bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 disabled:opacity-60 text-white py-3 rounded-xl font-semibold shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-transform active:scale-[0.98]"
            >
              {isPending && isSubmitting
                ? "Creating Account"
                : "Create Account"}
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

          {/* Social Login */}
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

          {/* Login Link */}
          <p className="mt-6 text-center text-zinc-400 text-sm">
            Already have an account?{" "}
            <a
              href="/auth/login"
              className="text-indigo-400 hover:text-indigo-300 font-medium transition"
            >
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CandidateRegisterPage;
