import { useApiMutation } from "@/hooks/useApi";
import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate, useParams } from "react-router-dom";

const CheckToken = () => {
  const [message, setMessage] = useState("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = useParams().token;

  const verifyMutation = useApiMutation({
    url: `/candidate/auth/verify-forgot-password-token/${token}`,
    method: "post",
  });

  useEffect(() => {
    if (!token) {
      alert("no token found");

      setMessage("Invalid or missing token.");
      return;
    }

    // Simulate async backend call with dummy delay
    const verifyToken = async () => {
      await verifyMutation.mutateAsync({});
    };

    verifyToken();
  }, [token, navigate]);

  // ✅ Success UI
  if (verifyMutation.isSuccess) {
    // Redirect to reset password page with token
    navigate(`/reset-password/${token}`, { replace: true });
    return null; // We don't render anything as we are redirecting
  }

  // 🌀 Loading UI
  if (verifyMutation.isPending) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-lg">Verifying your token...</p>
      </div>
    );
  }

  // ❌ Fail UI
  if (verifyMutation.isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md text-center">
          <svg
            className="w-16 h-16 text-red-500 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          <h2 className="text-2xl font-bold text-red-500 mb-2">
            Invalid or Expired Token
          </h2>
          <p className="text-gray-300 mb-6">{message}</p>
          <a
            href="/forgot-password"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md transition-colors"
          >
            Request New Link
          </a>
        </div>
      </div>
    );
  }

  return null; // We never render success because we redirect
};

export default CheckToken;
