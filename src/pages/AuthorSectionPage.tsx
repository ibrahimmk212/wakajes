import React from "react";
import { Link } from "react-router-dom";
import { Download, FileText, CheckCircle, Send } from "lucide-react";

const InfoSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="mb-8 p-6 bg-white border border-emerald-100 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border-l-4 border-l-[#133e27]">
    <h3 className="text-xl font-semibold text-[#133e27] mb-3">{title}</h3>
    <div className="text-gray-600 text-sm leading-relaxed">{children}</div>
  </div>
);

export default function AuthorSectionPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative py-16 bg-[#133e27] flex items-center justify-center overflow-hidden">
        <div className="relative z-10 text-center text-white px-4">
          <span className="inline-block bg-[#d4af37] text-[#133e27] text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full mb-3">
            WAKAJES Vol. 4 No. 3
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-2 text-white">
            Author Guidelines
          </h1>
          <p className="text-lg md:text-xl font-light text-emerald-100">
            Resources & Instructions for Research Paper Authors
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="space-y-4">
          <InfoSection title="Before You Start">
            <p className="mb-2">
              Ensure your manuscript is thoroughly proofread and formatted according to WAKAJES APA style standards.
            </p>
            <p>
              Submit your paper directly via our{" "}
              <Link to="/paper-submission" className="text-[#133e27] font-bold hover:underline">
                Online Paper Submission (Google Form)
              </Link>
              . For any assistance, reach out to our editorial desk at{" "}
              <a href="mailto:wakajes1986@gmail.com" className="text-[#133e27] font-bold hover:underline">
                wakajes1986@gmail.com
              </a>{" "}
              or call <strong>08065486735 / 08026367332</strong>.
            </p>
          </InfoSection>

          <InfoSection title="Submission Categories">
            <p className="mb-2">WAKAJES accepts empirical and theoretical papers across multidisciplinary fields:</p>
            <ul className="list-disc list-inside space-y-1 ml-2 text-gray-700">
              <li>Original Empirical Research Articles</li>
              <li>Systematic Literature Reviews / Survey Articles</li>
              <li>Technical Notes & Educational Innovation Reports</li>
              <li>Case Studies & Policy Analyses</li>
            </ul>
          </InfoSection>

          <InfoSection title="Manuscript Requirements & Formatting">
            <ul className="list-disc list-inside space-y-1.5 ml-2 text-gray-700">
              <li><strong>Length:</strong> 4,000 to 8,000 words.</li>
              <li><strong>Abstract:</strong> 150–250 words with 4 to 6 keywords.</li>
              <li><strong>Typography:</strong> 12pt Times New Roman, double-spaced with standard margins.</li>
              <li><strong>Reference Style:</strong> APA 7th Edition format strictly.</li>
              <li><strong>Cover Page:</strong> Title, author name(s), institutional affiliation, email, and phone number.</li>
            </ul>
          </InfoSection>

          <InfoSection title="Peer Review Process">
            <p>
              All submitted papers undergo double-blind peer review by distinguished scholars. Authors are notified of acceptance decisions and reviewer comments within <strong>7 to 14 business days</strong>.
            </p>
          </InfoSection>

          <InfoSection title="Vetting Fee & Payment Account">
            <p className="mb-2">
              A non-refundable vetting fee of <strong>₦10,000</strong> must be paid upon submission.
            </p>
            <div className="bg-amber-50 p-4 rounded-lg border border-amber-200 text-xs text-amber-950 font-medium">
              <p><strong>Bank:</strong> United Bank for Africa (UBA)</p>
              <p><strong>Account Name:</strong> WAKA JOURNAL OF EDUCATIONAL STUDIES</p>
              <p><strong>Account Number:</strong> 1012453666</p>
            </div>
          </InfoSection>
        </div>

        <div className="mt-12 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-2xl font-bold text-[#133e27] mb-6 flex items-center gap-2">
            <Send size={24} className="text-[#d4af37]" />
            Ready to Submit Your Manuscript?
          </h3>
          <p className="text-gray-600 text-sm mb-6">
            Click below to access our online paper submission system hosted via Google Forms.
          </p>
          <Link
            to="/paper-submission"
            className="inline-flex items-center gap-2 bg-[#133e27] hover:bg-[#1e4d2b] text-white font-bold px-6 py-3.5 rounded-xl shadow-md transition text-base"
          >
            <span>Proceed to Paper Submission</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

