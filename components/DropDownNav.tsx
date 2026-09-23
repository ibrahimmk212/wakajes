import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronUp } from "lucide-react";

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
      <button className="flex items-center space-x-1 py-2 px-3 text-white hover:text-[#d4af37] font-medium transition cursor-pointer">
        <span>{title}</span>
        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-0 w-52 bg-[#081c15] border border-[#1e4d2b] rounded-lg shadow-xl py-2 z-30">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2 text-sm text-gray-200 hover:text-[#d4af37] hover:bg-[#133e27] transition"
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
