// src/components/forms/Textarea.tsx
import React from "react";

interface TextareaProps {
  label: string;
  name: string;
  rows?: number;
  helperText?: string;
  required?: boolean;
  placeholder?: string;
}

const Textarea: React.FC<TextareaProps> = ({
  label,
  name,
  helperText,
  rows = 5,
  required = true,
  placeholder,
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
        placeholder={placeholder}
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-[#133e27] focus:border-[#133e27] resize-none"
        required={required}
      ></textarea>
      {helperText && <p className="mt-1 text-sm text-gray-500">{helperText}</p>}
    </div>
  );
};
export default Textarea;
