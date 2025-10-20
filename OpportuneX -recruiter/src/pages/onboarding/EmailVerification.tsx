import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { OnboardingLayout } from "@/components/onboarding/OnboardingLayout";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { toast } from "sonner";
import useAuth from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";
import { useUser } from "@/context/AuthContext";
import { queryClientIns } from "@/components/QueryClientWrapper";

export default function EmailVerification() {
  // const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [expiryTime, setExpiryTime] = useState<number | null>(null); // Unix timestamp in seconds
  const [timeLeft, setTimeLeft] = useState(0);
  const [canResend, setCanResend] = useState(false);
  const { resendOtp, handleEmailVerifyMutation, reValidateData } = useAuth();
  const { recruiter } = useUser();

  // Format seconds -> mm:ss
  const formatTime = (seconds: number) => {
    if (seconds <= 0) return "00:00";
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Initialize expiry time when user is loaded
  useEffect(() => {
    if (recruiter?.otpExpiresAt) {
      const expiresAt = new Date(recruiter.otpExpiresAt).getTime(); // in ms
      const unixTimestamp = Math.floor(expiresAt / 1000); // in seconds
      setExpiryTime(unixTimestamp);
    } else {
      setCanResend(true);
    }
  }, [recruiter]);

  // Countdown timer
  useEffect(() => {
    if (!expiryTime) return;
    const updateTimer = () => {
      const now = Math.floor(Date.now() / 1000);
      const remaining = expiryTime - now;
      setTimeLeft(remaining > 0 ? remaining : 0);
      setCanResend(remaining <= 0);
    };

    updateTimer(); // run immediately
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [expiryTime]);

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) {
      toast.error("Please enter a valid 6-digit code");
      return;
    }

    await handleEmailVerifyMutation.mutateAsync({
      email: recruiter.email,
      otp: otp,
    });
  };

  const handleResendOTP = async () => {
    if (!canResend) return;
    resendOtp.mutate({});

    setOtp("");
    // Update expiry time after resend
    if (recruiter.otpExpiresAt) {
      const expiresAt = new Date(recruiter.otpExpiresAt).getTime();
      const unixTimestamp = Math.floor(expiresAt / 1000);
      setExpiryTime(unixTimestamp);
    }
  };

  if (recruiter.onboardingSteps.emailVerification) {
    return <Navigate to={"/recruiter/auth/onboarding/company"} replace />;
  }

  const navigate = useNavigate();

  useEffect(() => {
    if (handleEmailVerifyMutation.isSuccess) {
      navigate("/recruiter/auth/onboarding/company");
    }
  }, [handleEmailVerifyMutation.isSuccess]);
  useEffect(() => {
    queryClientIns.invalidateQueries({
      queryKey: ["fetch-profile-data"],
    });
  }, [resendOtp.isSuccess]);

  return (
    <OnboardingLayout
      currentStep={2}
      title="Verify your email"
      subtitle="We sent a 6-digit code to your email address"
    >
      <div className="space-y-6 text-center">
        <div className="space-y-4">
          <div className="text-sm text-muted-foreground">
            Enter the verification code below
          </div>
          <button onClick={() => {}}>click</button>

          <div className="flex justify-center">
            <InputOTP maxLength={6} value={otp} onChange={setOtp}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>
        </div>

        <div className="space-y-4">
          <div className="text-sm text-muted-foreground">
            {timeLeft > 0 ? (
              <>Code expires in {formatTime(timeLeft)}</>
            ) : (
              <>Code expired</>
            )}
          </div>

          {canResend && (
            <Button
              onClick={handleResendOTP}
              disabled={!canResend}
              className="text-sm"
            >
              {resendOtp.isPending ? (
                <div className="flex items-center">
                  <span>ReSending Otp</span>
                  <Loader2 className="animate-spin ml-3" />
                </div>
              ) : (
                <span> Resend Otp</span>
              )}
            </Button>
          )}
        </div>

        <div className="flex justify-between pt-6">
          <Button
            type="button"
            variant="outline"
            // onClick={() => navigate("/onboarding/register")}
          >
            Back
          </Button>

          <Button
            onClick={handleVerifyOTP}
            disabled={otp.length !== 6}
            className="min-w-[140px]"
          >
            {handleEmailVerifyMutation.isPending && "Loading..."}
            Verify Email
          </Button>
        </div>
      </div>
    </OnboardingLayout>
  );
}
