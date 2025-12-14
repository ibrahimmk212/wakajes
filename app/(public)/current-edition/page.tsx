import { getCurrentIssue } from "@/lib/data";
import ArticleListItem from "@/components/ArticleListItem";
import { Calendar, Layers, BookOpen } from "lucide-react";
import Link from "next/link";

// Import the specific Next.js Metadata type
import type { Metadata } from "next";

// 🎯 PAGE-SPECIFIC METADATA SETUP
export async function generateMetadata(): Promise<Metadata> {
  const issueData = await getCurrentIssue();

  const title = `Current Edition: Volume ${issueData.volume}, Issue ${issueData.issue} (${issueData.year})`;
  const description = `Read the latest articles from the International Journal of Arts and Social Sciences in the World (IJASSW), published ${issueData.publicationDate}. Includes research on ${issueData.articles[0]?.title} and more.`;

  return {
    title: title, // This uses the template defined in layout.tsx: "[title] | IJASSW"
    description: description,
    openGraph: {
      title: title,
      description: description,
      url: `https://www.ijassw-journal.com/current-edition`,
    },
    // Optionally, add a canonical link if you use different URLs for the same content
    // canonical: `https://www.ijassw-journal.com/current-edition`,
  };
}

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
