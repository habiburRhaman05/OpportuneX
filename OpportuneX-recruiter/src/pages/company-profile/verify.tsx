"use client";

import { useState } from "react";

import { Shield, ArrowLeft } from "lucide-react";

import { Toast } from "@/components/company-profile/verify-page/toast";
import { OtpStep } from "@/components/company-profile/verify-page/otp-step";
import { CompanyInfoStep } from "@/components/company-profile/verify-page/company-info-step";
import { TermsStep } from "@/components/company-profile/verify-page/terms-step";
import { VerificationComplete } from "@/components/company-profile/verify-page/verification-complete";
import type { CompanyInfoFormData } from "@/lib/validation";
import { useNavigate } from "react-router-dom";
import { StepIndicator } from "@/components/company-profile/verify-page/step-indicator";

export default function VerifyPage() {
  const router = useNavigate();
  const [step, setStep] = useState(1);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [verifiedEmail, setVerifiedEmail] = useState("");

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleOtpSuccess = (email: string) => {
    setVerifiedEmail(email);
    setStep(2);
  };

  const handleCompanyInfoContinue = async (data: CompanyInfoFormData) => {
    console.log("[v0] Company info submitted:", data);
    setStep(3);
  };

  const handleTermsSubmit = async () => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    showToast("Verification submitted successfully", "success");
    setStep(4);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-blue-950/20 to-zinc-950">
      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        {step < 4 && <StepIndicator currentStep={step} totalSteps={3} />}

        {/* Step 1: Email OTP Validation */}
        {step === 1 && (
          <OtpStep onSuccess={handleOtpSuccess} onShowToast={showToast} />
        )}

        {/* Step 2: Company Information & Trade License */}
        {step === 2 && (
          <CompanyInfoStep
            onContinue={handleCompanyInfoContinue}
            onBack={() => setStep(1)}
            onShowToast={showToast}
          />
        )}

        {/* Step 3: Terms & Conditions */}
        {step === 3 && (
          <TermsStep
            onSubmit={handleTermsSubmit}
            onBack={() => setStep(2)}
            isSubmitting={isSubmitting}
          />
        )}

        {/* Step 4: Verification Complete */}
        {step === 4 && <VerificationComplete />}
      </div>
    </div>
  );
}
