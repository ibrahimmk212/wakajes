import React, { useState } from "react";
import IndexingCard from "../../components/IndexingCard";
import { Link } from "react-router-dom";
import { ShieldCheck, Globe, Search } from "lucide-react";

const indexingData = [
  {
    category: "Academic Discovery & Metadata Partners",
    items: [
      {
        name: "Google Scholar",
        logoSrc: "",
        description: "Indexed for worldwide academic discoverability, citations, and search indexing.",
        link: "https://scholar.google.com",
      },
      {
        name: "CrossRef & DOI System",
        logoSrc: "",
        description: "Official Digital Object Identifier (DOI) assignment for published articles.",
        link: "https://www.crossref.org",
      },
      {
        name: "Open Access Repositories",
        logoSrc: "",
        description: "Full text open access distribution under Creative Commons licensing.",
        link: "/author-section",
      },
      {
        name: "College Library Archives",
        logoSrc: "",
        description: "College of Education, Waka-Biu, Borno State central library repository.",
        link: "https://www.wakajes.com",
      },
    ],
  },
];

export default function IndexingPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = indexingData
    .map((section) => ({
      ...section,
      items: section.items.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }))
    .filter((section) => section.items.length > 0);

  return (
    <div className="bg-[#f8faf8] min-h-screen pb-20">
      <div className="relative bg-[#133e27] py-16 text-center text-white border-b-4 border-[#d4af37]">
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <span className="text-xs font-bold uppercase tracking-widest text-[#d4af37] bg-[#1e4d2b] px-3 py-1 rounded-full border border-[#d4af37]/40">
            Visibility & Archiving
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mt-3 mb-4">
            WAKAJES Indexing & Abstracting
          </h1>
          <p className="text-sm md:text-base text-gray-200 mb-8 max-w-2xl mx-auto">
            Waka Journal of Educational Studies (ISSN: 1597-5118) is committed to high visibility, global accessibility, and permanent digital archiving for all published papers.
          </p>

          <div className="max-w-md mx-auto relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search indexing partners..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-3 pl-11 pr-6 rounded-full text-white bg-[#081c15] border border-[#d4af37] shadow-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37] text-sm"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-12 space-y-12">
        {filteredData.length > 0 ? (
          filteredData.map((section, idx) => (
            <section key={idx}>
              <div className="flex items-center mb-6">
                <h2 className="text-xl md:text-2xl font-bold text-[#133e27] mr-4">
                  {section.category}
                </h2>
                <div className="flex-grow h-px bg-gray-200"></div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {section.items.map((item) => (
                  <IndexingCard
                    key={item.name}
                    name={item.name}
                    logoSrc={item.logoSrc}
                    description={item.description}
                    verificationLink={item.link}
                  />
                ))}
              </div>
            </section>
          ))
        ) : (
          <div className="text-center py-20 text-gray-500">
            <p className="text-lg">No indexing partners found matching "{searchTerm}"</p>
          </div>
        )}
      </div>

      <div className="max-w-4xl mx-auto px-4 mt-16">
        <div className="bg-white border-2 border-[#1e4d2b]/20 rounded-2xl p-8 text-center shadow-md">
          <ShieldCheck size={40} className="mx-auto text-[#1e4d2b] mb-3" />
          <h3 className="text-xl font-bold text-[#133e27] mb-2">
            Indexing & Archiving Inquiries
          </h3>
          <p className="text-gray-600 text-sm max-w-xl mx-auto mb-6">
            WAKAJES welcomes collaboration with university libraries, indexing databases, and repository platforms. Contact the editorial office for indexing requests.
          </p>
          <Link
            to="/contact-us"
            className="inline-block bg-[#133e27] text-white font-bold py-2.5 px-6 rounded-lg hover:bg-[#1e4d2b] transition text-sm"
          >
            Contact Editorial Office
          </Link>
        </div>
      </div>
    </div>
  );
}
