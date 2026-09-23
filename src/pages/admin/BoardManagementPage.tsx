import React, { useEffect, useState } from "react";
import BoardMemberTable from "../../../components/admin/BoardMemberTable";
import { getAllBoardMembers } from "../../../lib/admin-data";

export default function BoardManagementPage() {
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllBoardMembers().then((data) => {
      setMembers(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div className="p-4 text-gray-500">Loading board members...</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Editorial Board Management</h1>
      <BoardMemberTable initialMembers={members} />
    </div>
  );
}
