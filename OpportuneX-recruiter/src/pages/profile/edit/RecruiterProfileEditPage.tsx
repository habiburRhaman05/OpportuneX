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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { queryClientIns } from "@/components/QueryClientWrapper";
import { useUser } from "@/context/AuthContext";
import { routes } from "@/lib/clientRoutes";
import { Link } from "react-router-dom";

// ✅ Define Zod validation schema
const recruiterEditFormSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters long")
    .max(50, "Full name cannot exceed 50 characters"),
  position: z
    .string()
    .min(2, "Position title must be at least 2 characters long")
    .max(50, "Position title cannot exceed 50 characters"),
  location: z
    .string()
    .min(2, "Location must be at least 2 characters long")
    .max(100, "Location cannot exceed 100 characters"),
  bio: z
    .string()
    .min(10, "Bio must be at least 10 characters long")
    .max(500, "Bio cannot exceed 500 characters"),
});

type RecruiterEditFormType = z.infer<typeof recruiterEditFormSchema>;

const RecruiterProfileEditPage = () => {
  const { recruiter } = useUser();

  const SubmitMutation = useApiMutation({
    url: "/recruiter/auth/profile/update",
    method: "put",
    onSuccess: (data) => {
      queryClientIns.invalidateQueries({
        queryKey: ["fetch-profile-data"],
      });
      toast({
        title: "✅ Profile updated",
        description: "Your company profile has been updated successfully.",
      });
    },
    onError: (err) => {
      toast({
        title: "❌ Failed to update profile",
        description: "Something went wrong while updating your profile.",
        variant: "destructive",
      });
    },
  });

  // ✅ Initialize form with Zod resolver
  const form = useForm<RecruiterEditFormType>({
    resolver: zodResolver(recruiterEditFormSchema),
    defaultValues: {
      fullName: recruiter?.fullName || "",
      position: recruiter?.position || "",
      location: recruiter?.location || "",
      bio: recruiter?.bio || "",
    },
  });

  const onSubmit = async (data: RecruiterEditFormType) => {
    await SubmitMutation.mutateAsync(data);
    queryClientIns.invalidateQueries({
      queryKey: ["fetch-profile-data"],
    });
  };

  return (
    <>
      <div className="space-y-6">
        <div className="mb-8 animate-fade-in-up">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold mb-2">
              Edit your Recruiter profile
            </h1>
            <Link to={routes.profile_page} className="text-blue-600 underline">
              View Profile
            </Link>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* ✅ Full Name */}
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* ✅ Position */}
                <FormField
                  control={form.control}
                  name="position"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Position</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your current position (e.g. HR Manager)"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* ✅ Location */}
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your company location"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* ✅ Bio */}
                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>About Yourself</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe yourself or your company"
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

              <div className="flex justify-end gap-4 m-4">
                <Button
                  disabled={!form.formState.isDirty || SubmitMutation.isPending}
                  type="submit"
                >
                  {SubmitMutation.isPending ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </Card>
          </form>
        </Form>
      </div>
    </>
  );
};

export default RecruiterProfileEditPage;
