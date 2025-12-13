"use client";

import InputText from "./forms/InputText";
import Textarea from "./forms/TextArea";
// import Select from "./forms/Select"; // You'll need to create this for Area/Country
import FileUploader from "./forms/FileUploader";
import { submitManuscript } from "@/app/actions"; // Placeholder for your Server Action

const handleSubmit = async (formData: FormData) => {
  await submitManuscript(formData);
};

export default function SubmissionForm() {
  return (
    <div>
      {/* Use the built-in 'action' prop with a Server Action for simple form submission */}
      <form action={handleSubmit} className="space-y-6">
        <h2 className="text-xl font-semibold mb-6">Submission Form</h2>
        {/* Paper Title */}
        <InputText
          label="Paper Title"
          name="paperTitle"
          helperText="Maximum 200 characters. Do not use generic titles (e.g., Case Study, Research Paper). The same title will be printed on your certificate."
        />

        {/* Authors */}
        <InputText
          label="Author(s)"
          name="authors"
          helperText="Enter author names separated by commas. Do not include numbers, rank, affiliations, or other details."
        />

        {/* Email */}
        <InputText
          label="Email"
          name="email"
          type="email"
          placeholder="Use personal email (Gmail/Yahoo, etc.)"
        />

        {/* Abstract */}
        <Textarea label="Abstract" name="abstract" />

        {/* Research Area and Country (placeholder for a Select component) */}
        {/* <Select label="Research Paper Area" name="researchArea" options={/* ... */}
        {/* <Select label="Country" name="country" options={/* ... */}

        {/* File Upload */}
        <FileUploader
          label="Attach Research Paper"
          name="researchPaperFile"
          maxSizeText="6 MB (.doc, .docx, .pdf)"
        />

        {/* Mobile Number */}
        <InputText
          label="Mobile Number"
          name="mobileNumber"
          type="number"
          placeholder="Enter mobile number"
          required={false}
        />

        {/* Captcha Placeholder */}
        <div className="mt-8">
          <label className="flex items-center space-x-2">
            <input type="checkbox" required />
            <span>I&apos;m not a robot</span>
          </label>
          {/* Note: Google reCAPTCHA integration requires external library and server-side verification. */}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
        >
          Submit Paper
        </button>

        <p className="text-center text-sm text-red-600 mt-4">
          Avoid submitting duplicate papers. To request changes or if you
          haven&apos;t received confirmation, write to ijassworld@gmail.com
        </p>
      </form>
    </div>
  );
}
