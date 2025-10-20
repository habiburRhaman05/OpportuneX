import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Upload, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface ImageUploadProps {
  value: string | File | undefined;
  onChange: (file: File | string) => void;
  error?: string;
  label?: string;
  profilePhoto: string;
}

export function ImageUpload({
  profilePhoto = "",
  value,
  onChange,
  error,
  label = "Upload Image",
}: ImageUploadProps) {
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const previewUrl =
    typeof value === "string"
      ? value
      : value instanceof File
      ? URL.createObjectURL(value)
      : undefined;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onChange(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onChange(e.dataTransfer.files[0]);
    }
  };

  const handleClickUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleRemove = () => {
    onChange("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onChange(e.target.files[0]);
    }
  };

  return (
    <div className="relative">
      <Avatar className="h-20 w-20 border-2 border-zinc-600">
        <AvatarImage
          src={profilePhoto || "/placeholder.svg?height=80&width=80"}
        />
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
      {profilePhoto === "" && (
        <label htmlFor="photo-upload">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="border-zinc-600 text-zinc-300 hover:bg-zinc-700 hover:text-white bg-zinc-800 transition-colors cursor-pointer"
            asChild
          >
            <span>
              <Upload className="h-4 w-4 mr-2" />
              Upload Photo
            </span>
          </Button>
        </label>
      )}
    </div>
  );
}

// <div className="w-full space-y-2">
//   <div
//     className={cn(
//       "border rounded-lg overflow-hidden transition-all",
//       dragOver ? "border-primary border-dashed bg-primary/5" : "border-input",
//       error && "border-destructive",
//     )}
//     onDragOver={handleDragOver}
//     onDragLeave={handleDragLeave}
//     onDrop={handleDrop}
//   >
//     {previewUrl ? (
//       <div className="relative w-full">
//         <img
//           src={previewUrl}
//           alt="Preview"
//           className="w-full h-auto object-contain max-h-[200px]"
//         />
//         <Button
//           type="button"
//           variant="destructive"
//           size="icon"
//           className="absolute top-2 right-2 rounded-full w-8 h-8"
//           onClick={handleRemove}
//         >
//           <X className="h-4 w-4" />
//         </Button>
//       </div>
//     ) : (
//       <div
//         className="flex flex-col items-center justify-center p-8 cursor-pointer bg-muted/20"
//         onClick={handleClickUpload}
//       >
//         <Upload className="h-12 w-12 text-muted-foreground mb-2" />
//         <p className="font-medium text-sm">{label}</p>
//         <p className="text-xs text-muted-foreground mt-1">Drag and drop or click to upload</p>
//       </div>
//     )}
//     <input
//       ref={fileInputRef}
//       type="file"
//       accept="image/*"
//       onChange={handleFileChange}
//       hidden
//     />
//   </div>
//   {error && <p className="text-sm text-destructive">{error}</p>}
// </div>
