import { createContext, useContext, type ReactNode } from "react";
import { toast } from "@/hooks/use-toast";
import { Navigate, redirect, useNavigate } from "react-router-dom";
import { useApiMutation, useApiQuery } from "@/hooks/useApi";

import { queryClientIns } from "@/components/QueryClientWrapper";
import { recruiterRoutes } from "@/api/endpoints/route";

const useAuth = () => {
  const registerMutation = useApiMutation({
    url: recruiterRoutes.register,
    method: "post",
  });
  const loginMutation = useApiMutation({
    url: recruiterRoutes.login,
    method: "post",
  });
  const logoutMutation = useApiMutation({
    url: recruiterRoutes.logout,
    method: "post",
  });
  const resendOtp = useApiMutation({
    url: "/recruiter/auth/resend-otp",
    method: "get",
  });
  const handleEmailVerifyMutation = useApiMutation({
    url: "/recruiter/auth/verify-otp",
    method: "post",
  });
  const createCompanyMutation = useApiMutation({
    url: "/company/create",
    method: "post",
  });
  // revalidate data
  const reValidateData = (keys: string[], type: string) => {
    if (type === "reValidate") {
      queryClientIns.invalidateQueries({
        queryKey: keys,
      });
    } else if (type === "removeQuery") {
      queryClientIns.removeQueries({
        queryKey: keys,
      });
    } else if (type === "reFetch") {
      queryClientIns.refetchQueries({
        queryKey: keys,
      });
    }
    return;
  };

  return {
    registerMutation,
    loginMutation,
    logoutMutation,
    resendOtp,
    handleEmailVerifyMutation,
    createCompanyMutation,
    reValidateData,
  };
};

export default useAuth;
