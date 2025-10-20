import React, { useEffect } from "react";

import { Loader2, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";
import { useApiMutation } from "@/hooks/useApi";
import { Navigate, useNavigate } from "react-router-dom";

const LogoutButton = ({ className }) => {
  const navigate = useNavigate();
  const logoutMutation = useApiMutation({
    url: "/candidate/auth/logout",
    method: "post",
  });

  useEffect(() => {
    if (logoutMutation.isSuccess) {
      window.location.reload();
    }
  }, [logoutMutation.isSuccess]);

  return (
    <Button
      onClick={() => {
        logoutMutation.mutateAsync({});
      }}
      variant="destructive"
      className={`cursor-pointer active:scale-90 outline-none focus-visible:ring-0 ${className}`}
    >
      {logoutMutation.isPending ? (
        <Loader2 className="animate-spin" />
      ) : (
        <LogOut />
      )}{" "}
      Logout Account
    </Button>
  );
};

export default LogoutButton;
