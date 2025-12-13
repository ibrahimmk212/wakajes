// src/components/forms/InputText.tsx
import React from "react";

interface InputTextProps {
  label: string;
  name: string;
  type?: "text" | "email" | "number";
  placeholder?: string;
  helperText?: string;
  required?: boolean;
}

const InputText: React.FC<InputTextProps> = ({
  label,
  name,
  type = "text",
  placeholder,
  helperText,
  required = true,
}) => {
  return (
    <div className="mb-6">
      <label htmlFor={name} className="block text-gray-700 font-semibold mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
        required={required}
        // In a real app, you would add props here for form state management (e.g., from React Hook Form)
      />
      {helperText && <p className="mt-1 text-sm text-gray-500">{helperText}</p>}
    </div>
  );
};
export default InputText;
