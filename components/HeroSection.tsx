import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, BookOpen, Send } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative bg-[#081c15] text-white py-12 md:py-16 overflow-hidden border-b-4 border-[#d4af37]">
      {/* Background Building Image & Gradient Overlay */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <img
          src="/images/building-hero.png"
          alt="College of Education Waka-Biu Campus Building"
          className="w-full h-full object-cover object-center filter brightness-90 opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#081c15] via-[#081c15]/85 to-[#081c15]/60" />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Hero Copy (8 cols) */}
          <div className="lg:col-span-8 space-y-6 text-left">
            <div className="inline-flex items-center space-x-2 bg-[#1e4d2b] text-[#d4af37] px-4 py-1.5 rounded-full border border-[#d4af37]/40 text-xs font-bold tracking-wide">
              <Sparkles size={14} />
              <span>CALL FOR PAPERS • VOL. 4 NO. 3 (ISSN: 1597-5118)</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-white">
              Waka Journal of Educational Studies <span className="text-[#d4af37] block mt-1">(WAKAJES)</span>
            </h1>

            {/* Official Theme Box */}
            <div className="bg-[#133e27] border-l-4 border-[#d4af37] p-5 rounded-r-xl shadow-lg">
              <span className="text-xs font-bold text-[#d4af37] uppercase tracking-wider block mb-1">
                Official Issue Theme:
              </span>
              <p className="text-base md:text-lg font-medium text-white italic leading-snug">
                "Fostering sustainable futures: innovation, local knowledge and transformative education in the global south."
              </p>
            </div>

            <p className="text-sm md:text-base text-gray-300 max-w-2xl leading-relaxed">
              Published by the <strong>College of Education, Waka-Biu, Borno State</strong>. We invite original research articles, theoretical papers, and critical reviews that bridge local wisdom with modern innovation.
            </p>

            {/* CTA Action Buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
              <Link to="/paper-submission">
                <button className="bg-[#d4af37] hover:bg-[#e5a823] text-[#081c15] font-extrabold py-3.5 px-8 rounded-full shadow-xl transition-all transform hover:-translate-y-0.5 flex items-center space-x-2 cursor-pointer text-sm sm:text-base">
                  <Send size={18} />
                  <span>Submit Research Paper</span>
                </button>
              </Link>
              <Link to="/registration">
                <button className="bg-[#1e4d2b] hover:bg-[#2d6a4f] text-white border border-[#d4af37]/50 font-semibold py-3.5 px-6 rounded-full transition cursor-pointer text-sm sm:text-base">
                  Vetting Fee & Payment Info
                </button>
              </Link>
            </div>
          </div>

          {/* Right Banner Image Display Card (4 cols) */}
          <div className="lg:col-span-4 hidden lg:block">
            <div className="bg-white p-3 rounded-2xl shadow-2xl border-4 border-[#d4af37] transform rotate-1 hover:rotate-0 transition duration-300">
              <img
                src="/images/wakajes-banner.jpg"
                alt="WAKAJES Official Poster Flyer"
                className="w-full h-auto rounded-xl object-cover shadow"
              />
              <div className="mt-3 text-center bg-[#f8faf8] p-2 rounded-lg border border-gray-200">
                <p className="text-xs font-bold text-[#133e27]">
                  WAKAJES • Vol. 4 No. 3
                </p>
                <p className="text-[11px] text-gray-500">
                  College of Education, Waka-Biu
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
