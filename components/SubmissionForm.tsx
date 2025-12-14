// src/components/SubmissionForm.tsx
"use client";

import React, { useActionState } from "react"; // 🎯 CHANGE 1: Use 'useActionState' hook
import { Loader2, CheckCircle, XCircle, UploadCloud } from "lucide-react";
import { useFormStatus } from "react-dom"; // Keep this one, it's correct

import InputText from "./forms/InputText";
import Textarea from "./forms/TextArea";
import FileUploader from "./forms/FileUploader";
import { submitManuscript } from "@/app/actions";

// --- Helper Component for Status Management (No change needed here) ---
function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      aria-disabled={pending}
      disabled={pending}
      className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
    >
      {pending ? (
        <>
          <Loader2 size={20} className="animate-spin" />
          <span>Submitting Paper...</span>
        </>
      ) : (
        <>
          <UploadCloud size={20} />
          <span>Submit Paper</span>
        </>
      )}
    </button>
  );
}

// --- Main Form Component ---
export default function SubmissionForm() {
  const initialState = { success: false, message: "" };

  // 🎯 CHANGE 2: Replace useFormState with useActionState
  const [state, formAction] = useActionState(submitManuscript, initialState);

  // Render a success or error message after submission attempt
  const StatusMessage = () => {
    if (!state.message) return null;

    const isSuccess = state.success;
    const Icon = isSuccess ? CheckCircle : XCircle;
    const colorClass = isSuccess
      ? "bg-green-100 text-green-800 border-green-400"
      : "bg-red-100 text-red-800 border-red-400";

    return (
      <div
        className={`p-4 mb-6 border rounded-lg flex items-start space-x-3 ${colorClass}`}
      >
        <Icon size={24} className="flex-shrink-0 mt-0.5" />
        <div className="flex-grow">
          <p className="font-semibold">
            {isSuccess ? "Submission Successful!" : "Submission Failed."}
          </p>
          <p
            className="text-sm mt-1"
            dangerouslySetInnerHTML={{ __html: state.message }}
          />
          {isSuccess && (
            <p className="text-xs mt-2 font-medium">
              Please check your email shortly for confirmation and tracking
              details.
            </p>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 md:p-10 rounded-xl shadow-2xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        Author Submission
      </h1>
      <p className="text-gray-600 mb-8">
        Please complete all required fields and upload your final manuscript
        file (PDF/DOCX).
      </p>

      <StatusMessage />

      <form action={formAction} className="space-y-6">
        {/* 1. PAPER DETAILS */}
        <h2 className="text-xl font-semibold mb-2 pt-4 border-t">
          Paper Details
        </h2>

        <InputText
          label="Paper Title"
          name="paperTitle"
          helperText="Maximum 200 characters. The same title will be printed on your certificate."
        />

        <Textarea
          label="Abstract"
          name="abstract"
          helperText="Provide a concise summary of your research (250 words maximum)."
        />

        {/* 2. AUTHOR & CONTACT */}
        <h2 className="text-xl font-semibold mb-2 pt-4 border-t">
          Author Contact
        </h2>

        <InputText
          label="Author(s) List"
          name="authors"
          helperText="Enter author names separated by commas (e.g., Jane Doe, John Smith)."
        />

        <InputText
          label="Corresponding Author Email"
          name="email"
          type="email"
          placeholder="Use personal email for reliable contact (e.g., Gmail)"
        />

        <InputText
          label="Mobile Number (Optional)"
          name="mobileNumber"
          type="tel"
          placeholder="Enter mobile number"
          required={false}
        />

        {/* 3. FILE UPLOAD */}
        <h2 className="text-xl font-semibold mb-2 pt-4 border-t">
          Manuscript File
        </h2>

        <FileUploader
          label="Attach Research Paper"
          name="researchPaperFile"
          maxSizeText="6 MB (.doc, .docx, .pdf)"
        />

        {/* 4. TERMS & CAPTCHA */}
        <div className="mt-8 pt-4 border-t">
          <label className="flex items-center space-x-3 text-sm font-medium text-gray-700">
            <input
              type="checkbox"
              name="terms"
              required
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span>
              I confirm the paper is original and has not been submitted
              elsewhere.
            </span>
            <span className="text-red-500">*</span>
          </label>
        </div>

        <SubmitButton />

        <p className="text-center text-sm text-red-600 mt-4">
          Avoid submitting duplicate papers. For support, please contact
          ijassworld@gmail.com.
        </p>
      </form>
    </div>
  );
}
