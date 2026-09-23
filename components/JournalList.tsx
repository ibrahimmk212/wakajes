import React from "react";
import { Link } from "react-router-dom";
import { Send, Award } from "lucide-react";

export default function JournalList() {
  return (
    <section className="py-14 bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-[#1e4d2b] bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
            Official Publication
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#133e27] mt-3">
            WAKAJES Publication Journal
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mt-2 text-sm md:text-base">
            College of Education, Waka-Biu, Borno State
          </p>
        </div>

        <div className="max-w-3xl mx-auto bg-[#f8faf8] border-2 border-[#1e4d2b]/20 rounded-2xl shadow-lg p-6 md:p-8 flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
          <div className="w-36 h-36 flex-shrink-0 bg-white rounded-full p-2 border-4 border-[#d4af37] shadow-md flex items-center justify-center">
            <img
              src="/images/logo.png"
              alt="WAKAJES Emblem"
              className="w-full h-full object-contain"
            />
          </div>

          <div className="space-y-3 text-center md:text-left flex-grow">
            <div className="inline-block bg-[#133e27] text-[#d4af37] text-xs font-bold px-3 py-1 rounded-full">
              Vol. 4 No. 3 (ISSN: 1597-5118)
            </div>
            <h3 className="text-2xl font-extrabold text-[#133e27]">
              Waka Journal of Educational Studies (WAKAJES)
            </h3>
            <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
              A peer-reviewed multidisciplinary journal promoting research in education, pedagogy, humanities, science & technology, renewable energy, and social sciences.
            </p>
            <div className="pt-2 flex flex-wrap justify-center md:justify-start gap-3">
              <Link to="/paper-submission">
                <button className="bg-[#133e27] hover:bg-[#1e4d2b] text-white text-sm font-bold py-2.5 px-6 rounded-full shadow transition flex items-center space-x-2 cursor-pointer">
                  <Send size={16} />
                  <span>Submit Paper</span>
                </button>
              </Link>
              <Link to="/registration">
                <button className="bg-white border border-[#1e4d2b] text-[#133e27] hover:bg-emerald-50 text-sm font-semibold py-2.5 px-5 rounded-full transition cursor-pointer">
                  View Fees (₦10,000)
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
