// src/components/DropdownNav.tsx

"use client"; // REQUIRED for handling state (isOpen) and user interaction (hover/click)

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp } from "lucide-react"; // Example icons

interface DropdownNavProps {
  title: string;
  links: { name: string; href: string }[];
}

const DropdownNav: React.FC<DropdownNavProps> = ({ title, links }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Dropdown Toggle Button/Link */}
      <button className="flex items-center space-x-1 py-2 px-3 hover:text-blue-400 transition">
        <span>{title}</span>
        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>

      {/* Dropdown Menu List */}
      {isOpen && (
        <div className="absolute left-0 mt-0 w-48 bg-gray-700 rounded-md shadow-lg py-1 z-20">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2 text-sm text-white hover:bg-gray-600 transition"
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownNav;
