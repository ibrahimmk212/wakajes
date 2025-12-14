// lib/admin-data.ts (Add this interface and function)

interface Submission {
  id: number;
  paperRef: string; // e.g., IJASSW-2025-001
  title: string;
  authorName: string;
  status:
    | "New"
    | "Under Review"
    | "Minor Revision"
    | "Major Revision"
    | "Accepted"
    | "Rejected";
  submittedDate: string; // YYYY-MM-DD
  fileUrl: string;
  reviewer1?: string;
  reviewer2?: string;
}

export async function getAllSubmissions(): Promise<Submission[]> {
  // 🎯 Replace this with your actual secure database query to fetch ALL submissions!
  await new Promise((resolve) => setTimeout(resolve, 500));

  return [
    {
      id: 1,
      paperRef: "IJASSW-2025-001",
      title:
        "The Impact of Social Media on Political Polarization in Emerging Democracies",
      authorName: "Dr. Jane Smith",
      status: "New",
      submittedDate: "2025-12-01",
      fileUrl: "/admin/manuscripts/001.pdf",
    },
    {
      id: 2,
      paperRef: "IJASSW-2025-002",
      title: "A Qualitative Study of Art Therapy in Trauma Recovery",
      authorName: "Michael Brown",
      status: "Under Review",
      submittedDate: "2025-11-20",
      fileUrl: "/admin/manuscripts/002.pdf",
      reviewer1: "Prof. Chen",
      reviewer2: "Dr. Lopez",
    },
    {
      id: 3,
      paperRef: "IJASSW-2025-003",
      title: "Economic Analysis of Universal Basic Income Pilots",
      authorName: "Prof. David Lee",
      status: "Accepted",
      submittedDate: "2025-10-15",
      fileUrl: "/admin/manuscripts/003.pdf",
    },
    {
      id: 4,
      paperRef: "IJASSW-2025-004",
      title: "Rethinking Urban Planning in Post-Industrial Cities",
      authorName: "Sara Velez",
      status: "Minor Revision",
      submittedDate: "2025-12-05",
      fileUrl: "/admin/manuscripts/004.pdf",
      reviewer1: "Dr. Kulkarni",
    },
    {
      id: 5,
      paperRef: "IJASSW-2025-005",
      title: "Historical Context of Global Health Policy Failures",
      authorName: "Alex Johnson",
      status: "Rejected",
      submittedDate: "2025-11-10",
      fileUrl: "/admin/manuscripts/005.pdf",
    },
    // ... more data
  ];
}
