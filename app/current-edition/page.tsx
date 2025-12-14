// // app/current-edition/page.tsx
// import VolumeArchive from "@/components/VolumeArchive";

// // Example structure of archive data (fetched at build time/server-side in Next.js)
// const archiveData = [
//   {
//     volume: 13,
//     year: 2026,
//     issues: [
//       { issue: 6, month: "June" },
//       { issue: 5, month: "May" },
//       { issue: 4, month: "April" },
//       { issue: 3, month: "March" },
//       { issue: 2, month: "February" },
//       { issue: 1, month: "January" },

//       // ...
//     ],
//   },
//   {
//     volume: 12,
//     year: 2024,
//     issues: [
//       { issue: 12, month: "Dec" },
//       { issue: 11, month: "Nov" },
//       // ...
//     ],
//   },
//   // ... more volumes
// ];

// export default function CurrentEditionPage() {
//   return (
//     <div className="max-w-6xl mx-auto p-4 md:p-8">
//       <h1 className="text-3xl font-bold text-center mb-10">
//         All Published Editions
//       </h1>

//       <div className="space-y-10">
//         {archiveData.map((volume) => (
//           <VolumeArchive key={volume.volume} {...volume} />
//         ))}
//       </div>
//     </div>
//   );
// }
// app/current-edition/page.tsx (Server Component)
import { getCurrentIssue } from "@/lib/data";
import ArticleListItem from "@/components/ArticleListItem";
import { Calendar, Layers, BookOpen } from "lucide-react";
import Link from "next/link";

export default async function CurrentEditionPage() {
  // Server-side data fetching
  const issueData = await getCurrentIssue();

  const title = `Volume ${issueData.volume}, Issue ${issueData.issue}`;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Issue Header */}
        <div className="bg-blue-900 text-white p-8 rounded-xl shadow-xl mb-10">
          <h1 className="text-4xl font-extrabold mb-1 flex items-center">
            <BookOpen size={36} className="mr-3 text-blue-300" /> Current
            Edition
          </h1>
          <h2 className="text-2xl font-semibold text-blue-200 mb-4">{title}</h2>

          <div className="flex items-center space-x-6 text-sm text-blue-100">
            <p className="flex items-center">
              <Layers size={16} className="mr-1" /> Volume: {issueData.volume}
            </p>
            <p className="flex items-center">
              <Layers size={16} className="mr-1" /> Issue: {issueData.issue}
            </p>
            <p className="flex items-center">
              <Calendar size={16} className="mr-1" /> Published:{" "}
              {issueData.publicationDate}
            </p>
          </div>
        </div>

        {/* Article List */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-lg divide-y divide-gray-100">
          <h3 className="text-2xl font-bold text-gray-800 p-6 border-b">
            Articles in this Issue ({issueData.articles.length})
          </h3>

          {issueData.articles.map((article) => (
            <ArticleListItem key={article.id} {...article} />
          ))}

          {issueData.articles.length === 0 && (
            <div className="text-center p-12 text-gray-500">
              <p>No articles published in this current edition yet.</p>
            </div>
          )}
        </div>

        {/* Call to Action for Archives */}
        <div className="mt-10 text-center">
          <p className="text-lg text-gray-600 mb-4">
            Looking for older publications? Explore our complete collection of
            past issues.
          </p>
          <Link
            href="/archives"
            className="inline-block bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-blue-700 transition shadow-md"
          >
            View Journal Archives
          </Link>
        </div>
      </div>
    </div>
  );
}
