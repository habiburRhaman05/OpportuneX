import useAuth from "@/hooks/useAuth";
import { ReactNode, useState } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import AppIntro from "./AppIntro";
import { useUser } from "@/context/AuthContext";
import AuthLoading from "./skelections/AuthLoader";
export const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const { isLoading, recruiter } = useUser();
  const publicPaths = ["login", "register"];
  if (isLoading) {
    return <AuthLoading />;
  }
  if (publicPaths.some((p) => location.pathname.includes(p))) {
    return <div>{children}</div>;
  }
  if (!recruiter) {
    return (
      <Navigate to="/recruiter/auth/login" state={{ form: location }} replace />
    );
  }
  if (!recruiter.onboardingSteps.emailVerification) {
    return (
      <Navigate to="/recruiter/auth/onboarding/email-verification" replace />
    );
  }
  if (!recruiter.onboardingSteps.company) {
    return <Navigate to="/recruiter/auth/onboarding/company" replace />;
  }

  return <div>{children}</div>;
};
