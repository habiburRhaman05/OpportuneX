import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate, useParams } from "react-router-dom";

const CheckToken = () => {
  const [status, setStatus] = useState("loading"); // loading | success | fail
  const [message, setMessage] = useState("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = useParams().token;
  useEffect(() => {
    if (!token) {
      alert("no token found");
      setStatus("fail");
      setMessage("Invalid or missing token.");
      return;
    }

    // Simulate async backend call with dummy delay
    const verifyToken = async () => {
      setStatus("loading");
      setMessage("");
      try {
        // ⏳ Simulate server verification delay
        await new Promise((resolve) => setTimeout(resolve, 5000));
        navigate(`/reset-password/${token}`, {
          replace: true, // prevents back navigation confusion
        });
        // Mock token check logic (replace with real API call)
        const isValid = token.startsWith("TOKEN"); // fake check for demo

        // if (true) {

        //   // ✅ Token valid → redirect to reset-password
        //   navigate(`/reset-password?code=${encodeURIComponent(token)}`, {
        //     replace: true, // prevents back navigation confusion
        //   });
        // } else {
        //   // ❌ Token invalid or expired
        //   setStatus("fail");
        //   setMessage(
        //     "Token expired or invalid. Please request a new reset link."
        //   );
        // }
      } catch (err) {
        setStatus("fail");
        setMessage("Failed to verify token. Please try again.");
      }
    };

    verifyToken();
  }, [token, navigate]);

  // 🌀 Loading UI
  if (status === "loading") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-lg">Verifying your token...</p>
      </div>
    );
  }

  // ❌ Fail UI
  if (status === "fail") {
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
