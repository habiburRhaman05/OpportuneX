import { toast } from "@/hooks/use-toast";
import { useApiMutation } from "@/hooks/useApi";
import { useFileUpload } from "@/hooks/useFileUplaod";
import React, { useState } from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Camera, Loader, Loader2, Upload } from "lucide-react";
import useAuth from "@/hooks/useAuth";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useUser } from "@/context/AuthContext";
import { queryClientIns } from "../shared/QueryClientWrapper";

const ProfilePhoto = () => {
  const { uploadFile, loading: isUploading } = useFileUpload();
  const { user } = useUser();
  const { profilePhoto } = user?.data;
  const [previewUrl, setPreviewurl] = useState("");
  const [openMenu, setOpenMenu] = useState(false);

  const SubmitMutation = useApiMutation({
    url: "/candidate/auth/profile/update",
    method: "put",
    onSuccess: (data) => {
      queryClientIns.invalidateQueries({
        queryKey: ["fetch-profile-data"],
      });
      setPreviewurl("");
      toast({
        title: "Profile updated",
        description: "Your company profile has been updated successfully.",
      });
    },
    onError: (err) => {
      toast({
        title: "failed to Profile updated",
        variant: "destructive",
      });
    },
  });
  const deletePhotoMutation = useApiMutation({
    url: "/recruiter/auth/profile/update",
    method: "put",
    onSuccess: (data) => {
      queryClientIns.invalidateQueries({
        queryKey: ["fetch-profile-data"],
      });
      setPreviewurl("");
      toast({
        title: "Profile updated",
        description: "Your company profile has been updated successfully.",
      });
    },
    onError: (err) => {
      toast({
        title: "failed to Profile updated",
        variant: "destructive",
      });
    },
  });
  const onSubmit = async (data) => {
    await SubmitMutation.mutateAsync(data);
    queryClientIns.invalidateQueries({
      queryKey: ["fetch-profile-data"],
    });
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (e.target.files && e.target.files[0]) {
        const resumtUrl = await uploadFile(e.target.files[0], "/upload-file");

        setPreviewurl(resumtUrl);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePhotoSubmit = async () => {
    await SubmitMutation.mutateAsync({ profilePhoto: previewUrl });
  };

  const handleDeletePhoto = () => {
    toast({
      title: "Photo Remove Successfully",
      description: "Your company profile has been updated successfully.",
    });
    setOpenMenu(false);
    setPreviewurl("");
  };

  return (
    <div>
      {previewUrl && (
        <Dialog
          open={previewUrl ? true : false}
          onOpenChange={() => {
            setPreviewurl("");
          }}
        >
          <DialogContent>
            <div className="relative w-full flex items-center justify-center flex-col gap-y-4">
              {previewUrl}
              <Avatar className="h-32 w-32 border-2 border-zinc-600">
                <AvatarImage src={previewUrl} />
              </Avatar>

              <Button
                type="button"
                onClick={handlePhotoSubmit}
                size="sm"
                variant="default"
                className="border-blue-600 text-blue-300 hover:bg-blue-900 hover:text-white bg-blue-700 transition-colors cursor-pointer"
                asChild
                disabled={SubmitMutation.isPending}
              >
                {SubmitMutation.isPending ? (
                  <span>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Saving
                  </span>
                ) : (
                  <span>
                    <Upload className="h-4 w-4 mr-2" />
                    Update Profile
                  </span>
                )}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      <div className="relative">
        <Avatar className="h-32 w-32 border-2 border-zinc-600">
          {isUploading ? (
            <div className="w-full h-full flex items-center justify-center">
              <Loader className="text-white animate-spin" />
            </div>
          ) : (
            <AvatarImage
              src={
                (profilePhoto as string) ||
                "/placeholder.svg?height=80&width=80"
              }
            />
          )}
          <AvatarFallback className="bg-zinc-700 text-white text-lg">
            {"U"}
          </AvatarFallback>
        </Avatar>
        {!isUploading && (
          <div className="absolute bottom-2 flex items-center justify-center right-[-5px]  bg-zinc-400 w-8 h-8 rounded-full text-black cursor-pointer ">
            <Popover
              open={openMenu}
              onOpenChange={(value) => {
                setOpenMenu(value);
              }}
            >
              <PopoverTrigger>
                <Camera />
              </PopoverTrigger>
              <PopoverContent className="flex flex-col items-start gap-y-3 ">
                <label
                  htmlFor="photo-upload"
                  className="  bg-zinc-800 hover:bg-zinc-900 w-full p-2 rounded-md cursor-pointer"
                >
                  Change Photo
                </label>

                <Button variant="destructive" onClick={handleDeletePhoto}>
                  Remove Photo{" "}
                  {deletePhotoMutation.isPending && (
                    <Loader className="text-white animate-spin" />
                  )}
                </Button>
              </PopoverContent>
            </Popover>
          </div>
        )}
        <input
          type="file"
          id="photo-upload"
          accept="image/*"
          onChange={handlePhotoUpload}
          className="hidden"
        />
        {profilePhoto === "" && (
          <label htmlFor="photo-upload">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="border-zinc-600 mt-6 text-zinc-300 hover:bg-zinc-700 hover:text-white bg-zinc-800 transition-colors cursor-pointer"
              asChild
              disabled={isUploading}
            >
              {isUploading ? (
                <span>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Uploading
                </span>
              ) : (
                <span>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Photo
                </span>
              )}
            </Button>
          </label>
        )}
      </div>
    </div>
  );
};

export default ProfilePhoto;
