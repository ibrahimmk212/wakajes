// src/components/Footer.tsx

import Link from "next/link";

export default function Footer() {
  return (
    <>
      {/* 1. Main Content Footer */}
      <footer className="bg-blue-900 text-gray-300 py-10">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About GSJ */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">About IJASSW</h3>
            <p className="text-sm">
              The Journal of Arts and Social Sciences (IJASSW) is a
              multidisciplinary journal that publishes original research
              articles, review articles, and book reviews in the fields of arts,
              humanities, sciences, and social sciences. Our aim is to provide a
              platform for scholars and researchers to share their research
              findings and expertise with a global audience.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/call-for-papers" className="hover:text-white">
                  Call for Papers
                </Link>
              </li>
              <li>
                <Link href="/indexing" className="hover:text-white">
                  Indexing
                </Link>
              </li>
              {/* ... */}
            </ul>
          </div>

          {/* Connect with Us */}
          {/* ... */}

          {/* Copyright Row */}
          <div className="md:col-span-4 pt-6 border-t border-blue-800 text-center text-sm mt-4">
            © 2025 International Journal of Arts and Social Sciences. All Rights
            Reserved.
          </div>
        </div>
      </footer>

      {/* 2. Fixed Call-to-Action Bar (The "stick blue footer" you mentioned) */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-blue-600 text-white text-center py-2 text-sm">
        📢 Call for Papers: November 2025 Edition –{" "}
        <Link
          href="/paper-submission"
          className="font-bold underline hover:text-yellow-300"
        >
          Submit Your Paper Now
        </Link>
      </div>
    </>
  );
}
