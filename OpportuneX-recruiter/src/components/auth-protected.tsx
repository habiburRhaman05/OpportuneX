import { useUser } from "@/context/AuthContext";
import { routes } from "@/lib/clientRoutes";
import React from "react";
import { useNavigate } from "react-router-dom";

const AuthProtectedRoute = ({ children }) => {
  const { recruiter, isLoading } = useUser();
  const navigate = useNavigate();
  if (isLoading) {
    return <h1>auth loading</h1>;
  }

  if (recruiter) {
    navigate(routes.overview_page);
    return;
  }

  return <div>{children}</div>;
};

export default AuthProtectedRoute;
