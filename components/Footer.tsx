import React from "react";
import { Link } from "react-router-dom";
import {
  Mail,
  FileText,
  MapPin,
  BookOpen,
  ArrowUp,
  Phone,
  Send,
  Award,
} from "lucide-react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const mainLinks = [
    { name: "Current Edition (Vol. 4 No. 3)", href: "/current-edition" },
    { name: "Archives & Past Issues", href: "/archives" },
    { name: "Editorial Board", href: "/editorial-board" },
    { name: "Indexing & Partners", href: "/indexing" },
  ];

  const authorLinks = [
    { name: "Call for Papers", href: "/#call-for-papers" },
    { name: "Submission Guidelines", href: "/paper-submission" },
    { name: "Vetting Fee & Payment", href: "/registration" },
    { name: "Author Guidelines", href: "/author-section" },
  ];

  return (
    <footer className="bg-[#081c15] text-gray-300 border-t-4 border-[#d4af37] mt-16">
      {/* Tagline Banner */}
      <div className="bg-[#133e27] py-3 text-center border-b border-[#1e4d2b]">
        <p className="text-sm font-semibold tracking-widest text-[#d4af37] uppercase">
          Knowledge • Innovation • Sustainability
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 border-b border-[#1e4d2b] pb-10 mb-8">
          {/* 1. About WAKAJES */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-3 group">
              <img
                src="/images/logo.png"
                alt="WAKAJES Logo"
                className="w-12 h-12 object-contain bg-white rounded-full p-1 border border-[#d4af37]"
              />
              <div>
                <span className="text-xl font-extrabold text-white block group-hover:text-[#d4af37] transition">
                  WAKAJES
                </span>
                <span className="text-xs text-[#d4af37] font-medium block">
                  Vol. 4 No. 3 (ISSN: 1597-5118)
                </span>
              </div>
            </Link>
            <p className="text-xs text-gray-300 leading-relaxed">
              Waka Journal of Educational Studies (WAKAJES) is an official multidisciplinary journal published by the College of Education, Waka-Biu, Borno State, Nigeria. We bridge local wisdom with modern innovation to drive sustainable development and educational transformation.
            </p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center text-xs text-[#d4af37] hover:underline transition cursor-pointer"
            >
              <ArrowUp size={14} className="mr-1" /> Back to Top
            </button>
          </div>

          {/* 2. Contact Info */}
          <div className="space-y-3">
            <h4 className="text-base font-bold text-white border-b border-[#d4af37] pb-1 mb-3 inline-block">
              Editorial Contacts
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-start space-x-2">
                <Award size={16} className="text-[#d4af37] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-white">Editor-in-Chief</p>
                  <p className="text-gray-300">Dr. Mercy B. Wakawa</p>
                  <p className="text-gray-400">📞 08063849486</p>
                </div>
              </div>
              <div className="flex items-start space-x-2 pt-1 border-t border-[#1e4d2b]">
                <FileText size={16} className="text-[#d4af37] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-white">Secretary (Ag)</p>
                  <p className="text-gray-300">Dr. Mohammed Hamman Barka</p>
                  <p className="text-gray-400">📞 08065486735 / 08024220267</p>
                  <a href="mailto:tanimubarka97@yahoo.com" className="text-[#d4af37] hover:underline">
                    tanimubarka97@yahoo.com
                  </a>
                </div>
              </div>
              <div className="flex items-start space-x-2 pt-1 border-t border-[#1e4d2b]">
                <Mail size={16} className="text-[#d4af37] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-white">Manuscript Submissions</p>
                  <a href="mailto:wakajes1986@gmail.com" className="text-[#d4af37] hover:underline">
                    wakajes1986@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Navigation Links */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-base font-bold text-white border-b border-[#d4af37] pb-1 mb-3 inline-block">
                Journal
              </h4>
              <ul className="space-y-2 text-xs">
                {mainLinks.map((link) => (
                  <li key={link.name}>
                    <Link to={link.href} className="hover:text-[#d4af37] transition">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-base font-bold text-white border-b border-[#d4af37] pb-1 mb-3 inline-block">
                Authors
              </h4>
              <ul className="space-y-2 text-xs">
                {authorLinks.map((link) => (
                  <li key={link.name}>
                    <Link to={link.href} className="hover:text-[#d4af37] transition">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 4. Publisher Address */}
          <div className="space-y-3">
            <h4 className="text-base font-bold text-white border-b border-[#d4af37] pb-1 mb-3 inline-block">
              Publisher Address
            </h4>
            <div className="flex items-start space-x-2 text-xs">
              <MapPin size={18} className="text-[#d4af37] mt-0.5 flex-shrink-0" />
              <p className="text-gray-300 leading-relaxed">
                <strong className="text-white">College of Education, Waka-Biu</strong><br />
                P.M.B. 1502, Biu,<br />
                Borno State, Nigeria
              </p>
            </div>
            <div className="pt-3 border-t border-[#1e4d2b]">
              <p className="text-xs text-gray-400">
                Official Web: <a href="https://www.wakajes.com" target="_blank" rel="noreferrer" className="text-[#d4af37] hover:underline">www.wakajes.com</a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-400 space-y-2 md:space-y-0">
          <p>
            &copy; {currentYear} Waka Journal of Educational Studies (WAKAJES). All rights reserved.
          </p>
          <p>
            College of Education, Waka-Biu, Borno State
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
