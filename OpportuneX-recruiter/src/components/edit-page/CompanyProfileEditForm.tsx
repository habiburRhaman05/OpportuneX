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
import { useFileUpload } from "@/hooks/useFileUplaod";

import { useUser } from "@/context/AuthContext";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { Loader, Loader2, Upload } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { queryClientIns } from "../QueryClientWrapper";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Dialog, DialogContent } from "../ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const CompanyProfileEditForm = () => {
  const { recruiter } = useUser();
  const { uploadFile, loading: isUploading } = useFileUpload();
  const [previewUrl, setPreviewurl] = useState("");
  const form = useForm({
    // resolver: zodResolver(companyEditFormSchema),
    defaultValues: {
      name: "",
      officialEmail: "",
      location: "",
      size: "",
      industry: "",
      website: "",
      description: "",
    },
  });
  const photoSubmitMutation = useApiMutation({
    url: "/recruiter/auth/company/update",
    method: "put",
    onSuccess: (data) => {
      queryClientIns.invalidateQueries({
        queryKey: ["fetch-profile-data"],
      });
      setPreviewurl("");
      toast({
        title: "Company Profile updated",
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

  useEffect(() => {
    form.reset(recruiter?.company);
    console.log(form.getValues("size"));
  }, [recruiter]);

  const onSubmit = async (data) => {
    // console.log(data);

    await photoSubmitMutation.mutateAsync(data);
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (e.target.files && e.target.files[0]) {
        const resumtUrl = await uploadFile(e.target.files[0], "/upload-file");

        setPreviewurl(resumtUrl);
      }
    } catch (error) {}
  };

  const handlePhotoSubmit = async () => {
    await photoSubmitMutation.mutateAsync({ logo: previewUrl });
  };

  if (!recruiter.company) {
    return <div>company profile not created</div>;
  }

  return (
    <>
      <div className="space-y-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Company Logo</CardTitle>
              </CardHeader>
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
                          disabled={photoSubmitMutation.isPending}
                        >
                          {photoSubmitMutation.isPending ? (
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
                          (recruiter?.company.logo as string) ||
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
                  {recruiter?.company.logo === "" && (
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
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter company name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe your company"
                          className="resize-none text-left"
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
                  name="website"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Website</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://yourwebsite.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="officialEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Email</FormLabel>
                      <FormControl>
                        <Input placeholder="company@example.com" {...field} />
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

                <FormField
                  control={form.control}
                  name="size"
                  render={() => (
                    <>
                      <Select
                        value={form.getValues("size")}
                        onValueChange={(value) => form.setValue("size", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select company size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-10">1-10 employees</SelectItem>
                          <SelectItem value="11-50">11-50 employees</SelectItem>
                          <SelectItem value="51-200">
                            51-200 employees
                          </SelectItem>
                          <SelectItem value="200-500">
                            200-500 employees
                          </SelectItem>
                          <SelectItem value="501-1000">
                            501-1000 employees
                          </SelectItem>
                          <SelectItem value="1000+">1000+ employees</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </>
                  )}
                />

                <FormField
                  control={form.control}
                  name="industry"
                  render={() => (
                    <>
                      <Select
                        value={form.getValues("industry")}
                        onValueChange={(value) =>
                          form.setValue("industry", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select industry" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="technology">Technology</SelectItem>
                          <SelectItem value="finance">Finance</SelectItem>
                          <SelectItem value="healthcare">Healthcare</SelectItem>
                          <SelectItem value="education">Education</SelectItem>
                          <SelectItem value="retail">Retail</SelectItem>
                          <SelectItem value="manufacturing">
                            Manufacturing
                          </SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </>
                  )}
                ></FormField>
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

export default CompanyProfileEditForm;
