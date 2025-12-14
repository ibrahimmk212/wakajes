// // src/components/Footer.tsx
// src/components/Footer.tsx
"use client";
import React from "react";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  BookOpen,
  FileText,
  ArrowUp,
  Send,
} from "lucide-react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  // Define navigation groups
  const mainLinks = [
    { name: "Current Edition", href: "/current-edition" },
    { name: "Archives", href: "/archives" },
    { name: "Editorial Board", href: "/editorial-board" },
    { name: "Indexing", href: "/indexing" },
  ];

  const authorLinks = [
    { name: "Author Guidelines", href: "/author-section" },
    { name: "Paper Submission", href: "/submission" },
    { name: "Article Processing Fee", href: "/registration" },
    { name: "Reviewer Guide", href: "/reviewer-guide" }, // Assuming this page exists
  ];

  const legalLinks = [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Use", href: "/terms" },
    { name: "License Information", href: "/license" },
  ];

  return (
    <footer className="bg-gray-800 text-gray-300 border-t border-blue-900 mt-12">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Top Section: Logo, Quick Action, and Newsletter */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 border-b border-gray-700 pb-8 mb-8">
          {/* 1. Brand/Mission Statement */}
          <div className="md:col-span-1 space-y-4">
            <Link
              href="/"
              className="text-2xl font-extrabold text-white flex items-center"
            >
              <BookOpen size={28} className="mr-2 text-blue-400" /> IJASSW
            </Link>
            <p className="text-sm">
              The Journal of Arts and Social Sciences (IJASSW) is a
              multidisciplinary journal that publishes original research
              articles, review articles, and book reviews in the fields of arts,
              humanities, sciences, and social sciences. Our aim is to provide a
              platform for scholars and researchers to share their research
              findings and expertise with a global audience.
            </p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center text-sm text-blue-400 hover:text-blue-300 transition"
            >
              <ArrowUp size={16} className="mr-1" /> Back to Top
            </button>
          </div>

          {/* 2. Contact Information */}
          <div className="space-y-3">
            <h4 className="text-lg font-semibold text-white border-b border-blue-600 pb-1 mb-3">
              Contact Us
            </h4>
            <div className="flex items-start space-x-2">
              <Mail size={16} className="mt-1 text-blue-400 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold">Editorial Office</p>
                <a
                  href="mailto:ijassw@gmail.com"
                  className="text-sm hover:text-white transition"
                >
                  ijassw@gmail.com
                </a>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <FileText
                size={16}
                className="mt-1 text-blue-400 flex-shrink-0"
              />
              <div>
                <p className="text-sm font-semibold">Submissions Help</p>
                <a
                  href="mailto:ijassw@gmail.com"
                  className="text-sm hover:text-white transition"
                >
                  ijassw@gmail.com
                </a>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <MapPin size={16} className="mt-1 text-blue-400 flex-shrink-0" />
              <p className="text-sm">Global Research Hub, Main Street, 10001</p>
            </div>
          </div>

          {/* 3. Navigation Links */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-lg font-semibold text-white border-b border-blue-600 pb-1 mb-3">
                Journal
              </h4>
              <ul className="space-y-2 text-sm">
                {mainLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="hover:text-white transition"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white border-b border-blue-600 pb-1 mb-3">
                Authors
              </h4>
              <ul className="space-y-2 text-sm">
                {authorLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="hover:text-white transition"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 4. Newsletter Signup (Placeholder) */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white border-b border-blue-600 pb-1 mb-3">
              Stay Updated
            </h4>
            <p className="text-sm">
              Subscribe to our newsletter for the latest issue alerts and news.
            </p>
            <div className="relative">
              <input
                type="email"
                placeholder="Your Email Address"
                className="w-full p-3 pr-10 rounded-lg text-sm text-gray-900 bg-gray-200 focus:ring-blue-500 focus:border-blue-500"
              />
              <button className="absolute right-0 top-0 h-full px-3 text-blue-600 hover:text-blue-800">
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright and Legal Links */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm pt-4 space-y-4 md:space-y-0">
          {/* Copyright */}
          <p>&copy; {currentYear} IJASSW. All rights reserved.</p>

          {/* Legal Links */}
          <div className="flex space-x-4">
            {legalLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="hover:text-white transition"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
// import Link from "next/link";

// export default function Footer() {
//   return (
//     <>
//       {/* 1. Main Content Footer */}
//       <footer className="bg-blue-900 text-gray-300 py-10">
//         <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
//           {/* About GSJ */}
//           <div>
//             <h3 className="text-xl font-bold text-white mb-4">About IJASSW</h3>
//             <p className="text-sm">
//               The Journal of Arts and Social Sciences (IJASSW) is a
//               multidisciplinary journal that publishes original research
//               articles, review articles, and book reviews in the fields of arts,
//               humanities, sciences, and social sciences. Our aim is to provide a
//               platform for scholars and researchers to share their research
//               findings and expertise with a global audience.
//             </p>
//           </div>

//           {/* Quick Links */}
//           <div>
//             <h3 className="text-xl font-bold text-white mb-4">Quick Links</h3>
//             <ul className="space-y-2 text-sm">
//               <li>
//                 <Link href="/call-for-papers" className="hover:text-white">
//                   Call for Papers
//                 </Link>
//               </li>
//               <li>
//                 <Link href="/indexing" className="hover:text-white">
//                   Indexing
//                 </Link>
//               </li>
//               {/* ... */}
//             </ul>
//           </div>

//           {/* Connect with Us */}
//           {/* ... */}

//           {/* Copyright Row */}
//           <div className="md:col-span-4 pt-6 border-t border-blue-800 text-center text-sm mt-4">
//             © 2025 International Journal of Arts and Social Sciences. All Rights
//             Reserved.
//           </div>
//         </div>
//       </footer>

//       {/* 2. Fixed Call-to-Action Bar (The "stick blue footer" you mentioned) */}
//       <div className="fixed bottom-0 left-0 right-0 z-50 bg-blue-600 text-white text-center py-2 text-sm">
//         📢 Call for Papers: November 2025 Edition –{" "}
//         <Link
//           href="/paper-submission"
//           className="font-bold underline hover:text-yellow-300"
//         >
//           Submit Your Paper Now
//         </Link>
//       </div>
//     </>
//   );
// }
