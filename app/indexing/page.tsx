// app/indexing/page.tsx
"use client"; // Using client for the search functionality

import React, { useState } from "react";
import IndexingCard from "@/components/IndexingCard";
import Image from "next/image";

// Sample Data - You would replace 'logoSrc' with your actual image paths
const indexingData = [
  {
    category: "Major Global Databases",
    items: [
      {
        name: "Google Scholar",
        logoSrc: "/logos/google-scholar.png",
        description: "The world's largest academic search engine.",
        link: "https://scholar.google.com",
      },
      {
        name: "CrossRef",
        logoSrc: "/logos/crossref.png",
        description: "Official DOI registration agency for scholarly content.",
        link: "#",
      },
      {
        name: "DOAJ",
        logoSrc: "/logos/doaj.png",
        description: "Directory of Open Access Journals (Pending).",
        link: "#",
      },
      {
        name: "EBSCO",
        logoSrc: "/logos/ebsco.png",
        description: "Leading provider of research databases.",
        link: "#",
      },
    ],
  },
  {
    category: "University Libraries & Archives",
    items: [
      {
        name: "WorldCat",
        logoSrc: "/logos/worldcat.png",
        description:
          "The world's largest network of library content and services.",
        link: "#",
      },
      {
        name: "Sherpa Romeo",
        logoSrc: "/logos/sherpa.png",
        description:
          "Online resource that aggregates publisher open access policies.",
        link: "#",
      },
      {
        name: "Harvard Library (Catalog)",
        logoSrc: "/logos/harvard.png",
        description: "Listed in the Harvard University library catalog.",
        link: "#",
      },
    ],
  },
  {
    category: "Technical & Scientific Indexes",
    items: [
      {
        name: "Academia.edu",
        logoSrc: "/logos/academia.png",
        description: "Platform for sharing research papers.",
        link: "#",
      },
      {
        name: "ResearchGate",
        logoSrc: "/logos/researchgate.png",
        description: "Professional network for scientists and researchers.",
        link: "#",
      },
      {
        name: "SSRN",
        logoSrc: "/logos/ssrn.png",
        description: "Social Science Research Network repository.",
        link: "#",
      },
    ],
  },
];

export default function IndexingPage() {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter logic
  const filteredData = indexingData
    .map((section) => ({
      ...section,
      items: section.items.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }))
    .filter((section) => section.items.length > 0);

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* 1. Page Header */}
      <div className="relative h-96 flex items-center justify-center text-center text-white bg-blue-900 overflow-hidden">
        <Image
          src="/images/index-bg-banner.png" //used for the hero section background
          alt="Call for Papers"
          layout="fill"
          objectFit="cover"
          quality={100}
          className="opacity-50"
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-white mb-4">
            Indexing & Abstracting
          </h1>
          <p className="text-lg text-white mb-8">
            IJASSW is committed to ensuring that your research is discoverable,
            accessible, and cited globally. Our journal is indexed in the
            following prestigious databases and libraries.
          </p>

          {/* Search Bar */}
          <div className="max-w-lg mx-auto relative">
            <input
              type="text"
              placeholder="Search indexing partners (e.g., Google Scholar)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-3 px-6 rounded-full text-white border border-white shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-500/50"
            />
          </div>
        </div>
      </div>

      {/* 2. Indexing Lists */}
      <div className="max-w-7xl mx-auto px-4 mt-12 space-y-16">
        {filteredData.length > 0 ? (
          filteredData.map((section, idx) => (
            <section key={idx}>
              <div className="flex items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mr-4">
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
            <p className="text-xl">
              No indexing partners found matching &quot;{searchTerm}&quot;
            </p>
          </div>
        )}
      </div>

      {/* 3. Call to Action / Info Block */}
      <div className="max-w-4xl mx-auto px-4 mt-20">
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-8 text-center">
          <h3 className="text-xl font-bold text-blue-900 mb-2">
            Are you an Indexing Body?
          </h3>
          <p className="text-gray-700 mb-6">
            IJASSW welcomes partnerships with academic databases and libraries.
            If you wish to index our journal, please contact our editorial
            office.
          </p>
          <a
            href="/contact-us"
            className="inline-block bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-700 transition"
          >
            Contact Editorial Office
          </a>
        </div>
      </div>
    </div>
  );
}
