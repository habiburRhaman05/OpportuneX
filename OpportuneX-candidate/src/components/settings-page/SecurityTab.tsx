import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  LogOut,
  Smartphone,
  Monitor,
  Shield,
  Trash,
  Loader,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "../ui/input";
import { useState } from "react";
import { useApiMutation } from "@/hooks/useApi";
import useAuth from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/context/AuthContext";

export function SecuityTab() {
  const { toast } = useToast();
  const [password, setPassword] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const { user } = useUser();
  const navigate = useNavigate();
  const deleteAccountMutation = useApiMutation({
    url: "/candidate/auth/security/delete-account",
    method: "post",
    onSuccess: (data: { success: boolean; message: string }) => {
      toast({
        title: "Your account was deleted",
        description: "You have been delete your account successfully.",
      });
      setPassword("");
      navigate("/auth/register", {
        replace: true,
      });
    },
    onError: (err) => {
      toast({
        title: err.message,
        description: "we are failed to delete you account",
        variant: "destructive",
      });
    },
  });

  const handleDeleteAccount = async () => {
    await deleteAccountMutation.mutateAsync({ userId: user.data._id });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold"> Security & Logout </h3>
        <p className="text-sm text-muted-foreground">
          Manage your active sessions and logout options.
        </p>
      </div>

      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Active Sessions
          </CardTitle>
          <CardDescription>
            These are the devices currently signed into your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-3 border border-border/50 rounded-lg">
            <div className="flex items-center gap-3">
              <Monitor className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium text-sm">Current Device</p>
                <p className="text-xs text-muted-foreground">
                  Chrome on Windows • Last active: Now
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-green-600">
              <div className="h-2 w-2 bg-green-500 rounded-full" />
              Active
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        <Card className="border-border/50 border-zinc-600 bg-zinc-700/50">
          <CardHeader>
            <CardTitle className=" text-lg text-red-800">
              Delete Your Account
            </CardTitle>
            <CardDescription className="text-red-700">
              Your account is deleted parmenattly . after that you don't access
              this account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AlertDialog
              open={openAlert}
              onOpenChange={(value) => {
                setOpenAlert(value);
              }}
            >
              <AlertDialogTrigger asChild>
                <Button variant="destructive" className="w-full sm:w-auto">
                  <Trash className="h-4 w-4 mr-2" />
                  Delete Account
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className=" text-lg text-white">
                    Delete Your Account
                  </AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogDescription className="text-red-700">
                  Your account is deleted parmenattly . after that you don't
                  access this account
                </AlertDialogDescription>
                <div>
                  <span>Password</span>
                  <Input
                    className="mt-3"
                    type="text"
                    placeholder="Enter your password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    value={password}
                  />
                </div>
                <AlertDialogFooter>
                  <AlertDialogCancel
                    onClick={() => {
                      setPassword("");
                    }}
                  >
                    Cancel
                  </AlertDialogCancel>
                  <Button
                    onClick={handleDeleteAccount}
                    className="bg-red-600 hover:bg-red-700"
                    disabled={password.trim().length === 0}
                  >
                    Delete Your Account{" "}
                    {deleteAccountMutation.isPending && (
                      <Loader className="ml-3 animate-spin" />
                    )}
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
