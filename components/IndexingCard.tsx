// src/components/IndexingCard.tsx
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react"; // Ensure you have lucide-react installed or use text

interface IndexingCardProps {
  name: string;
  logoSrc: string;
  description: string;
  verificationLink: string;
}

const IndexingCard: React.FC<IndexingCardProps> = ({
  name,
  logoSrc,
  description,
  verificationLink,
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center group">
      {/* Logo Container */}
      <div className="h-24 w-full relative mb-4 flex items-center justify-center bg-gray-50 rounded-lg p-2 group-hover:bg-white transition">
        {/* Replace with Next/Image in production. Using a placeholder for now. */}
        {/* <Image src={logoSrc} alt={name} layout="fill" objectFit="contain" /> */}
        <span className="text-4xl font-bold text-gray-400">
          {name.charAt(0)}
        </span>
      </div>

      <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-blue-700 transition">
        {name}
      </h3>

      <p className="text-sm text-gray-500 mb-4 line-clamp-3">{description}</p>

      <Link
        href={verificationLink}
        target="_blank"
        className="mt-auto inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-800"
      >
        Verify Indexing <ExternalLink size={14} className="ml-1" />
      </Link>
    </div>
  );
};

export default IndexingCard;
