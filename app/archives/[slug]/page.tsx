// app/archives/[slug]/page.tsx (Server Component)
import { getIssueBySlug } from "@/lib/data";
import ArticleListItem from "@/components/ArticleListItem";
import { BookOpen, Calendar, Layers, ArrowLeft } from "lucide-react";
import Link from "next/link";

// Define the component props based on the dynamic segment name
interface IssuePageProps {
  params: {
    slug: string; // e.g., 'v8i2'
  };
}

export default async function DynamicJournalIssuePage({
  params,
}: IssuePageProps) {
  // Server-side data fetching using the slug
  const issueData = await getIssueBySlug(params.slug);

  if (!issueData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
        <div className="text-center bg-white p-10 rounded-xl shadow-lg">
          <h1 className="text-3xl font-bold text-red-600 mb-4">
            Issue Not Found
          </h1>
          <p className="text-lg text-gray-600">
            The requested journal issue ({params.slug}) could not be located in
            our archives.
          </p>
          <Link
            href="/archives"
            className="mt-6 inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            <ArrowLeft size={16} className="mr-2" /> Return to Archives
          </Link>
        </div>
      </div>
    );
  }

  const title = `Volume ${issueData.volume}, Issue ${issueData.issue} (${issueData.year})`;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Back to Archives Link */}
        <Link
          href="/archives"
          className="mb-6 inline-flex items-center text-gray-600 hover:text-blue-600 transition"
        >
          <ArrowLeft size={18} className="mr-2" /> Back to All Archives
        </Link>

        {/* Issue Header */}
        <div className="bg-white border-l-4 border-blue-600 p-8 rounded-xl shadow-xl mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-1 flex items-center">
            <BookOpen size={36} className="mr-3 text-blue-600" /> Journal Issue
            Details
          </h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">{title}</h2>

          <div className="flex items-center space-x-6 text-sm text-gray-500 pt-4 border-t">
            <p className="flex items-center">
              <Layers size={16} className="mr-1" /> Volume: {issueData.volume}
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
              <p>This issue contains no published articles.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
