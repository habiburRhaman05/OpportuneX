"use client";

import { CheckCircle2, Mail, ChevronRight } from "lucide-react";

export function VerificationComplete() {
  // const router = useRouter()

  return (
    <div className="bg-gradient-to-br from-zinc-900 to-blue-900/20 border border-blue-900/30 rounded-2xl p-12 backdrop-blur-xl shadow-lg text-center">
      <div className="w-24 h-24 rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 flex items-center justify-center mx-auto mb-8 animate-pulse">
        <CheckCircle2 className="w-12 h-12 text-green-400" />
      </div>
      <h2 className="text-4xl font-bold text-white mb-3">
        Verification Submitted
      </h2>
      <p className="text-zinc-400 mb-10 text-lg max-w-2xl mx-auto">
        Thank you for completing the verification process. Our team will review
        your application within 24-48 hours. You'll receive an email
        confirmation once your company is verified.
      </p>

      <div className="bg-blue-500/5 border border-blue-700/30 rounded-lg p-6 mb-8 text-left max-w-2xl mx-auto">
        <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
          <Mail className="w-5 h-5 text-blue-400" />
          What happens next?
        </h3>
        <ul className="space-y-3 text-zinc-300">
          <li className="flex gap-3">
            <span className="text-blue-400 font-bold flex-shrink-0">1.</span>
            <span className="text-sm">
              Our verification team reviews your documents and information
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-blue-400 font-bold flex-shrink-0">2.</span>
            <span className="text-sm">
              You'll receive an email with the verification status
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-blue-400 font-bold flex-shrink-0">3.</span>
            <span className="text-sm">
              Once verified, your profile will be marked as verified with a
              badge
            </span>
          </li>
        </ul>
      </div>

      <button
        // onClick={() => router.push("/")}
        className="w-full max-w-2xl mx-auto bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-semibold py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
      >
        Return to Profile
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}
