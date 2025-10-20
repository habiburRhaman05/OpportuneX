import { useState } from "react";
import { Upload, User } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PhotoUploadProps {
  onPhotoSelect?: (file: File) => void;
}

export function PhotoUpload({ onPhotoSelect }: PhotoUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      onPhotoSelect?.(file);
    }
  };

  return (
    <div className="flex items-center space-x-4">
      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center overflow-hidden">
        {preview ? (
          <img src={preview} alt="Profile" className="w-full h-full object-cover" />
        ) : (
          <User className="w-8 h-8 text-muted-foreground" />
        )}
      </div>
      
      <div>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
          id="photo-upload"
        />
        <label htmlFor="photo-upload">
          <Button type="button" variant="outline" size="sm" asChild>
            <span className="cursor-pointer">
              <Upload className="w-4 h-4 mr-2" />
              Upload a new photo
            </span>
          </Button>
        </label>
      </div>
    </div>
  );
}