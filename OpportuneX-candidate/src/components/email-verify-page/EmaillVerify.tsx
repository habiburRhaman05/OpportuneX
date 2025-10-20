"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, CheckCircle, Clock, RefreshCw, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import useCustomParams from "@/hooks/useParams";
import { useParams } from "react-router-dom";

const EmailVerify = () => {
  const { getParams } = useCustomParams();
  const [verificationCode, setVerificationCode] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(true);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [isExpired, setIsExpire] = useState(false);
  const [expireTime, setExpireTime] = useState<any>(
    new Date(Date.now() + 60 * 1000)
  );
  const [secondsLeft, setSecondsLeft] = useState(30);
  const [countdown, setCountdown] = useState(0);
  const { toast } = useToast();
  const usermail = getParams("email");

  const { id } = useParams();
  //   const { handleEmailVerify, emailVarifactionStatus } = useAuth();

  const handleSendVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!usermail && !verificationCode) return;
    // await handleEmailVerify({ userId: id, otp: verificationCode });
    // toast({
    //   title: "Verification email sent!",
    //   description: `We've sent a verification code to ${usermail}`,
    // });
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!verificationCode) return;

    setIsVerifying(true);

    setTimeout(() => {
      setIsVerifying(false);
      toast({
        title: "Email verified successfully!",
        description:
          "Your email has been verified. You can now access your account.",
      });
    }, 2000);
  };

  const handleResendCode = () => {
    if (countdown > 0) return;
    setIsExpire(false);
    const newExpire = new Date(Date.now() + 60 * 1000); // 1 min
    setExpireTime(newExpire);

    setIsResending(true);

    setTimeout(() => {
      setIsResending(false);
      toast({
        title: "Verification code resent!",
        description: `A new verification code has been sent to ${usermail}`,
      });
    }, 1000);
  };

  return (
    <div className=" bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md relative">
        <div className="absolute -top-2 -left-2 -right-2 -bottom-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl blur-xl opacity-20 animate-pulse"></div>

        <Card className="relative bg-white/80 backdrop-blur-xl border-0 shadow-2xl shadow-blue-500/10">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Mail className="w-8 h-8 text-white animate-bounce" />
            </div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              {!isEmailSent ? "Verify Your Email" : "Check Your Inbox"}
            </CardTitle>
            <CardDescription className="text-gray-600 mt-2">
              {!isEmailSent
                ? "Enter your email address to receive a verification code"
                : "We've sent a verification code to your email address"}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="text-center py-4">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <p className="text-sm text-gray-600">
                  Verification code sent to
                </p>
                <p className="font-semibold text-gray-900">{usermail}</p>
              </div>

              <form onSubmit={handleVerifyCode} className="space-y-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="code"
                    className="text-sm font-medium text-gray-700"
                  >
                    Verification Code
                  </Label>
                  <Input
                    id="code"
                    type="text"
                    placeholder="Enter 6-digit code"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    className="h-12 border-2 border-gray-200 focus:border-blue-500 rounded-xl text-center text-lg font-mono tracking-widest"
                    maxLength={6}
                    required
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isVerifying}
                  onClick={handleSendVerification}
                  className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-[1.02] shadow-lg disabled:opacity-70"
                >
                  {isVerifying ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    "Verify Email"
                  )}
                </Button>
              </form>

              <div className="text-center space-y-2">
                <p className="text-sm text-gray-600">
                  Didn't receive the code?
                </p>

                {isExpired ? (
                  <Button
                    variant="ghost"
                    disabled
                    className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 font-medium"
                  >
                    <Clock className="w-4 h-4 mr-2" />
                    Resend in {secondsLeft}s
                  </Button>
                ) : (
                  <Button
                    variant="ghost"
                    onClick={handleResendCode}
                    disabled={isResending}
                    className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 font-medium"
                  >
                    {isResending ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        Resending...
                      </>
                    ) : (
                      "Resend Code"
                    )}
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmailVerify;
