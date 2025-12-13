// src/components/forms/FileUploader.tsx
import React from "react";

interface FileUploaderProps {
  label: string;
  name: string;
  required?: boolean;
  maxSizeText: string;
}

const FileUploader: React.FC<FileUploaderProps> = ({
  label,
  name,
  required = true,
  maxSizeText,
}) => {
  return (
    <div className="mb-6">
      <label htmlFor={name} className="block text-gray-700 font-semibold mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type="file"
        className="block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-blue-50 file:text-blue-700
          hover:file:bg-blue-100"
        accept=".doc,.docx,.pdf"
        required={required}
      />
      <p className="mt-1 text-sm text-gray-500">Maximum size: {maxSizeText}</p>
    </div>
  );
};
export default FileUploader;
