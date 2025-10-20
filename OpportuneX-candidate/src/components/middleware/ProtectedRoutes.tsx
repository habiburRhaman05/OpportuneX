import ProfileSkeleton from "@/components/skelections/ProfilePageSkelection";
import { useUser } from "@/context/AuthContext";
import { Loader2 } from "lucide-react";

import { Navigate } from "react-router-dom";
import { Button } from "../ui/button";
import AuthLoading from "../skelections/AuthLoader";

function ProtectedRoutes({ children, Loader }) {
  const { user, isLoading } = useUser();
  if (isLoading) {
    return AuthLoader(Loader);
  }
  if (!user) {
    return <Navigate to={"/auth/login"} />;
  }
  if (!user?.data?.onboardingSteps.emailVerification) {
    return <Navigate to={"/onboarding/email-verification"} />;
  }
  if (!user?.data?.onboardingSteps.profileInfo) {
    return <Navigate to={"/onboarding/profile-info"} />;
  }

  return <div>{children}</div>;
}

export default ProtectedRoutes;

const AuthLoader = (value) => {
  switch (value) {
    case "profile-skelection":
      return <ProfileSkeleton />;
    default:
      return <AuthLoading />;
  }
};
