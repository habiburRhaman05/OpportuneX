import { createContext, useContext, type ReactNode } from "react";
import { useApiQuery } from "@/hooks/useApi";
import { candidatesRoutes } from "@/api/endpoints/routes";
import { AuthContextType } from "@/types/user.type";

// ------------------ Context ------------------
export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // Fetch current user profile
  const {
    data: user, // ✅ response data, renamed to `user`
    isLoading, // ✅ true while fetching
    error, // ✅ any error (if API fails)
  } = useApiQuery<{
    data: any;
    message: string;
  }>({
    url: candidatesRoutes.profile, // API endpoint
    queryKey: ["fetch-candidate-profile"], // unique cache key
    enabled: true, // auto run on mount
  });

  // login Mutations

  return (
    <AuthContext.Provider
      value={{
        user: user || null,
        isLoading,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useUser = () => {
  return useContext(AuthContext);
};
