import { recruiterRoutes } from "@/api/endpoints/route";
import { useApiQuery } from "@/hooks/useApi";
import { createContext, useContext, type ReactNode } from "react";
import { RecruiterType } from "./types";
// ------------------ Types ------------------

type AuthContextType = {
  recruiter: RecruiterType;
  isLoading: boolean;
  error: { name: string; message: string };
  isError: boolean;
  refetch: () => void;
};

// ------------------ Context ------------------
export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { data, isLoading, error, refetch, isError } = useApiQuery<{
    data: RecruiterType;
  }>({
    url: recruiterRoutes.profile,
    enabled: true,
    queryKey: ["fetch-profile-data"],
    cacheTime: 0,
  });

  return (
    <AuthContext.Provider
      value={{
        recruiter: data?.data || null,
        isLoading,
        error,
        isError,
        refetch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useUser = () => {
  return useContext(AuthContext);
};
