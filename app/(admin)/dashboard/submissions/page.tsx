// app/(admin)/dashboard/submissions/page.tsx (Server Component)
import { getAllSubmissions } from "@/lib/admin-data";
import SubmissionTable from "@/components/admin/SubmissionTable";

export default async function AdminSubmissionsPage() {
  // Server-side fetching of all submissions
  const submissions = await getAllSubmissions();

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">
        Manuscript Submissions
      </h1>
      <p className="text-gray-600">
        Manage the peer-review workflow, assign reviewers, and update submission
        statuses.
      </p>

      <SubmissionTable initialSubmissions={submissions} />
    </div>
  );
}
