import { AuthContext } from "@/context/AuthContext";
import { UseMutationResult } from "@tanstack/react-query";
import { useContext } from "react";
import { useApiMutation } from "./useApi";
import { candidatesRoutes } from "@/api/endpoints/routes";
import { queryClientIns } from "@/components/shared/QueryClientWrapper";

const useAuth = () => {
  // login mutation
  const loginMutation: UseMutationResult = useApiMutation({
    url: candidatesRoutes.login,
    method: "post",
  });
  // register Mutation
  const registerMutation: UseMutationResult = useApiMutation({
    url: candidatesRoutes.register,
    method: "post",
  });
  // logout Mutation
  const logoutMutation: UseMutationResult = useApiMutation({
    url: candidatesRoutes.logout,
    method: "post",
  });
  // deleteAccount Mutation
  const deleteAccountMutation: UseMutationResult = useApiMutation({
    url: candidatesRoutes.deleteAccount,
    method: "post",
  });
  // resendOtp Mutation
  const resendOtpMutation: UseMutationResult = useApiMutation({
    url: candidatesRoutes.resendOtp,
    method: "post",
    invalidateQueryKey: ["fetch-candidate-profile"],
  });

  // profileUpdate Mutation
  const profileUpdateMutation: UseMutationResult = useApiMutation({
    url: candidatesRoutes.profileUpdate,
    method: "put",
  });
  // changePassword Mutation
  const changePasswordMutation: UseMutationResult = useApiMutation({
    url: candidatesRoutes.changePassword,
    method: "put",
  });
  // onboardingProfileInfo Mutation
  const onboardingProfileInfoMutation: UseMutationResult = useApiMutation({
    url: candidatesRoutes.onboardingProfileInfo,
    method: "put",
  });
  // onboardingVerifyOtp Mutation
  const onboardingVerifyOtpMutation: UseMutationResult = useApiMutation({
    url: candidatesRoutes.onboardingVerifyOtp,
    method: "put",
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
    loginMutation,
    reValidateData,
    registerMutation,
    logoutMutation,
    deleteAccountMutation,
    resendOtpMutation,
    profileUpdateMutation,
    changePasswordMutation,
    onboardingProfileInfoMutation,
    onboardingVerifyOtpMutation,
  };
};

export default useAuth;
