// "use server";

import SubmissionForm from "@/components/SubmissionForm";

export default async function PaperSubmissionPage() {
  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 shadow-md rounded-lg my-12">
      <h1 className="text-3xl text-gray-800 font-bold text-center mb-2">
        Online Manuscript Submission - IJASSW
      </h1>
      <p className="text-center text-gray-600 mb-8">
        Submit your research study or survey paper securely online
      </p>

      <SubmissionForm />
    </div>
  );
}
