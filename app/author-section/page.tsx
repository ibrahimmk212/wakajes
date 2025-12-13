// app/author-section/page.tsx
import React from "react";
import Link from "next/link";
import { Download, FileText, CheckCircle, AlertCircle } from "lucide-react"; // Using icons for visual enhancement

// Reusable component for the info sections to keep code clean
const InfoSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="mb-8 p-6 bg-white border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
    <h3 className="text-xl font-semibold text-blue-900 mb-3">{title}</h3>
    <div className="text-gray-600 text-sm leading-relaxed">{children}</div>
  </div>
);

export default function AuthorSectionPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 1. Hero Section (Visual similarity to image_f9c43a.png) */}
      <div className="relative h-64 md:h-80 bg-blue-900 flex items-center justify-center overflow-hidden">
        {/* Background Image Placeholder - Replace with your actual lab image path */}
        <div
          className="absolute inset-0 opacity-10 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/scholar-bg.png')" }}
        ></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            Author Guidelines
          </h1>
          <p className="text-lg md:text-xl font-light text-teal-100">
            Resources & Information for Journal Authors
          </p>
        </div>
      </div>

      {/* 2. Main Content Area */}
      <div className="max-w-5xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center text-blue-900 mb-12">
          Information & Resources for Authors
        </h2>

        <div className="space-y-4">
          {/* Before You Start */}
          {/* Rephrase titles and content */}
          <InfoSection title="Before You Start">
            <p>
              Ensure your manuscript is thoroughly proofread and formatted using
              our official
              <Link href="#" className="text-blue-500 hover:underline">
                {" "}
                manuscript template{" "}
              </Link>
              for expedited processing. For any assistance, please contact our
              helpdesk at{" "}
              <a
                href="mailto:ijassw@gmail.com"
                className="text-blue-500 hover:underline"
              >
                ijassw@gmail.com
              </a>
              .
            </p>
          </InfoSection>

          {/* Submission Categories */}
          <InfoSection title="Submission Categories">
            <p>We accept the following types of submissions:</p>

            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Original Research</li>
              <li>Survey / Review Articles</li>
              <li>Fast Communications (Short, ongoing research)</li>
              <li>Technical Notes</li>
            </ul>
          </InfoSection>

          {/* Electronic Supplementary Material */}
          <InfoSection title="Electronic Supplementary Material">
            <p>
              Authors may submit supplementary materials such as datasets,
              multimedia files, or additional figures to enhance their
              manuscripts. These materials should be clearly labeled and
              referenced within the main text.
            </p>
          </InfoSection>

          {/* Review Process */}
          <InfoSection title="Review Process">
            <p>
              Our peer review process usually takes <strong>7-14 days</strong>.
              Review results are communicated shortly after the evaluation is
              completed by our expert panel.
            </p>
          </InfoSection>

          {/* Rights, Permissions, and Licensing */}
          <InfoSection title="Rights, Permissions, and Licensing">
            <p>
              Authors retain copyright of their work and agree to publish under
              a Creative Commons license, allowing for broad dissemination and
              use of their research.
            </p>
          </InfoSection>
        </div>

        {/* 3. Downloads Section */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 px-2">
            Downloads
          </h3>

          <div className="space-y-4">
            {/* Manuscript Template Button */}
            <a href="#" className="block group">
              <div className="flex items-center bg-blue-600 text-white p-4 rounded-lg shadow hover:bg-blue-700 transition duration-300">
                <FileText
                  size={24}
                  className="mr-4 text-blue-200 group-hover:text-white"
                />
                <span className="font-semibold text-lg">
                  Manuscript Template
                </span>
                <Download
                  size={20}
                  className="ml-auto opacity-70 group-hover:opacity-100"
                />
              </div>
            </a>

            {/* Copyright Form Button */}
            <a href="#" className="block group">
              <div className="flex items-center bg-blue-600 text-white p-4 rounded-lg shadow hover:bg-blue-700 transition duration-300">
                <CheckCircle
                  size={24}
                  className="mr-4 text-blue-200 group-hover:text-white"
                />
                <span className="font-semibold text-lg">Copyright Form</span>
                <Download
                  size={20}
                  className="ml-auto opacity-70 group-hover:opacity-100"
                />
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
