import React, { useEffect, useState } from "react";
import SubmissionTable from "../../../components/admin/SubmissionTable";
import { getAllSubmissions } from "../../../lib/admin-data";

export default function SubmissionsPage() {
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllSubmissions().then((data) => {
      setSubmissions(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div className="p-4 text-gray-500">Loading submissions...</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Submissions Management</h1>
      <SubmissionTable initialSubmissions={submissions} />
    </div>
  );
}
