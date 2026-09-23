import React from "react";
import { ExternalLink } from "lucide-react";

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
      <div className="h-24 w-full relative mb-4 flex items-center justify-center bg-gray-50 rounded-lg p-2 group-hover:bg-white transition">
        {logoSrc ? (
          <img src={logoSrc} alt={name} className="max-h-full max-w-full object-contain" />
        ) : (
          <span className="text-4xl font-bold text-gray-400">{name.charAt(0)}</span>
        )}
      </div>

      <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-blue-700 transition">
        {name}
      </h3>

      <p className="text-sm text-gray-500 mb-4 line-clamp-3">{description}</p>

      <a
        href={verificationLink}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-800"
      >
        Verify Indexing <ExternalLink size={14} className="ml-1" />
      </a>
    </div>
  );
};

export default IndexingCard;
