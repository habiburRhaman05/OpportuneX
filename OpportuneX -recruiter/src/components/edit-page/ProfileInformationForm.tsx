import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { useApiMutation } from "@/hooks/useApi";
import useAuth from "@/hooks/useAuth";
import { useFileUpload } from "@/hooks/useFileUplaod";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader, Loader2, Upload } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Dialog, DialogContent } from "../ui/dialog";
import { useUser } from "@/context/AuthContext";
import { queryClientIns } from "../QueryClientWrapper";

const ProfileInformationForm = () => {
  const { recruiter, isLoading } = useUser();
  const { uploadFile, loading: isUploading } = useFileUpload();
  const [previewUrl, setPreviewurl] = useState("");

  const SubmitMutation = useApiMutation({
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

  const form = useForm({
    // resolver: zodResolver(recruiterEditFormSchema),
    defaultValues: {
      fullName: "",
      position: "",
      location: "",
      bio: "",
      socialLinks: {
        facebook: "",
        linkedin: "",
        github: "",
      },
    },
  });

  const onSubmit = async (data) => {
    // const {profilePhoto,...payload} = data

    await SubmitMutation.mutateAsync(data);
    queryClientIns.invalidateQueries({
      queryKey: ["fetch-profile-data"],
    });
  };

  if (isLoading) {
    return <h1>LoaDING....</h1>;
  }

  // useEffect(() => {
  //   form.reset(recruiter);
  // }, [recruiter]);

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (e.target.files && e.target.files[0]) {
        const resumtUrl = await uploadFile(e.target.files[0], "/upload-file");

        setPreviewurl(resumtUrl);
      }
    } catch (error) {}
  };

  const handlePhotoSubmit = async () => {
    await SubmitMutation.mutateAsync({ profilePhoto: previewUrl });
  };

  return (
    <>
      <div className="space-y-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Photo</CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                <CardContent className="space-y-4">
                  {previewUrl && (
                    <Dialog
                      open={previewUrl ? true : false}
                      onOpenChange={() => {
                        setPreviewurl("");
                      }}
                    >
                      <DialogContent>
                        <div className="relative w-full flex items-center justify-center flex-col gap-y-4">
                          <Avatar className="h-20 w-20 border-2 border-zinc-600">
                            <AvatarImage src={previewUrl} />
                          </Avatar>

                          <Button
                            type="button"
                            onClick={handlePhotoSubmit}
                            size="sm"
                            variant="default"
                            className="border-blue-600 text-blue-300 hover:bg-blue-900 hover:text-white bg-blue-800 transition-colors cursor-pointer"
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
                    <Avatar className="h-28 w-28 border-2 border-zinc-600">
                      {isUploading ? (
                        <div className="w-full h-full flex items-center justify-center">
                          <Loader className="text-white animate-spin" />
                        </div>
                      ) : (
                        <AvatarImage
                          src={
                            (recruiter.profilePhoto as string) ||
                            "/placeholder.svg?height=80&width=80"
                          }
                        />
                      )}
                      <AvatarFallback className="bg-zinc-700 text-white text-lg">
                        {"U"}
                      </AvatarFallback>
                    </Avatar>
                    <input
                      type="file"
                      id="photo-upload"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                    {recruiter.profilePhoto === "" && (
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
                </CardContent>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>FullName</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your fullName" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>About Your Self</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe your self"
                          className="resize-none"
                          rows={4}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="socialLinks.facebook"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Facebook</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://facebook.com/demo"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="socialLinks.github"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Github</FormLabel>
                      <FormControl>
                        <Input placeholder="www.github.com/user" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Loaction</FormLabel>
                      <FormControl>
                        <Input placeholder="location" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <div className="flex justify-end gap-4">
              <Button disabled={!form.formState.isDirty} type="submit">
                Save Changes
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};

export default ProfileInformationForm;
