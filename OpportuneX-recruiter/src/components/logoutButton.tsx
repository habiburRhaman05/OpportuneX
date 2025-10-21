import React, { useEffect } from "react";

import { Loader2, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { recruiterRoutes } from "../api/endpoints/route";

const LogoutButton = ({ className }) => {
  const { logoutMutation } = useAuth();
  const handleLogout = async () => {
    await logoutMutation.mutateAsync({});
  };
  const navigate = useNavigate();

  useEffect(() => {
    if (logoutMutation.isSuccess) {
      window.location.reload();
    }
  }, [logoutMutation.isSuccess]);
  return (
    <Button
      onClick={handleLogout}
      variant="destructive"
      className={`cursor-pointer active:scale-90 ${className}`}
    >
      {logoutMutation.isPending ? (
        <Loader2 className="animate-spin" />
      ) : (
        <LogOut />
      )}{" "}
      Logout
    </Button>
  );
};

export default LogoutButton;
