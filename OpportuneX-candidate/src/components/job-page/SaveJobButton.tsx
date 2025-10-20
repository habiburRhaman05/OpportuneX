import React from "react";
import { Button } from "../ui/button";
import { BookmarkPlus, Loader2 } from "lucide-react";
import useAuth from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";
import { useApiMutation } from "@/hooks/useApi";
import { useUser } from "@/context/AuthContext";

const SaveJobButton = ({ jobId }) => {
  const { user } = useUser();

  const checkIsAlreadyAppllied = () => {
    // logic
  };

  const handleSaveJobMutation = useApiMutation({
    url: `/job/:${jobId}/save`,
    method: "post",
    onSuccess: (data) => {
      toast({
        title: data.message,
        description: "your job successfully save . you can access leter",
        className: "bg-green-600",
      });
    },
    onError: (err) => {
      toast({
        title: err.message,
      });
    },
  });

  const handleSave = async () => {
    if (!user) {
      toast({
        title: "Please First Login",
        variant: "destructive",
        description:
          "if you want to save this job then first you need to Login with account info",
      });
      return;
    }

    await handleSaveJobMutation.mutateAsync({
      jobId,
      userId: user?.data?._id,
    });
  };
  return (
    <Button
      onClick={handleSave}
      variant="outline"
      className="w-auto p-4"
      size="icon"
      disabled={handleSaveJobMutation.isPending}
    >
      SaveJob
      {handleSaveJobMutation.isPending ? (
        <Loader2 className="animate-spin" />
      ) : (
        <BookmarkPlus className="h-4 w-4" />
      )}
    </Button>
  );
};

export default SaveJobButton;
