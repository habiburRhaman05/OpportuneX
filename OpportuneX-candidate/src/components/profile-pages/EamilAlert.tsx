import { AlertCircle } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const EmailAlert = () => {
  return (
    <div className="bg-red-50 container mx-auto  mt-2 border dark:bg-zinc-900 dark:border-zinc-800 rounded-md mb-2 border-red-200 text-red-700 p-4 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <AlertCircle className="h-5 w-5" />
        <span>Your email is not verified.</span>
      </div>
      <Link
        to={"/candidate/verify-email"}
        className="text-blue-800 mt-2 underline"
      >
        Verify Now
      </Link>
    </div>
  );
};

export default EmailAlert;
