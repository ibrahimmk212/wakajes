import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Archive, Calendar, FileText, BookOpen } from "lucide-react";
import { getJournalArchives } from "../../lib/data";

const groupIssuesByVolume = (issues: any[]) => {
  return issues.reduce((acc: any, issue: any) => {
    const key = `Volume ${issue.volume} (${issue.year})`;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(issue);
    return acc;
  }, {});
};

export default function ArchivesPage() {
  const [allIssues, setAllIssues] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getJournalArchives().then((data) => {
      setAllIssues(data);
      setLoading(false);
    });
  }, []);

  const groupedIssues = groupIssuesByVolume(allIssues);
  const sortedVolumes = Object.keys(groupedIssues).sort().reverse();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading archives...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10 bg-white p-8 rounded-xl shadow-lg border-t-4 border-blue-600">
          <h1 className="text-4xl font-extrabold text-blue-900 mb-2 flex items-center justify-center">
            <Archive size={36} className="mr-3 text-blue-500" /> Journal Archives
          </h1>
          <p className="text-lg text-gray-600">
            Browse and access all past issues published by IJASSW, organized by Volume and Year.
          </p>
        </div>

        <div className="space-y-10">
          {sortedVolumes.map((volumeTitle) => {
            const issues = groupedIssues[volumeTitle];

            return (
              <section key={volumeTitle} className="bg-white p-6 rounded-xl shadow-md">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
                  {volumeTitle}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {issues.map((issue: any) => (
                    <Link
                      key={issue.id}
                      to={`/current-edition`}
                      className="block p-5 border border-gray-100 rounded-lg bg-gray-50 hover:bg-blue-50 hover:shadow-lg transition duration-300 group"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-xl font-semibold text-blue-800 group-hover:text-blue-900 flex items-center">
                          <BookOpen size={20} className="mr-2" /> Issue {issue.issue}
                        </h3>
                        {issue.id === 10 && (
                          <span className="px-3 py-1 text-xs font-bold rounded-full bg-green-500 text-white">
                            Current
                          </span>
                        )}
                      </div>

                      <div className="space-y-1 text-sm text-gray-600">
                        <p className="flex items-center">
                          <Calendar size={14} className="mr-2 text-gray-400" />
                          Published: {issue.publicationDate}
                        </p>
                        <p className="flex items-center">
                          <FileText size={14} className="mr-2 text-gray-400" />
                          {issue.articleCount} Articles
                        </p>
                      </div>
                      <span className="mt-3 block text-blue-600 font-medium group-hover:underline text-sm">
                        View Issue Details & Articles &rarr;
                      </span>
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        {allIssues.length === 0 && (
          <div className="text-center p-20 text-gray-500 bg-white rounded-xl shadow-lg">
            <p className="text-xl">No past issues found in the archive.</p>
          </div>
        )}
      </div>
    </div>
  );
}
