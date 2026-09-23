import React from "react";
import { Download, Link as LinkIcon, Users } from "lucide-react";

interface ArticleProps {
  title: string;
  author: string;
  doi: string;
  pages: string;
  abstract: string;
  pdfUrl: string;
}

const ArticleListItem: React.FC<ArticleProps> = ({
  title,
  author,
  doi,
  pages,
  abstract,
  pdfUrl,
}) => {
  return (
    <div className="bg-white border-b border-gray-100 p-6 hover:bg-gray-50 transition duration-300">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-xl font-bold text-blue-900 leading-snug pr-4">
          <a href={pdfUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
            {title}
          </a>
        </h3>

        <a
          href={pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 flex items-center bg-red-600 text-white text-sm font-semibold py-2 px-4 rounded-full hover:bg-red-700 transition"
        >
          <Download size={16} className="mr-1" /> PDF
        </a>
      </div>

      <div className="flex items-center space-x-4 text-sm text-gray-700 mb-3">
        <span className="flex items-center">
          <Users size={14} className="mr-1 text-gray-500" /> {author}
        </span>
        <span className="text-gray-400">|</span>
        <span className="font-mono">{pages} pages</span>
      </div>

      <p className="text-gray-600 mb-4 text-sm line-clamp-3">{abstract}</p>

      <div className="flex items-center text-xs text-gray-500">
        <LinkIcon size={14} className="mr-1 flex-shrink-0" />
        <span className="font-mono">DOI: {doi}</span>
      </div>
    </div>
  );
};

export default ArticleListItem;
