// // src/components/Header.tsx

// "use client"; // Necessary because it includes the interactive DropdownNav component

// import Link from "next/link";
// import Image from "next/image";
// import DropdownNav from "./DropDownNav"; // Import the new component

// export default function Header() {
//   const paperSubmissionLinks = [
//     { name: "Online Submission", href: "/paper-submission" },
//     { name: "Call for Paper", href: "/paper-submission" },
//     { name: "Indexing", href: "/indexing" },
//     { name: "Author Section", href: "/author-section" },
//   ];

//   return (
//     <header className="sticky top-0 z-50 bg-gray-900 text-white shadow-lg">
//       <div className="max-w-7xl mx-auto flex items-center justify-between pt-4 pr-4">
//         {/* Logo and Branding (Left side) */}
//         <Link href="/" className="flex items-center space-x-2">
//           {/* LOGO */}
//           <Image
//             src="/images/logo.png"
//             alt="IJASSW"
//             width={60} // Adjust width to fit your design
//             height={60}
//             className="object-contain"
//           />
//           <span className="text-xs">
//             International Journal of Arts and Social Sciences in the world
//           </span>
//         </Link>

//         {/* Navigation Links (Right side) */}
//         <nav className="hidden md:flex items-center space-x-2">
//           {/* 1. Home */}
//           <Link href="/" className="py-2 px-3 hover:text-blue-400">
//             Home
//           </Link>

//           {/* 2. Paper Submission Dropdown */}
//           <DropdownNav title="Paper Submission" links={paperSubmissionLinks} />

//           {/* 3. Registration */}
//           <Link href="/registration" className="py-2 px-3 hover:text-blue-400">
//             Registration
//           </Link>

//           {/* 4. Editorial Board */}
//           <Link
//             href="/editorial-board"
//             className="py-2 px-3 hover:text-blue-400"
//           >
//             Editorial Board
//           </Link>

//           {/* 5. Current Edition */}
//           <Link
//             href="/current-edition"
//             className="py-2 px-3 hover:text-blue-400"
//           >
//             Current Edition
//           </Link>

//           {/* 6. Contact Us */}
//           <Link href="/contact-us" className="py-2 px-3 hover:text-blue-400">
//             Contact Us
//           </Link>
//         </nav>

//         {/* You may also include the Search Bar and ISSN/Impact Factor text here */}
//       </div>
//       {/* to the right */}
//       <div className="justify-end text-right pr-15 pt-0">ISSN: 2992-2879</div>
//     </header>
//   );
// }
// src/components/Header.tsx

"use client";

import Link from "next/link";
import Image from "next/image";
import DropdownNav from "./DropDownNav";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // Icons for menu open/close

// Helper function to render the navigation links (reused for desktop and mobile)
// 🎯 FIXED: Defined OUTSIDE of the Header component to avoid "component created during render" error.
const NavLinks = ({
  paperSubmissionLinks,
  closeMenu,
}: {
  paperSubmissionLinks: any;
  closeMenu: () => void;
}) => (
  <>
    {/* 1. Home */}
    <Link
      href="/"
      className="py-2 px-3 hover:text-blue-400 block md:inline-block"
      onClick={closeMenu}
    >
      Home
    </Link>

    {/* 2. Paper Submission Dropdown */}
    {/* DropdownNav should manage its own state for closing */}
    <DropdownNav title="Paper Submission" links={paperSubmissionLinks} />

    {/* 3. Registration */}
    <Link
      href="/registration"
      className="py-2 px-3 hover:text-blue-400 block md:inline-block"
      onClick={closeMenu}
    >
      Registration
    </Link>

    {/* 4. Editorial Board */}
    <Link
      href="/editorial-board"
      className="py-2 px-3 hover:text-blue-400 block md:inline-block"
      onClick={closeMenu}
    >
      Editorial Board
    </Link>

    {/* 5. Current Edition */}
    <Link
      href="/current-edition"
      className="py-2 px-3 hover:text-blue-400 block md:inline-block"
      onClick={closeMenu}
    >
      Current Edition
    </Link>

    {/* 6. Contact Us */}
    <Link
      href="/contact-us"
      className="py-2 px-3 hover:text-blue-400 block md:inline-block"
      onClick={closeMenu}
    >
      Contact Us
    </Link>
  </>
);

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  const paperSubmissionLinks = [
    { name: "Online Submission", href: "/paper-submission" },
    { name: "Call for Paper", href: "/paper-submission" },
    { name: "Indexing", href: "/indexing" },
    { name: "Author Section", href: "/author-section" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-gray-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        {" "}
        {/* Adjusted padding */}
        {/* Logo and Branding (Left side) */}
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/images/logo.png"
            alt="IJASSW"
            width={60}
            height={60}
            className="object-contain"
          />
          <span className="text-xs max-w-[200px] leading-tight hidden sm:block">
            International Journal of Arts and Social Sciences in the world
          </span>
        </Link>
        {/* Navigation Links (Right side) - Hidden on small screens */}
        <nav className="hidden md:flex items-center space-x-2">
          <NavLinks
            paperSubmissionLinks={paperSubmissionLinks}
            closeMenu={closeMenu}
          />
        </nav>
        {/* Mobile Menu Button (Visible on small screens) */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Navigation Container (Appears conditionally below header) */}
      <div
        className={`md:hidden bg-gray-800 transition-all duration-300 ease-in-out overflow-hidden ${
          isMenuOpen ? "max-h-96 opacity-100 py-2" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col px-4 space-y-1">
          <NavLinks
            paperSubmissionLinks={paperSubmissionLinks}
            closeMenu={closeMenu}
          />
        </nav>
      </div>

      {/* ISSN Display (Always visible, but adjust positioning) */}
      <div className="max-w-7xl mx-auto text-xs text-right text-gray-400 pr-4 pb-2 md:pb-3">
        ISSN: 2992-2879
      </div>
    </header>
  );
}
