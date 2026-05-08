import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, SendIcon } from "lucide-react";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFileUpload } from "@/hooks/useFileUplaod";
import { useApiMutation } from "@/hooks/useApi";
const applyJobSchema = z.object({
  fullName: z
    .string({ message: "Please enter you fullname" })
    .min(5, "Fullname min 5 char"),
  email: z
    .string({ message: "Please enter you Email" })
    .email("please enter a valid email address"),
  resumeUrl: z.string().min(1, "Please upload your resume"),
  coverLetter: z
    .string({ message: "Please write about your self" })
    .min(20, "  cover letter min 20 char"),
});

type ApplyJobForm = z.infer<typeof applyJobSchema>;
export function ApplyJobModal({ jobId }) {
  const {
    register,
    formState: { errors },
    setValue,
    reset,
    getValues,
    handleSubmit,
  } = useForm<ApplyJobForm>({
    resolver: zodResolver(applyJobSchema),
  });
  const { uploadFile, loading: isUploading } = useFileUpload();

  const handleResumeUpload = async (resumeFile) => {
    if (!resumeFile) {
      return;
    }
    const uploadedUrl = await uploadFile(resumeFile, "/upload-file");
    setValue("resumeUrl", uploadedUrl);
  };

  const handleApplyJobMutation = useApiMutation({
    url: `/job/:${jobId}/apply`,
    method: "post",
    onSuccess: (data) => {
      toast({
        title: data.message,
      });
    },
    onError: (err) => {
      toast({
        title: err.message,
      });
    },
  });

  const handleApplyJob = async (data) => {
    await handleApplyJobMutation.mutateAsync(data);
  };

  return (
    <Dialog
      onOpenChange={(value) => {
        if (!value) {
          reset();
        }
      }}
    >
      <DialogTrigger asChild>
        <Button className="gap-2 w-full my-3">
          <SendIcon className="h-4 w-4" />
          Apply Now
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Submit Your Application</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleApplyJob)} className="space-y-4">
          <div className="grid w-full gap-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              {...register("fullName")}
              placeholder="John Doe"
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.fullName.message}
              </p>
            )}
          </div>
          <div className="grid w-full gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              {...register("email")}
              placeholder="john@example.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="grid w-full gap-2">
            <Label htmlFor="resume">Resume</Label>
            <Input
              id="resume"
              type="file"
              onChange={(e) => {
                handleResumeUpload(e.target.files[0]);
              }}
              accept=".pdf,.doc,.docx"
              disabled={isUploading}
            />
            {isUploading && <Loader2 className="animate-spin" />}
            {errors.resumeUrl && (
              <p className="text-red-500 text-sm mt-1">
                {errors.resumeUrl.message}
              </p>
            )}
          </div>
          <div className="grid w-full gap-2">
            <Label htmlFor="coverLetter">Cover Letter</Label>
            <Textarea
              id="coverLetter"
              {...register("coverLetter")}
              placeholder="Tell us why you're the perfect fit for this role..."
              className="min-h-[100px]"
            />
            {errors.coverLetter && (
              <p className="text-red-500 text-sm mt-1">
                {errors.coverLetter.message}
              </p>
            )}
          </div>
          <Button
            disabled={handleApplyJobMutation.isPending}
            type="submit"
            className="w-full"
          >
            Submit Application{" "}
            {handleApplyJobMutation.isPending && (
              <Loader2 className="animate-spin" />
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
