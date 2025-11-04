import { Building2, ShieldCheck, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

/**
 * ✅ Company Verification Success UI
 * -------------------------------------
 * English: Shows a beautiful success message after a company profile is verified.
 * বাংলা: কোম্পানির ভেরিফিকেশন সফল হলে একটি সুন্দর সফলতার মেসেজ দেখায়।
 */

export function CompanyVerificationSuccess() {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-br from-zinc-900 to-green-900/20 border border-green-800/30 rounded-2xl p-12 backdrop-blur-xl shadow-lg text-center">
      {/* ✅ Success Icon */}
      <div className="w-24 h-24 rounded-full bg-gradient-to-r from-emerald-500/20 to-green-500/20 border border-green-500/30 flex items-center justify-center mx-auto mb-8 animate-pulse">
        <ShieldCheck className="w-12 h-12 text-emerald-400" />
      </div>

      {/* ✅ Headline */}
      <h2 className="text-4xl font-bold text-white mb-3">
        Company Verified Successfully
      </h2>

      {/* ✅ Description */}
      <p className="text-zinc-400 mb-10 text-lg max-w-2xl mx-auto">
        Congratulations! Your company profile has been successfully verified.{" "}
        <br />
        You can now post jobs, manage applicants, and enjoy full access to
        OpportuneX employer tools.
      </p>

      {/* ✅ Next Steps */}
      <div className="bg-emerald-500/5 border border-emerald-700/30 rounded-lg p-6 mb-8 text-left max-w-2xl mx-auto">
        <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
          <Building2 className="w-5 h-5 text-emerald-400" />
          What’s Next?
        </h3>

        <ul className="space-y-3 text-zinc-300">
          <li className="flex gap-3">
            <span className="text-emerald-400 font-bold flex-shrink-0">1.</span>
            <span className="text-sm">
              Start posting jobs to attract top talents.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-emerald-400 font-bold flex-shrink-0">2.</span>
            <span className="text-sm">
              Manage your applicants and shortlist the best candidates.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-emerald-400 font-bold flex-shrink-0">3.</span>
            <span className="text-sm">
              Build trust — your verified badge is now visible to all users.
            </span>
          </li>
        </ul>
      </div>

      {/* ✅ Button */}
      <button
        onClick={() => navigate("/recruiter/dashboard/company-profile")}
        className="w-full max-w-2xl mx-auto bg-gradient-to-r from-emerald-600 to-green-500 hover:from-emerald-700 hover:to-green-600 text-white font-semibold py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
      >
        Go to Company Dashboard
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}
