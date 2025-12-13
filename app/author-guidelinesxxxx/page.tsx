// app/author-guidelines/page.tsx
import InfoBlock from "@/components/InfoBlock";
import Link from "next/link";

export default function AuthorGuidelinesPage() {
  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      {/* Hero Banner Placeholder */}
      <div
        className="h-64 bg-blue-700/80 flex items-center justify-center mb-12"
        style={{ backgroundImage: "url('/images/lab-bg-2.jpg')" }}
      >
        <h1 className="text-4xl font-bold text-white relative z-10">
          Author Guidelines
        </h1>
      </div>

      <h2 className="text-3xl font-bold text-center mb-10">
        Information & Resources for Authors
      </h2>

      {/* Blocks of Information */}
      <InfoBlock
        title="Before You Start"
        //  reprash it
        content="Ensure your paper is proofread and formatted using our official manuscript template for faster processing. Contact helpdesk at   
        <a href='mailto:ijassw@gmail.com' className='text-blue-500 hover:underline'>ijassw@gmail.com</a>."
      />
      <InfoBlock
        title="Submission Categories"
        content="Original Research, Survey / Review Articles, Fast Communications (Short, ongoing research), Technical Notes."
      />
      <InfoBlock
        title="Review Process"
        content="All submissions undergo a rigorous double-blind peer review to ensure quality and integrity."
      />
      <InfoBlock
        title="Rights, Permissions, and Licensing"
        content="Authors retain copyright and agree to publish under a Creative Commons license."
      />

      {/* Downloads Section */}
      <div className="mt-12 p-6 border rounded-lg shadow-md">
        <h3 className="text-2xl font-semibold mb-4">Downloads</h3>
        <div className="space-y-3">
          {/* Links but not available now, turn them t link when provided later*/}
          <div
            // href="/downloads/manuscript-template.doc"
            className="inline-flex items-center bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
          >
            Download Manuscript Template
          </div>
          <div
            // href="/downloads/copyright-form.pdf"
            className="inline-flex items-center bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition ml-4"
          >
            Download Copyright Form
          </div>
        </div>
      </div>
    </div>
  );
}
