import Header from "@/components/shared/Header";
import OnboardingSteps from "@/components/onboarding-page/onboarding-steps";
import useAuth from "@/hooks/useAuth";
import React from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import AuthLoading from "@/components/skelections/AuthLoader";
import { useUser } from "@/context/AuthContext";

const OnBoardingLayout = () => {
  const { user, isLoading } = useUser();
  const path = useLocation().pathname;
  if (isLoading) {
    return <AuthLoading />;
  }
  if (!user) {
    return <Navigate to={"/auth/login"} />;
  }

  return (
    <div>
      <Header />
      <h1 className="text-2xl mt-5 font-bold text-center">
        Complete your Profile setup
      </h1>
      <OnboardingSteps />
      <Outlet />
    </div>
  );
};

export default OnBoardingLayout;
