// src/components/forms/Textarea.tsx
import React from "react";

interface TextareaProps {
  label: string;
  name: string;
  rows?: number;
  required?: boolean;
}

const Textarea: React.FC<TextareaProps> = ({
  label,
  name,
  rows = 5,
  required = true,
}) => {
  return (
    <div className="mb-6">
      <label htmlFor={name} className="block text-gray-700 font-semibold mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <textarea
        id={name}
        name={name}
        rows={rows}
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 resize-none"
        required={required}
      ></textarea>
    </div>
  );
};
export default Textarea;
