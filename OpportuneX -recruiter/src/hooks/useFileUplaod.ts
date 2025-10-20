import { createApi } from "@/api/client";
import http from "@/api/http";
import { delay } from "@/utils/delay";

import { useState } from "react";

interface UploadResult {
  url: string | null;
}

interface UseUploadFileReturn {
  uploadFile: (file: File, url: string) => Promise<string>;
  loading: boolean;
  error: string | null;
}

export function useFileUpload(): UseUploadFileReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const api = createApi(http);

  const uploadFile = async (file: File, uploadUrl: string) => {
    setLoading(true);
    setError(null);
    try {
      await delay(3000);
      const formData = new FormData();
      formData.append("file", file);
      const res = await api.post(uploadUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res);

      const data = res.data;
      //   console.log(data);

      // if (!res.status || res.status !== 200) {
      //   setError(data.error || "Unknown upload error");
      //   return;
      // }

      return data.url;
    } catch (err: any) {
      setError(err.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return { uploadFile, loading, error };
}
