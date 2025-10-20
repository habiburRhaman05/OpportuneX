import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Upload, FileText, X, Loader, Eye, Loader2 } from "lucide-react";
import { useFileUpload } from "@/hooks/useFileUplaod";

import useAuth from "@/hooks/useAuth";
import { Dialog, DialogClose, DialogContent } from "../ui/dialog";
import { Input } from "../ui/input";
import { useApiMutation } from "@/hooks/useApi";
import { queryClient } from "@/App";
import { toast } from "@/hooks/use-toast";

const ResumeForm = () => {
  const [resumeUrl, setResumeUrl] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [errors, setErrors] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const uploadHandler = useFileUpload();

  const { user, reValidateData } = useAuth();
  const { uploadFile, loading } = useFileUpload();
  const submitMutation = useApiMutation({
    url: "/candidate/auth/profile/update",
    method: "put",
    onSuccess: (data) => {
      setResumeUrl(previewUrl);
      setPreviewUrl("");
      reValidateData();
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
    url: "/candidate/auth/profile/update",
    method: "put",
    onSuccess: (data) => {
      setResumeUrl("");
      setPreviewUrl("");
      reValidateData();

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
  // Track if form is dirty
  const isDirty = resumeUrl;

  // Handle file selection
  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (file.type !== "application/pdf") {
      setErrors("Only PDF files are allowed.");
      return;
    }

    setErrors(null);
    const result = await uploadFile(e.target.files[0], "/upload-file");
    setPreviewUrl(result);
  };

  // Remove selected file
  const removeFile = () => {
    setPreviewUrl("");
  };

  // Save handler
  const handleSave = async () => {
    await submitMutation.mutateAsync({ resumeUrl });
  };

  const handleDeleteResume = async () => {
    await deletePhotoMutation.mutateAsync({ resumeUrl: "" });
  };

  useEffect(() => {
    setResumeUrl(user?.data.resumeUrl || "");
  }, [user, reValidateData]);

  return (
    <Card className="bg-zinc-900/50 border-zinc-800">
      <CardHeader>
        <CardTitle className="text-xl">Resume/CV</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Upload Section */}
        {!resumeUrl && (
          <div className="border-2 border-dashed border-zinc-700 rounded-lg p-8 text-center">
            {isUploading || loading ? (
              <Loader2 className="animate-spin w-12 h-12 mx-auto mb-4 text-zinc-400" />
            ) : (
              <>
                <Upload className="w-12 h-12 text-zinc-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  Upload Your Resume
                </h3>
                <p className="text-zinc-400 mb-4">
                  Upload a PDF file of your resume or CV
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="resume-upload"
                />
                <Label
                  htmlFor="resume-upload"
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg cursor-pointer transition-colors"
                >
                  <Upload className="w-4 h-4" />
                  Choose File
                </Label>
              </>
            )}
            {errors && <p className="text-red-400 text-sm mt-2">{errors}</p>}
          </div>
        )}

        {/* Show uploaded file */}
        {resumeUrl && (
          <div className="p-4 bg-zinc-800/50 rounded-lg border border-zinc-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="w-8 h-8 text-blue-400" />
                <div>
                  <p className="font-semibold">Resume.pdf</p>
                </div>
              </div>
              <div className="flex items-center gap-x-3">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="p-2 bg-blue-950 px-6"
                >
                  View
                </Button>
                <Button
                  type="button"
                  onClick={handleDeleteResume}
                  variant="ghost"
                  size="sm"
                  className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                >
                  <X className="w-4 h-4" />
                  Delete
                  {deletePhotoMutation.isPending && (
                    <Loader2 className="animate-spin ml-3" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        )}

        <Dialog open={previewUrl ? true : false}>
          <DialogContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="w-8 h-8 text-blue-400" />
                <div>
                  <h1>MyResume.pdf</h1>
                </div>
              </div>
              <div className="flex items-center gap-x-3">
                <Button
                  type="button"
                  onClick={removeFile}
                  variant="ghost"
                  size="sm"
                  className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <Button onClick={handleSave}>
              Save Changes{" "}
              {submitMutation.isPending && (
                <Loader2 className="animate-spin ml-2" />
              )}{" "}
            </Button>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default ResumeForm;
