import React from "react";
import HeroSection from "../../components/HeroSection";
import SubThemesScope from "../../components/SubThemesScope";
import ImportantDates from "../../components/ImportantDates";
import AuthorServiceCards from "../../components/AuthorServiceCards";
import JournalList from "../../components/JournalList";
import { Info, FileText, CheckCircle, HelpCircle } from "lucide-react";

export default function HomePage() {
  return (
    <main className="bg-[#f8faf8]">
      {/* 1. Call for Papers Banner / Hero */}
      <HeroSection />

      {/* 2. Important Schedule & Deadlines Bar */}
      <ImportantDates />

      {/* 3. About the Issue & Guidelines Summary */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* About the Issue Box */}
          <div className="lg:col-span-7 bg-[#f8faf8] border-2 border-emerald-800/20 p-6 md:p-8 rounded-2xl shadow-sm">
            <div className="flex items-center space-x-2 text-[#133e27] mb-3">
              <Info size={24} className="text-[#d4af37]" />
              <h2 className="text-2xl font-bold">About the Issue</h2>
            </div>
            <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-4">
              The Editorial Board of <strong>Waka Journal of Educational Studies (WAKAJES)</strong> invites original research articles, theoretical papers, and critical reviews for its upcoming multidisciplinary issue.
            </p>
            <p className="text-gray-700 text-sm md:text-base leading-relaxed">
              As communities navigate rapid technological shifts, environmental changes, and socio-economic transformation, interdisciplinary dialogue becomes essential. This issue aims to bring together scholarly work that bridges local wisdom with modern innovation to drive sustainable development and educational transformation.
            </p>
          </div>

          {/* Submission Guidelines Summary Card */}
          <div className="lg:col-span-5 bg-[#133e27] text-white p-6 md:p-8 rounded-2xl shadow-lg border-2 border-[#d4af37]">
            <div className="flex items-center space-x-2 text-[#d4af37] mb-4">
              <FileText size={24} />
              <h2 className="text-xl font-bold uppercase tracking-wide">
                Submission Guidelines
              </h2>
            </div>
            <ul className="space-y-3 text-xs md:text-sm text-gray-200">
              <li className="flex items-start space-x-2">
                <CheckCircle size={16} className="text-[#d4af37] flex-shrink-0 mt-0.5" />
                <span><strong>Length:</strong> 4,000 to 8,000 words (including references and abstract).</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle size={16} className="text-[#d4af37] flex-shrink-0 mt-0.5" />
                <span><strong>Abstract:</strong> 150–250 words accompanied by 4–6 keywords.</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle size={16} className="text-[#d4af37] flex-shrink-0 mt-0.5" />
                <span><strong>Format:</strong> Double-spaced, 12pt Times New Roman, APA style guidelines.</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle size={16} className="text-[#d4af37] flex-shrink-0 mt-0.5" />
                <span><strong>Originality:</strong> Papers must be original, unpublished, and not under consideration elsewhere.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 4. Sub-Themes & Scope Grid */}
      <SubThemesScope />

      {/* 5. Author Services & Quick Links */}
      <AuthorServiceCards />

      {/* 6. Showcase of Journals */}
      <JournalList />
    </main>
  );
}
