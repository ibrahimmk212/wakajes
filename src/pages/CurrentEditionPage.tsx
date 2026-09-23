import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BookOpen, Calendar, Layers } from "lucide-react";
import { getCurrentIssue } from "../../lib/data";
import ArticleListItem from "../../components/ArticleListItem";

export default function CurrentEditionPage() {
  const [issueData, setIssueData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCurrentIssue().then((data) => {
      setIssueData(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading current edition...</p>
      </div>
    );
  }

  if (!issueData || !issueData.articles || issueData.articles.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="max-w-3xl w-full bg-white border border-gray-200 rounded-xl shadow-lg p-8 text-center">
          <BookOpen size={48} className="mx-auto mb-4 text-blue-500" />
          <h1 className="text-3xl font-extrabold text-gray-800 mb-2">
            Current Edition Unavailable
          </h1>
          <p className="text-gray-600 mb-6">
            We are currently preparing the latest edition of the International
            Journal of Arts and Social Sciences in the World (IJASSW). Please
            check back soon for the newest research articles and publications.
          </p>
          <Link
            to="/archives"
            className="inline-block bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-blue-700 transition shadow-md"
          >
            Explore Journal Archives
          </Link>
        </div>
      </div>
    );
  }

  const title = `Volume ${issueData.volume}, Issue ${issueData.issue}`;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-blue-900 text-white p-8 rounded-xl shadow-xl mb-10">
          <h1 className="text-4xl font-extrabold mb-1 flex items-center">
            <BookOpen size={36} className="mr-3 text-blue-300" /> Current Edition
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
              <Calendar size={16} className="mr-1" /> Published: {issueData.publicationDate}
            </p>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl shadow-lg divide-y divide-gray-100">
          <h3 className="text-2xl font-bold text-gray-800 p-6 border-b">
            Articles in this Issue ({issueData.articles.length})
          </h3>

          {issueData.articles.map((article: any) => (
            <ArticleListItem key={article.id} {...article} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="text-lg text-gray-600 mb-4">
            Looking for older publications? Explore our complete collection of past issues.
          </p>
          <Link
            to="/archives"
            className="inline-block bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-blue-700 transition shadow-md"
          >
            View Journal Archives
          </Link>
        </div>
      </div>
    </div>
  );
}
