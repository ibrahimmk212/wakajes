// src/components/Header.tsx

"use client"; // Necessary because it includes the interactive DropdownNav component

import Link from "next/link";
import Image from "next/image";
import DropdownNav from "./DropDownNav"; // Import the new component

export default function Header() {
  const paperSubmissionLinks = [
    { name: "Online Submission", href: "/paper-submission" },
    { name: "Call for Paper", href: "/paper-submission" },
    { name: "Indexing", href: "/indexing" },
    { name: "Author Section", href: "/author-section" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-gray-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
        {/* Logo and Branding (Left side) */}
        <Link href="/" className="flex items-center space-x-2">
          {/* LOGO */}
          <Image
            src="/images/logo.png"
            alt="IJASSW"
            width={60} // Adjust width to fit your design
            height={60}
            className="object-contain"
          />
          <span className="text-xs">
            International Journal of Arts and Social Sciences in the world
          </span>
        </Link>

        {/* Navigation Links (Right side) */}
        <nav className="hidden md:flex items-center space-x-2">
          {/* 1. Home */}
          <Link href="/" className="py-2 px-3 hover:text-blue-400">
            Home
          </Link>

          {/* 2. Paper Submission Dropdown */}
          <DropdownNav title="Paper Submission" links={paperSubmissionLinks} />

          {/* 3. Registration */}
          <Link href="/registration" className="py-2 px-3 hover:text-blue-400">
            Registration
          </Link>

          {/* 4. Editorial Board */}
          <Link
            href="/editorial-board"
            className="py-2 px-3 hover:text-blue-400"
          >
            Editorial Board
          </Link>

          {/* 5. Current Edition */}
          <Link
            href="/current-edition"
            className="py-2 px-3 hover:text-blue-400"
          >
            Current Edition
          </Link>

          {/* 6. Contact Us */}
          <Link href="/contact-us" className="py-2 px-3 hover:text-blue-400">
            Contact Us
          </Link>
        </nav>

        {/* You may also include the Search Bar and ISSN/Impact Factor text here */}
      </div>
    </header>
  );
}
