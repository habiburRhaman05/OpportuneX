"use client";

import { useState } from "react";

import { Shield, ArrowLeft } from "lucide-react";

import { Toast } from "@/components/company-profile/verify-page/toast";
import { OtpStep } from "@/components/company-profile/verify-page/otp-step";
import { CompanyInfoStep } from "@/components/company-profile/verify-page/company-info-step";
import { TermsStep } from "@/components/company-profile/verify-page/terms-step";

import type { CompanyInfoFormData } from "@/lib/validation";
import { useNavigate } from "react-router-dom";
import { StepIndicator } from "@/components/company-profile/verify-page/step-indicator";
import { useApiMutation } from "@/hooks/useApi";
import { useUser } from "@/context/AuthContext";
import { CompanyVerificationSuccess } from "@/components/company-profile/verify-page/verification-complete";

export default function VerifyPage() {
  const router = useNavigate();
  const { recruiter } = useUser();
  const [step, setStep] = useState(1);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const [verifiedEmail, setVerifiedEmail] = useState("");
  const [companyInfoData, setCompanyInfoData] = useState<{
    companyName: string;
    registrationNumber: string;
    tradeNumber: string;
    officeAddress: string;
    officialEmail?: string;
  }>({
    companyName: "",
    registrationNumber: "",
    tradeNumber: "",
    officeAddress: "",
    officialEmail: "",
  });

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
    setCompanyInfoData(data as any);
    setStep(3);
  };

  const submitMutation = useApiMutation({
    url: "/company/verify-form-submit",
    method: "post",
  });

  const handleTermsSubmit = async () => {
    setCompanyInfoData((prev) => {
      return { ...prev, termsAccepted: true };
    });
    await submitMutation.mutateAsync({
      companyId: recruiter.company._id,
      registationNumber: companyInfoData.registrationNumber,
      tradeNumber: companyInfoData.tradeNumber,
      mainOfficeAddress: companyInfoData.officeAddress,
      officialEmail: companyInfoData.officialEmail,
      termsAccepted: true,
    });

    setStep(4);
    console.log({ ...companyInfoData, termsAccepted: true });
  };

  return (
    <>
      {recruiter.company.verified ? (
        <CompanyVerificationSuccess />
      ) : (
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
                isSubmitting={submitMutation.isPending}
              />
            )}

            {/* Step 4: Verification Complete */}
            {step === 4 && <CompanyVerificationSuccess />}
          </div>
        </div>
      )}
    </>
  );
}
