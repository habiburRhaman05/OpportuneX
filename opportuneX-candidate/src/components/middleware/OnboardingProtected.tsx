import { useUser } from "@/context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import AuthLoading from "../skelections/AuthLoader";

const OnboardingProtected = ({ children }) => {
  const { user, isLoading } = useUser();
  const navigate = useNavigate();

  if (isLoading) {
    return <AuthLoading />;
  }
  if (!user) {
    return <Navigate to={"/auth/login"} />;
  }
  if (!user?.data?.onboardingSteps.emailVerification) {
    navigate("/onboarding/email-verification");
  } else if (!user?.data?.onboardingSteps.profileInfo) {
    navigate("/onboarding/profile-info");
  }
  return <div>{children}</div>;
};

export default OnboardingProtected;
