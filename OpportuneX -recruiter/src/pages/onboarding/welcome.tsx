import { Navigate, useNavigate } from "react-router-dom";
import { OnboardingLayout } from "@/components/onboarding/OnboardingLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  CheckCircle,
  Briefcase,
  Users,
  Target,
  PartyPopper,
  Sparkles,
} from "lucide-react";
import { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import { useUser } from "@/context/AuthContext";

export default function StartRecruiting() {
  const navigate = useNavigate();
  const [showCelebration, setShowCelebration] = useState(true);
  const { recruiter } = useUser();

  if (!recruiter.onboardingSteps.emailVerification) {
    return (
      <Navigate to={"/recruiter/auth/onboarding/email-verification"} replace />
    );
  }
  if (!recruiter.onboardingSteps.company) {
    return <Navigate to={"/recruiter/auth/onboarding/company"} replace />;
  }
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCelebration(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <OnboardingLayout
      currentStep={4}
      title="Welcome to OpportuneX !"
      subtitle="You're all set up and ready to start recruiting"
    >
      <div className="space-y-8 text-center relative">
        {/* Celebration Animation */}
        {showCelebration && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/4 animate-bounce">
              <PartyPopper className="w-8 h-8 text-success animate-pulse" />
            </div>
            <div className="absolute top-4 right-1/4 animate-bounce delay-200">
              <Sparkles className="w-6 h-6 text-success animate-pulse" />
            </div>
            <div className="absolute top-8 left-3/4 animate-bounce delay-500">
              <Sparkles className="w-4 h-4 text-success animate-pulse" />
            </div>
            <div className="absolute top-12 left-1/2 animate-bounce delay-700">
              <PartyPopper className="w-5 h-5 text-success animate-pulse" />
            </div>
          </div>
        )}

        <div className="flex justify-center">
          <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center animate-pulse">
            <CheckCircle className="w-8 h-8 text-success" />
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Your Setup Completed!</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Your company profile is ready. Now you can start finding and hiring
            amazing talent.
          </p>
        </div>

        <div className="space-y-4 pt-6">
          <Button
            size="lg"
            onClick={() => navigate("/recruiter/dashboard")}
            className="min-w-[200px] bg-success hover:bg-success/90 text-success-foreground"
          >
            Go to Dashboard
          </Button>
        </div>
      </div>
    </OnboardingLayout>
  );
}
