import { useState } from "react";
import { Upload, Building2 } from "lucide-react";

interface LogoUploadProps {
  onLogoSelect?: (file: File) => void;
  error?: boolean;
}

export function LogoUpload({ onLogoSelect, error }: LogoUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      onLogoSelect?.(file);
    }
  };

  return (
    <div className="space-y-2">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
        id="logo-upload"
      />
      <label htmlFor="logo-upload">
        <div className={`w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-colors hover:border-primary/50 flex flex-col items-center justify-center space-y-2 ${
          error ? "border-destructive" : "border-muted-foreground/25"
        }`}>
          {preview ? (
            <img src={preview} alt="Company logo" className="max-h-24 max-w-24 object-contain" />
          ) : (
            <>
              <Upload className="w-6 h-6 text-muted-foreground" />
              <div className="text-center">
                <p className="text-sm font-medium text-primary">Upload Logo</p>
                <p className="text-xs text-muted-foreground">or drag it in</p>
              </div>
            </>
          )}
        </div>
      </label>
    </div>
  );
}