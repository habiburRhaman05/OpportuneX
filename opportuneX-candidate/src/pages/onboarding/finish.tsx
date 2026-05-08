import Lottie from "lottie-react";
import successAnimation from "../../../public/Success.json"; // Lottie JSON file
import { Link, Navigate, useNavigate } from "react-router-dom";

import useAuth from "@/hooks/useAuth";

export default function OnboardingFinish() {
  const navigate = useNavigate();

  return (
    <div className=" flex flex-col items-center justify-center bg-zinc-950 p-6">
      <div className="bg-zinc-900 rounded-2xl shadow-lg p-8 w-full max-w-md flex flex-col items-center gap-6">
        {/* Success Animation */}
        <div className="w-48 h-48">
          <Lottie animationData={successAnimation} loop={false} />
        </div>

        <h1 className="text-3xl font-bold text-white text-center">
          🎉 Congratulations!
        </h1>
        <p className="text-zinc-400 text-center">
          You have successfully completed your profile and onboarding process.
        </p>

        <Link
          to={"/candidate/profile"}
          className="mt-4 w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition"
        >
          Go to Profile
        </Link>
      </div>
    </div>
  );
}
