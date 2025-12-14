// app/(admin)/dashboard/board/page.tsx (Server Component)
import { getAllBoardMembers } from "@/lib/admin-data"; // New server-side function
import BoardMemberTable from "@/components/admin/BoardMemberTable";
import { Users } from "lucide-react";

// Conceptual Data Structure (Add to lib/admin-data.ts)
interface BoardMember {
  id: number;
  name: string;
  title: string;
  role: "Editorial Chief" | "Associate Editor" | "Section Editor" | "Reviewer";
  email: string;
  active: boolean;
  joinedDate: string;
}

export default async function AdminBoardManagementPage() {
  const members = await getAllBoardMembers();

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-800 flex items-center">
        <Users size={28} className="mr-2" /> Board & Reviewer Management
      </h1>
      <p className="text-gray-600">
        Manage the roles, access, and status of all editorial and review
        personnel.
      </p>

      <BoardMemberTable initialMembers={members} />
    </div>
  );
}
