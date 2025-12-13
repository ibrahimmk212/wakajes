// src/components/VolumeArchive.tsx
import React from "react";
import Link from "next/link";

interface Issue {
  issue: number;
  month: string;
}

interface VolumeArchiveProps {
  volume: number;
  year: number;
  issues: Issue[];
}

const VolumeArchive: React.FC<VolumeArchiveProps> = ({
  volume,
  year,
  issues,
}) => {
  return (
    <div className="border border-gray-300 rounded-lg p-6 shadow-md">
      <h2 className="text-xl font-bold text-blue-700 mb-4">
        Volume {volume}, {year} Editions
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {issues.map((issue) => (
          <div key={`${volume}-${issue.issue}`} className="text-sm">
            <Link
              // href={`/archive/${year}/${issue.issue}`}
              href={`#`}
              className="text-gray-700 hover:text-blue-500 hover:underline"
            >
              Vol {volume}, Issue {issue.issue}, {issue.month} {year}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
export default VolumeArchive;
