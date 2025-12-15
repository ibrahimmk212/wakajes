/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/forms/FileUploader.tsx (UPDATED for Cloudinary Widget)
"use client";

import React, { useState } from "react";
import { UploadCloud, FileText } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";

// NOTE: You must install the next-cloudinary package: npm install next-cloudinary

interface FileUploaderProps {
  label: string;
  // We still need the original name for the hidden input
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
  // State to hold the uploaded file reference from Cloudinary
  const [fileUrl, setFileUrl] = useState("");
  const [filePublicId, setFilePublicId] = useState("");
  const [fileName, setFileName] = useState("");

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <div
        className={`p-6 border-2 rounded-xl transition ${
          fileUrl
            ? "border-green-500 bg-green-50"
            : "border-dashed border-gray-300 bg-gray-50"
        }`}
      >
        {fileUrl ? (
          // --- SUCCESS STATE ---
          <div className="flex items-center justify-between">
            <span className="flex items-center text-green-700">
              <FileText size={20} className="mr-2 flex-shrink-0" />
              <span className="truncate font-medium">
                {fileName || "Manuscript Uploaded"}
              </span>
            </span>
            <CldUploadWidget
              uploadPreset={
                process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET ||
                "ijassw_upload"
              }
              options={{ resourceType: "raw" }}
              onSuccess={(result: any, { widget }) => {
                if (result.event === "success") {
                  setFileUrl(result.info.secure_url);
                  setFilePublicId(result.info.public_id);
                  setFileName(result.info.original_filename);
                  widget.close();
                }
              }}
            >
              {({ open }) => (
                <button
                  type="button"
                  onClick={() => open()}
                  className="ml-4 text-sm text-blue-600 hover:underline"
                >
                  Change File
                </button>
              )}
            </CldUploadWidget>
          </div>
        ) : (
          // --- INITIAL STATE ---
          <CldUploadWidget
            uploadPreset={
              process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET ||
              "ijassw_upload"
            }
            options={{ resourceType: "raw" }}
            onSuccess={(result: any, { widget }) => {
              if (result.event === "success") {
                setFileUrl(result.info.secure_url);
                setFilePublicId(result.info.public_id);
                setFileName(result.info.original_filename);
                widget.close();
              }
            }}
          >
            {({ open }) => (
              <button
                type="button"
                onClick={() => open()}
                className="w-full text-center hover:text-blue-600 transition"
              >
                <UploadCloud size={30} className="mx-auto text-blue-500 mb-2" />
                <p className="text-md font-medium text-gray-800">
                  Click here to upload your manuscript
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Formats: DOC, DOCX, PDF | Max size: {maxSizeText}
                </p>
              </button>
            )}
          </CldUploadWidget>
        )}
      </div>

      {/* 🎯 HIDDEN INPUTS: Pass the URL and Public ID to the Server Action */}
      <input
        type="hidden"
        name="manuscriptUrl"
        value={fileUrl}
        required={required}
      />
      <input
        type="hidden"
        name="manuscriptPublicId"
        value={filePublicId}
        required={required}
      />

      {/* Required field validation check */}
      {required && !fileUrl && (
        <p className="text-xs text-red-500">
          A manuscript file is required before submission.
        </p>
      )}
    </div>
  );
}
