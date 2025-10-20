import { useState, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { toast } from "sonner";
import useAuth from "@/hooks/useAuth";
import { Loader, Loader2 } from "lucide-react";
import axios from "axios";
import { useUser } from "@/context/AuthContext";
import { queryClientIns } from "@/components/shared/QueryClientWrapper";
import AuthLoading from "@/components/skelections/AuthLoader";
import { UseMutationResult } from "@tanstack/react-query";
import { useApiMutation } from "@/hooks/useApi";
import { candidatesRoutes } from "@/api/endpoints/routes";

export default function EmailVerification() {
  const [otp, setOtp] = useState("");

  const [expiryTime, setExpiryTime] = useState<number | null>(null); // Unix timestamp in seconds
  const [timeLeft, setTimeLeft] = useState(0);
  const [canResend, setCanResend] = useState(false);
  const [submiting, setSubmiting] = useState(false);
  const { user, isLoading } = useUser();
  const { resendOtpMutation } = useAuth();
  const navigate = useNavigate();
  // Format seconds -> mm:ss
  const formatTime = (seconds: number) => {
    if (seconds <= 0) return "00:00";
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Initialize expiry time when user is loaded
  useEffect(() => {
    if (user?.data?.otpExpiresAt) {
      const expiresAt = new Date(user?.data?.otpExpiresAt).getTime(); // in ms
      const unixTimestamp = Math.floor(expiresAt / 1000); // in seconds
      setExpiryTime(unixTimestamp);
    } else {
      setCanResend(true);
    }
  }, [user]);

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

  const handleResendOTP = async () => {
    if (!canResend) return;
    await resendOtpMutation.mutateAsync({ email: user.data.email });
    // Update expiry time after resend
    if (user?.data?.otpExpiresAt) {
      const expiresAt = new Date(user?.data?.otpExpiresAt).getTime();
      const unixTimestamp = Math.floor(expiresAt / 1000);
      setExpiryTime(unixTimestamp);
    }
    setOtp("");
  };

  const onboardingVerifyOtpMutation: UseMutationResult = useApiMutation({
    url: candidatesRoutes.onboardingVerifyOtp,
    method: "put",
  });
  const handleVerify = async () => {
    if (otp.length !== 6) {
      toast.error("Please enter a valid 6-digit code");
      return;
    }
    await onboardingVerifyOtpMutation.mutateAsync({
      email: user.data.email,
      otp,
    });
  };
  useEffect(() => {
    if (onboardingVerifyOtpMutation.isSuccess) {
      navigate("/onboarding/profile-info");
    }
  }, [onboardingVerifyOtpMutation.isSuccess]);
  useEffect(() => {
    if (user.data.onboardingSteps.emailVerification) {
      navigate("/onboarding/profile-info");
    }
  }, [user]);

  return (
    <div>
      <div className="max-w-xl mx-auto mt-8 space-y-6 text-center">
        <div className="space-y-4">
          <h1>
            We Are Sended a Veriffication Code on your Email -{" "}
            <span className="font-bold text-blue-600">
              {" "}
              {user?.data?.email}
            </span>
          </h1>
          <div className="text-sm text-muted-foreground">
            Enter the verification code below
          </div>

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
              className="text-sm bg-zinc-800 text-white "
            >
              {resendOtpMutation.isPending ? (
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

        <Button
          onClick={handleVerify}
          disabled={otp.length !== 6}
          className="min-w-[140px] bg-blue-600 text-white"
        >
          {onboardingVerifyOtpMutation.isPending && (
            <Loader className="animate-spin ml-2" />
          )}
          Verify Email
        </Button>
      </div>
    </div>
  );
}
