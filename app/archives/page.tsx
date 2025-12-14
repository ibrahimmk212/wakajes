/* eslint-disable @typescript-eslint/no-explicit-any */
// app/archives/page.tsx (Server Component)
import { getJournalArchives } from "@/lib/data";
import Link from "next/link";
import { Archive, Calendar, FileText, BookOpen } from "lucide-react";

// Helper function to group issues by Volume
const groupIssuesByVolume = (issues: any) => {
  return issues.reduce((acc: any, issue: any) => {
    // Grouping key includes year for clarity
    const key = `Volume ${issue.volume} (${issue.year})`;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(issue);
    return acc;
  }, {});
};

export default async function ArchivesPage() {
  // Server-side data fetching
  const allIssues = await getJournalArchives();
  const groupedIssues = groupIssuesByVolume(allIssues);

  // Sort keys (Volume 8, Volume 7, etc.) in reverse order to show newest first
  const sortedVolumes = Object.keys(groupedIssues).sort().reverse();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-10 bg-white p-8 rounded-xl shadow-lg border-t-4 border-blue-600">
          <h1 className="text-4xl font-extrabold text-blue-900 mb-2 flex items-center justify-center">
            <Archive size={36} className="mr-3 text-blue-500" /> Journal
            Archives
          </h1>
          <p className="text-lg text-gray-600">
            Browse and access all past issues published by IJASSW, organized by
            Volume and Year.
          </p>
        </div>

        {/* Archives Content - Grouped by Volume */}
        <div className="space-y-10">
          {sortedVolumes.map((volumeTitle) => {
            const issues = groupedIssues[volumeTitle];

            return (
              <section
                key={volumeTitle}
                className="bg-white p-6 rounded-xl shadow-md"
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
                  {volumeTitle}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {issues.map((issue: any) => (
                    // Dynamic link to the specific issue content page
                    // The structure below assumes you create a dynamic route: app/archives/[slug]/page.tsx
                    <Link
                      key={issue.id}
                      href={`/archives/v${issue.volume}i${issue.issue}`}
                      className="block p-5 border border-gray-100 rounded-lg bg-gray-50 hover:bg-blue-50 hover:shadow-lg transition duration-300 group"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-xl font-semibold text-blue-800 group-hover:text-blue-900 flex items-center">
                          <BookOpen size={20} className="mr-2" /> Issue{" "}
                          {issue.issue}
                        </h3>
                        {/* Differentiate the current issue from the archives */}
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
