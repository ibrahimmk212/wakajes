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

export async function getAllBoardMembers() {
  // 🎯 Replace this with your actual secure database query to fetch board members!
  return [
    {
      id: 1,
      name: "Dr. Emily Carter",
      role: "Chief Editor",
      email: "e.carter@ijassw.com",
      active: true,
      joinedDate: "2018-01-01",
    },
    {
      id: 2,
      name: "Prof. Li Wei",
      role: "Associate Editor",
      email: "l.wei@ijassw.com",
      active: true,
      joinedDate: "2020-05-15",
    },
    {
      id: 3,
      name: "Dr. Omar Hassan",
      role: "Section Editor",
      email: "o.hassan@ijassw.com",
      active: true,
      joinedDate: "2021-09-10",
    },
    {
      id: 4,
      name: "Dr. Jane Davies",
      role: "Reviewer",
      email: "j.davies@ijassw.com",
      active: true,
      joinedDate: "2022-03-20",
    },
    {
      id: 5,
      name: "Mr. Ken Adams",
      role: "Reviewer",
      email: "k.adams@ijassw.com",
      active: false,
      joinedDate: "2023-11-01",
    },
  ];
}

interface JournalMetrics {
  totalSubmissionsYTD: number;
  activeSubmissions: number;
  acceptedRate: number; // percentage, e.g., 25.5
  averageReviewTimeDays: number;
  reviewersCount: number;
  submissionsByMonth: { month: string; count: number }[];
  statusDistribution: { status: string; count: number }[];
}

export async function JournalMetrics(): Promise<JournalMetrics> {
  // 🎯 Replace with actual secure database aggregation queries
  // !

  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    totalSubmissionsYTD: 185,
    activeSubmissions: 42,
    acceptedRate: 28.5,
    averageReviewTimeDays: 52,
    reviewersCount: 55,
    submissionsByMonth: [
      { month: "Jan", count: 12 },
      { month: "Feb", count: 15 },
      { month: "Mar", count: 20 },
      { month: "Apr", count: 18 },
      { month: "May", count: 17 },
      { month: "Jun", count: 22 },
      { month: "Jul", count: 15 },
      { month: "Aug", count: 16 },
      { month: "Sep", count: 10 },
      { month: "Oct", count: 20 },
      { month: "Nov", count: 15 },
      { month: "Dec", count: 5 }, // YTD total: 185
    ],
    statusDistribution: [
      { status: "In Review", count: 25 },
      { status: "Revision Requested", count: 8 },
      { status: "Awaiting Decision", count: 9 },
      { status: "Accepted (YTD)", count: 52 },
      { status: "Rejected (YTD)", count: 133 },
    ],
  };
}
