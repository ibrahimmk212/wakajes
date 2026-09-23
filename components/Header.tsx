import React, { useState } from "react";
import { Link } from "react-router-dom";
import DropdownNav from "./DropDownNav";
import { Menu, X, BookOpen } from "lucide-react";

const NavLinks = ({
  paperSubmissionLinks,
  closeMenu,
}: {
  paperSubmissionLinks: { name: string; href: string }[];
  closeMenu: () => void;
}) => (
  <>
    <Link
      to="/"
      className="py-2 px-3 text-white hover:text-[#d4af37] font-medium transition block md:inline-block"
      onClick={closeMenu}
    >
      Home
    </Link>

    <DropdownNav title="Paper Submission" links={paperSubmissionLinks} />

    <Link
      to="/registration"
      className="py-2 px-3 text-white hover:text-[#d4af37] font-medium transition block md:inline-block"
      onClick={closeMenu}
    >
      Registration & Fees
    </Link>

    <Link
      to="/editorial-board"
      className="py-2 px-3 text-white hover:text-[#d4af37] font-medium transition block md:inline-block"
      onClick={closeMenu}
    >
      Editorial Board
    </Link>

    <Link
      to="/current-edition"
      className="py-2 px-3 text-white hover:text-[#d4af37] font-medium transition block md:inline-block"
      onClick={closeMenu}
    >
      Current Edition
    </Link>

    <Link
      to="/contact-us"
      className="py-2 px-3 text-white hover:text-[#d4af37] font-medium transition block md:inline-block"
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
    { name: "Submission Guidelines", href: "/paper-submission#guidelines" },
    { name: "Indexing & Scope", href: "/indexing" },
    { name: "Author Guidelines", href: "/author-section" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#133e27] text-white shadow-xl border-b-2 border-[#d4af37]">
      {/* Top Banner Bar */}
      <div className="bg-[#081c15] text-[#d4af37] text-xs py-1 px-4 border-b border-[#1e4d2b]">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <span className="font-semibold tracking-wide">
            COLLEGE OF EDUCATION, WAKA-BIU, BORNO STATE
          </span>
          <div className="flex items-center space-x-4 font-mono">
            <span className="bg-[#1e4d2b] px-2 py-0.5 rounded text-white font-bold">
              Vol. 4 No. 3
            </span>
            <span>ISSN: 1597-5118</span>
          </div>
        </div>
      </div>

      {/* Main Header Content */}
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo and Branding */}
        <Link to="/" className="flex items-center space-x-3 group">
          <img
            src="/images/logo.png"
            alt="WAKAJES Logo"
            className="w-14 h-14 object-contain rounded-full bg-white p-1 shadow-md border-2 border-[#d4af37]"
          />
          <div>
            <span className="text-xl font-extrabold tracking-tight text-white block leading-tight group-hover:text-[#d4af37] transition">
              WAKAJES
            </span>
            <span className="text-xs text-gray-200 font-medium block max-w-xs leading-tight">
              Waka Journal of Educational Studies
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          <NavLinks
            paperSubmissionLinks={paperSubmissionLinks}
            closeMenu={closeMenu}
          />
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white p-2 cursor-pointer focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Navigation Dropdown */}
      <div
        className={`md:hidden bg-[#081c15] border-t border-[#1e4d2b] transition-all duration-300 ease-in-out overflow-hidden ${
          isMenuOpen ? "max-h-96 opacity-100 py-3" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col px-4 space-y-2">
          <NavLinks
            paperSubmissionLinks={paperSubmissionLinks}
            closeMenu={closeMenu}
          />
        </nav>
      </div>
    </header>
  );
}
