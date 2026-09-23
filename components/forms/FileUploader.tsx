import React, { useState } from "react";
import { UploadCloud, FileText, CheckCircle } from "lucide-react";

interface FileUploaderProps {
  label: string;
  name: string;
  maxSizeText: string;
  required?: boolean;
}

export default function FileUploader({
  label,
  name,
  maxSizeText,
  required = true,
}: FileUploaderProps) {
  const [fileUrl, setFileUrl] = useState("");
  const [filePublicId, setFilePublicId] = useState("");
  const [fileName, setFileName] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setIsUploading(true);

    // Simulate file processing or upload to server/Cloudinary
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "ijassw_upload");

      // Attempt Cloudinary upload if preset exists, or fallback to mock URL for frontend
      const cloudName = "demo";
      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`, {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        setFileUrl(data.secure_url || URL.createObjectURL(file));
        setFilePublicId(data.public_id || file.name);
      } else {
        setFileUrl(URL.createObjectURL(file));
        setFilePublicId(`local_${file.name}`);
      }
    } catch {
      setFileUrl(URL.createObjectURL(file));
      setFilePublicId(`local_${file.name}`);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <div
        className={`p-6 border-2 rounded-xl transition ${
          fileUrl
            ? "border-green-500 bg-green-50"
            : "border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100"
        }`}
      >
        {fileUrl ? (
          <div className="flex items-center justify-between">
            <span className="flex items-center text-green-700">
              <CheckCircle size={20} className="mr-2 flex-shrink-0" />
              <span className="truncate font-medium">{fileName || "Manuscript Uploaded"}</span>
            </span>
            <label className="ml-4 text-sm text-blue-600 hover:underline cursor-pointer">
              Change File
              <input
                type="file"
                className="hidden"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
              />
            </label>
          </div>
        ) : (
          <label className="w-full block text-center cursor-pointer">
            <UploadCloud size={30} className="mx-auto text-blue-500 mb-2" />
            <p className="text-md font-medium text-gray-800">
              {isUploading ? "Uploading..." : "Click here to select and upload your manuscript"}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Formats: DOC, DOCX, PDF | Max size: {maxSizeText}
            </p>
            <input
              type="file"
              className="hidden"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
            />
          </label>
        )}
      </div>

      <input type="hidden" name="manuscriptUrl" value={fileUrl} required={required} />
      <input type="hidden" name="manuscriptPublicId" value={filePublicId} required={required} />

      {required && !fileUrl && (
        <p className="text-xs text-red-500">A manuscript file is required before submission.</p>
      )}
    </div>
  );
}
