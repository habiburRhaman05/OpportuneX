import type React from "react";

import { useState } from "react";
import { Upload, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function LogoUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const [isDragging, setIsDragging] = useState(false);

  const handleFileSelect = async (selectedFile: File) => {
    setError(null);

    // Validate file
    if (selectedFile.size > 5242880) {
      setError("File size must be less than 5MB");
      toast({
        title: "Upload Failed",
        description: "File size must be less than 5MB",
        variant: "destructive",
      });
      return;
    }

    if (
      !["image/jpeg", "image/png", "image/webp"].includes(selectedFile.type)
    ) {
      setError("Only JPEG, PNG, and WebP formats are allowed");
      toast({
        title: "Invalid Format",
        description: "Only JPEG, PNG, and WebP formats are allowed",
        variant: "destructive",
      });
      return;
    }

    setFile(selectedFile);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsLoading(true);
    setError(null);

    // Simulate upload with delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Simulate random success/error for demo
    if (Math.random() > 0.1) {
      setIsSuccess(true);
      toast({
        title: "Success",
        description: "Logo uploaded successfully!",
        className: "bg-green-950 border-green-800 text-green-100",
      });
    } else {
      setError("Upload failed. Please try again.");
      toast({
        title: "Upload Error",
        description: "Failed to upload logo. Please try again.",
        variant: "destructive",
      });
    }

    setIsLoading(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      handleFileSelect(droppedFile);
    }
  };

  const handleRemove = () => {
    setFile(null);
    setPreview(null);
    setIsSuccess(false);
    setError(null);
  };

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      {!preview && !isSuccess && (
        <div
          onDragOver={() => setIsDragging(true)}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={`relative border-2 border-dashed rounded-lg p-8 transition-all text-center cursor-pointer ${
            isDragging
              ? "border-blue-500 bg-blue-500/5"
              : "border-zinc-700 bg-zinc-900/50 hover:border-blue-400"
          }`}
        >
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              e.target.files && handleFileSelect(e.target.files[0])
            }
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
          <div className="space-y-2">
            <div className="flex justify-center">
              <Upload className="w-8 h-8 text-blue-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-white">
                Drag and drop your logo here
              </p>
              <p className="text-xs text-zinc-400 mt-1">
                or click to browse (Max 5MB)
              </p>
            </div>
            <p className="text-xs text-zinc-500">
              Supported formats: JPEG, PNG, WebP
            </p>
          </div>
        </div>
      )}

      {/* Preview and Upload */}
      {preview && !isSuccess && (
        <div className="space-y-4">
          <div className="relative w-32 h-32 mx-auto bg-zinc-900 rounded-lg overflow-hidden border border-zinc-800">
            <img
              src={preview || "/placeholder.svg"}
              alt="Logo preview"
              className="object-cover"
            />
          </div>
          <div className="flex gap-2 justify-center">
            <button
              onClick={handleRemove}
              disabled={isLoading}
              className="px-4 py-2 text-sm font-medium text-zinc-300 bg-zinc-900 border border-zinc-800 rounded-lg hover:bg-zinc-800 transition-colors disabled:opacity-50"
            >
              Remove
            </button>
            <button
              onClick={handleUpload}
              disabled={isLoading}
              className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg hover:from-blue-700 hover:to-cyan-600 transition-all disabled:opacity-50 flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                "Upload Logo"
              )}
            </button>
          </div>
        </div>
      )}

      {/* Success State */}
      {isSuccess && (
        <div className="space-y-4">
          <div className="relative w-32 h-32 mx-auto bg-zinc-900 rounded-lg overflow-hidden border border-green-800">
            <img
              src={preview || "/placeholder.svg"}
              alt="Logo"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col items-center gap-2">
            <CheckCircle className="w-6 h-6 text-green-500" />
            <p className="text-sm font-medium text-green-400">
              Logo uploaded successfully
            </p>
            <button
              onClick={handleRemove}
              className="text-xs text-blue-400 hover:text-blue-300"
            >
              Change logo
            </button>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && !isLoading && (
        <div className="flex items-center gap-3 p-3 bg-red-950/30 border border-red-800 rounded-lg">
          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
          <p className="text-sm text-red-200">{error}</p>
        </div>
      )}
    </div>
  );
}
