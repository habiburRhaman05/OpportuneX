import React, { useState } from "react";

export default function FileUpload() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");
  const [fileUrl, setFileUrl] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setStatus("");
    setFileUrl("");
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setStatus("⚠️ Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setStatus("⏳ Uploading...");
      const res = await fetch("http://localhost:5500/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("✅ File uploaded successfully!");
        setFileUrl(data.fileUrl);
      } else {
        setStatus("❌ Upload failed: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      setStatus("⚠️ Error: " + err.message);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-2xl shadow-md space-y-4">
      <h2 className="text-xl font-bold">Upload to Puter Storage</h2>

      <form onSubmit={handleUpload} className="space-y-4">
        <input
          type="file"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-600
                     file:mr-4 file:py-2 file:px-4
                     file:rounded-full file:border-0
                     file:text-sm file:font-semibold
                     file:bg-blue-50 file:text-blue-700
                     hover:file:bg-blue-100"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-xl shadow"
        >
          Upload
        </button>
      </form>

      {status && <p className="text-sm text-gray-700">{status}</p>}

      {fileUrl && (
        <p className="text-sm text-green-700 break-all">
          🌐 File URL:{" "}
          <a
            href={fileUrl}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 underline"
          >
            {fileUrl}
          </a>
        </p>
      )}
    </div>
  );
}
