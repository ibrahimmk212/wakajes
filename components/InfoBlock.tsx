// src/components/InfoBlock.tsx
import React from "react";

interface InfoBlockProps {
  title: string;
  content: string;
}

const InfoBlock: React.FC<InfoBlockProps> = ({ title, content }) => {
  return (
    <div className="mb-8 p-6 border border-gray-200 rounded-lg shadow-sm">
      <h3 className="text-xl font-bold text-blue-700 mb-2">{title}</h3>
      <p className="text-gray-700">{content}</p>
    </div>
  );
};
export default InfoBlock;
