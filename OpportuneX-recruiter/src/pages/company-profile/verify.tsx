"use client";

import type React from "react";
import { useState } from "react";
// import { useRouter } from "next/navigation";
import {
  Shield,
  ArrowLeft,
  CheckCircle2,
  Upload,
  Mail,
  FileText,
  Building2,
  Clock,
  AlertCircle,
  X,
  ChevronRight,
} from "lucide-react";

export default function VerifyPage() {
  //   const router = useRouter();
  const [step, setStep] = useState(1);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  // Step 1: OTP Validation
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);

  // Step 2: Company Info & Documents
  const [formData, setFormData] = useState({
    companyName: "",
    registrationNumber: "",
    officialEmail: "",
    tradeLicense: null as File | null,
    additionalDoc: null as File | null,
    description: "",
  });

  // Step 3: Terms & Conditions
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Show toast notification
  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Step 1: Send OTP
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      showToast("Please enter your email", "error");
      return;
    }

    setOtpLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setOtpLoading(false);
    setOtpSent(true);
    showToast("OTP sent successfully to your email", "success");
  };

  // Step 1: Verify OTP
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp || otp.length !== 6) {
      showToast("Please enter a valid 6-digit OTP", "error");
      return;
    }

    setOtpLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setOtpLoading(false);
    setOtpVerified(true);
    showToast("Email verified successfully", "success");
  };

  // Step 2: Handle input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Step 2: Handle file changes
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fileType: "tradeLicense" | "additionalDoc"
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, [fileType]: file }));
    }
  };

  // Step 2: Continue to next step
  const handleStep2Continue = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.companyName ||
      !formData.registrationNumber ||
      !formData.officialEmail ||
      !formData.tradeLicense
    ) {
      showToast(
        "Please fill all required fields and upload trade license",
        "error"
      );
      return;
    }
    setStep(3);
  };

  // Step 3: Submit verification
  const handleSubmitVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!termsAccepted) {
      showToast("Please accept the terms and conditions", "error");
      return;
    }

    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setStep(4);
  };

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Toast Notification */}

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        {step < 4 && (
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              {[1, 2, 3].map((s, idx) => (
                <div key={s} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`w-14 h-14 rounded-full flex items-center justify-center font-semibold transition-all duration-300 shadow-lg ${
                        s < step
                          ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
                          : s === step
                          ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white ring-4 ring-amber-500/20"
                          : "bg-zinc-800 text-zinc-400 border border-zinc-700"
                      }`}
                    >
                      {s < step ? <CheckCircle2 className="w-7 h-7" /> : s}
                    </div>
                    <p
                      className={`text-sm font-medium mt-3 text-center transition-colors ${
                        s <= step ? "text-white" : "text-zinc-500"
                      }`}
                    >
                      {s === 1
                        ? "Email Verification"
                        : s === 2
                        ? "Company Info"
                        : "Confirmation"}
                    </p>
                  </div>
                  {s < 3 && (
                    <div
                      className={`h-1 w-16 mx-2 rounded-full transition-all duration-300 ${
                        s < step
                          ? "bg-gradient-to-r from-green-500 to-emerald-500"
                          : "bg-zinc-800"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 1: Email OTP Validation */}
        {step === 1 && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-10 backdrop-blur-xl shadow-lg">
            <div className="flex items-start gap-4 mb-8">
              <div className="w-12 h-12 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center flex-shrink-0">
                <Mail className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">
                  Verify Your Email
                </h2>
                <p className="text-zinc-400">
                  We'll send a verification code to confirm your email address
                </p>
              </div>
            </div>

            {!otpVerified ? (
              <form className="space-y-6">
                {!otpSent ? (
                  <>
                    <div>
                      <label className="block text-white font-medium mb-3 text-sm">
                        Company Email Address
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="contact@company.com"
                        className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/20 transition-all"
                        required
                      />
                    </div>

                    <button
                      onClick={handleSendOtp}
                      disabled={otpLoading}
                      className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 disabled:opacity-50 text-white font-semibold py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                    >
                      {otpLoading ? "Sending OTP..." : "Send Verification Code"}
                      {!otpLoading && <ChevronRight className="w-5 h-5" />}
                    </button>
                  </>
                ) : (
                  <>
                    <div className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-4 flex items-center gap-3">
                      <Clock className="w-5 h-5 text-amber-400 flex-shrink-0" />
                      <div>
                        <p className="text-white font-medium text-sm">
                          Code sent to {email}
                        </p>
                        <p className="text-zinc-400 text-xs">
                          Check your email for the 6-digit code
                        </p>
                      </div>
                    </div>

                    <div>
                      <label className="block text-white font-medium mb-3 text-sm">
                        Verification Code
                      </label>
                      <input
                        type="text"
                        value={otp}
                        onChange={(e) =>
                          setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                        }
                        placeholder="000000"
                        maxLength={6}
                        className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-4 text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/20 transition-all text-center text-3xl tracking-widest font-mono"
                        required
                      />
                    </div>

                    <button
                      onClick={handleVerifyOtp}
                      disabled={otpLoading}
                      className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 disabled:opacity-50 text-white font-semibold py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                    >
                      {otpLoading ? "Verifying..." : "Verify Code"}
                      {!otpLoading && <ChevronRight className="w-5 h-5" />}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setOtpSent(false);
                        setOtp("");
                      }}
                      className="w-full text-amber-400 hover:text-amber-300 font-medium py-2 transition-colors text-sm"
                    >
                      Use different email
                    </button>
                  </>
                )}
              </form>
            ) : (
              <div className="space-y-6">
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-400 flex-shrink-0" />
                  <div>
                    <p className="text-green-400 font-medium text-sm">
                      Email verified successfully
                    </p>
                    <p className="text-green-400/70 text-xs">
                      Your email {email} has been confirmed
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setStep(2)}
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  Continue to Company Information
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Step 2: Company Information & Trade License */}
        {step === 2 && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-10 backdrop-blur-xl shadow-lg">
            <div className="flex items-start gap-4 mb-8">
              <div className="w-12 h-12 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center flex-shrink-0">
                <Building2 className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">
                  Company Information
                </h2>
                <p className="text-zinc-400">
                  Provide your company details and required documents
                </p>
              </div>
            </div>

            <form onSubmit={handleStep2Continue} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white font-medium mb-3 text-sm">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    placeholder="Enter your company name"
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/20 transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-3 text-sm">
                    Registration Number *
                  </label>
                  <input
                    type="text"
                    name="registrationNumber"
                    value={formData.registrationNumber}
                    onChange={handleInputChange}
                    placeholder="e.g., BRN-123456789"
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/20 transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-white font-medium mb-3 text-sm">
                  Official Email *
                </label>
                <input
                  type="email"
                  name="officialEmail"
                  value={formData.officialEmail}
                  onChange={handleInputChange}
                  placeholder="contact@company.com"
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/20 transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-3 text-sm">
                  Company Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Tell us about your company..."
                  rows={4}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/20 transition-all resize-none"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-3 text-sm">
                  Trade License *
                </label>
                <div className="border-2 border-dashed border-zinc-700 rounded-xl p-8 text-center hover:border-amber-500/50 hover:bg-amber-500/5 transition-all cursor-pointer group">
                  <input
                    type="file"
                    onChange={(e) => handleFileChange(e, "tradeLicense")}
                    accept=".pdf,.doc,.docx,.jpg,.png"
                    className="hidden"
                    id="trade-license-upload"
                    required
                  />
                  <label
                    htmlFor="trade-license-upload"
                    className="cursor-pointer block"
                  >
                    <Upload className="w-10 h-10 text-zinc-600 group-hover:text-amber-400 mx-auto mb-3 transition-colors" />
                    <p className="text-white font-medium mb-1 text-sm">
                      {formData.tradeLicense
                        ? formData.tradeLicense.name
                        : "Click to upload or drag and drop"}
                    </p>
                    <p className="text-zinc-400 text-xs">
                      PDF, DOC, DOCX, JPG, or PNG (Max 10MB)
                    </p>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-white font-medium mb-3 text-sm">
                  Additional Documents (Optional)
                </label>
                <div className="border-2 border-dashed border-zinc-700 rounded-xl p-8 text-center hover:border-amber-500/50 hover:bg-amber-500/5 transition-all cursor-pointer group">
                  <input
                    type="file"
                    onChange={(e) => handleFileChange(e, "additionalDoc")}
                    accept=".pdf,.doc,.docx,.jpg,.png"
                    className="hidden"
                    id="additional-doc-upload"
                  />
                  <label
                    htmlFor="additional-doc-upload"
                    className="cursor-pointer block"
                  >
                    <Upload className="w-10 h-10 text-zinc-600 group-hover:text-amber-400 mx-auto mb-3 transition-colors" />
                    <p className="text-white font-medium mb-1 text-sm">
                      {formData.additionalDoc
                        ? formData.additionalDoc.name
                        : "Click to upload or drag and drop"}
                    </p>
                    <p className="text-zinc-400 text-xs">
                      Tax ID, Articles of incorporation, or official letterhead
                    </p>
                  </label>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 border border-zinc-700"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  Continue to Confirmation
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Step 3: Terms & Conditions */}
        {step === 3 && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-10 backdrop-blur-xl shadow-lg">
            <div className="flex items-start gap-4 mb-8">
              <div className="w-12 h-12 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center flex-shrink-0">
                <FileText className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">
                  Review & Confirm
                </h2>
                <p className="text-zinc-400">
                  Please review and accept our terms before completing
                  verification
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmitVerification} className="space-y-6">
              <div className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-6 max-h-80 overflow-y-auto space-y-5">
                <div>
                  <h3 className="text-white font-semibold mb-2 text-sm">
                    Platform Policies
                  </h3>
                  <p className="text-zinc-300 text-sm leading-relaxed">
                    By verifying your company, you agree to comply with all
                    platform policies and guidelines. You commit to maintaining
                    accurate company information and following all applicable
                    laws and regulations.
                  </p>
                </div>

                <div className="border-t border-zinc-700 pt-5">
                  <h3 className="text-white font-semibold mb-2 text-sm">
                    Terms of Service
                  </h3>
                  <p className="text-zinc-300 text-sm leading-relaxed">
                    You agree to use our platform solely for legitimate business
                    purposes. You will not engage in any fraudulent, deceptive,
                    or illegal activities. All information provided must be
                    accurate and truthful.
                  </p>
                </div>

                <div className="border-t border-zinc-700 pt-5">
                  <h3 className="text-white font-semibold mb-2 text-sm">
                    Data Privacy
                  </h3>
                  <p className="text-zinc-300 text-sm leading-relaxed">
                    We collect and process your company information in
                    accordance with applicable data protection laws. Your data
                    will be used solely for verification and platform
                    operations.
                  </p>
                </div>

                <div className="border-t border-zinc-700 pt-5">
                  <h3 className="text-white font-semibold mb-2 text-sm">
                    Verification Process
                  </h3>
                  <p className="text-zinc-300 text-sm leading-relaxed">
                    Our team reserves the right to reject any verification
                    application that does not meet our standards. We may request
                    additional information or documentation at any time.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-zinc-800/50 border border-zinc-700 rounded-lg hover:border-amber-500/30 transition-colors">
                <input
                  type="checkbox"
                  id="terms-checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="w-5 h-5 mt-0.5 rounded border-zinc-600 bg-zinc-700 text-amber-500 focus:ring-amber-500 cursor-pointer flex-shrink-0"
                />
                <label
                  htmlFor="terms-checkbox"
                  className="text-zinc-300 cursor-pointer flex-1 text-sm"
                >
                  I have read and agree to the{" "}
                  <span className="text-white font-medium">
                    Platform Policies
                  </span>
                  ,{" "}
                  <span className="text-white font-medium">
                    Terms of Service
                  </span>
                  , and{" "}
                  <span className="text-white font-medium">Data Privacy</span>{" "}
                  terms
                </label>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 border border-zinc-700"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !termsAccepted}
                  className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 disabled:opacity-50 text-white font-semibold py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  {isSubmitting ? "Submitting..." : "Complete Verification"}
                  {!isSubmitting && <ChevronRight className="w-5 h-5" />}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Step 4: Verification Complete */}
        {step === 4 && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-12 backdrop-blur-xl shadow-lg text-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 flex items-center justify-center mx-auto mb-8 animate-pulse">
              <CheckCircle2 className="w-12 h-12 text-green-400" />
            </div>
            <h2 className="text-4xl font-bold text-white mb-3">
              Verification Submitted
            </h2>
            <p className="text-zinc-400 mb-10 text-lg max-w-2xl mx-auto">
              Thank you for completing the verification process. Our team will
              review your application within 24-48 hours. You'll receive an
              email confirmation once your company is verified.
            </p>

            <div className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-6 mb-8 text-left max-w-2xl mx-auto">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <Mail className="w-5 h-5 text-amber-400" />
                What happens next?
              </h3>
              <ul className="space-y-3 text-zinc-300">
                <li className="flex gap-3">
                  <span className="text-amber-400 font-bold flex-shrink-0">
                    1.
                  </span>
                  <span className="text-sm">
                    Our verification team reviews your documents and information
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-amber-400 font-bold flex-shrink-0">
                    2.
                  </span>
                  <span className="text-sm">
                    You'll receive an email with the verification status
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-amber-400 font-bold flex-shrink-0">
                    3.
                  </span>
                  <span className="text-sm">
                    Once verified, your profile will be marked as verified with
                    a badge
                  </span>
                </li>
              </ul>
            </div>

            <button
              //   onClick={() => router.push("/")}
              className="w-full max-w-2xl mx-auto bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              Return to Profile
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
