import { recruiterRoutes } from "@/api/endpoints/route";
import { useUser } from "@/context/AuthContext";
import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";

const OnBoardingGuard = ({ children }) => {
  const { recruiter, isLoading } = useUser();
  if (isLoading) {
    return <h1>loading</h1>;
  }
  if (!recruiter) {
    return <Navigate to={"/recruiter/auth/login"} />;
  }

  const setps = recruiter?.onboardingSteps;

  return <div>{children}</div>;
};

export default OnBoardingGuard;
