import { useUser } from "@/context/AuthContext";
import { routes } from "@/lib/clientRoutes";
import React from "react";
import { useNavigate } from "react-router-dom";
import AuthLoading from "./skelections/AuthLoader";

const AuthProtectedRoute = ({ children }) => {
  const { recruiter, isLoading } = useUser();
  const navigate = useNavigate();
  if (isLoading) {
    return <AuthLoading />;
  }

  if (recruiter) {
    navigate(routes.overview_page);
    return;
  }

  return <div>{children}</div>;
};

export default AuthProtectedRoute;
