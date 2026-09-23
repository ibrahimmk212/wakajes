import { supabase, isSupabaseConfigured } from "./supabaseClient";

export interface Submission {
  id: number | string;
  paperRef: string;
  title: string;
  authorName: string;
  status:
    | "New"
    | "Under Review"
    | "Minor Revision"
    | "Major Revision"
    | "Accepted"
    | "Rejected";
  submittedDate: string;
  fileUrl: string;
  reviewer1?: string;
  reviewer2?: string;
}

export async function getAllSubmissions(): Promise<Submission[]> {
  try {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from("submissions")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && Array.isArray(data)) {
        return data.map((sub: any, idx: number) => ({
          id: sub.id || idx + 1,
          paperRef: sub.paper_ref || `WAKAJES-2026-${idx + 100}`,
          title: sub.title,
          authorName: sub.authors,
          status: sub.status || "New",
          submittedDate: new Date(sub.created_at || Date.now())
            .toISOString()
            .split("T")[0],
          fileUrl: sub.manuscript_url || "#",
        }));
      }
    }

    // Try Express backend fallback if available
    const res = await fetch("/api/admin/submissions");
    const data = await res.json();
    if (data.success && Array.isArray(data.submissions)) {
      return data.submissions.map((sub: any, idx: number) => ({
        id: idx + 1,
        paperRef: sub.paperReferenceNumber || `WAKAJES-${sub.id.slice(0, 6)}`,
        title: sub.title,
        authorName: sub.authors,
        status: sub.status || "New",
        submittedDate: new Date(sub.createdAt).toISOString().split("T")[0],
        fileUrl: sub.manuscriptUrl || "#",
      }));
    }
  } catch (error) {
    console.error("Fetch submissions error:", error);
  }
  return [];
}

export async function getAllBoardMembers() {
  return [
    {
      id: 1,
      name: "Dr. Mercy B. Wakawa",
      role: "Editor-in-Chief",
      email: "wakajes1986@gmail.com",
      active: true,
      joinedDate: "2020-01-01",
    },
    {
      id: 2,
      name: "Dr. Mohammed Hamman Barka",
      role: "Secretary (Ag)",
      email: "tanimubarka97@yahoo.com",
      active: true,
      joinedDate: "2020-01-01",
    },
    {
      id: 3,
      name: "Dr. Habib Hassan",
      role: "Editorial Member",
      email: "info@wakajes.com",
      active: true,
      joinedDate: "2021-05-15",
    },
    {
      id: 4,
      name: "Mr. Mohammed Y. Tong",
      role: "Editorial Member",
      email: "info@wakajes.com",
      active: true,
      joinedDate: "2021-05-15",
    },
    {
      id: 5,
      name: "Mr. James B. Ayuba",
      role: "Editorial Member",
      email: "info@wakajes.com",
      active: true,
      joinedDate: "2021-05-15",
    },
  ];
}

export interface JournalMetrics {
  totalSubmissionsYTD: number;
  activeSubmissions: number;
  acceptedRate: number;
  averageReviewTimeDays: number;
  reviewersCount: number;
  submissionsByMonth: { month: string; count: number }[];
  statusDistribution: { status: string; count: number }[];
}

export async function JournalMetrics(): Promise<JournalMetrics> {
  return {
    totalSubmissionsYTD: 0,
    activeSubmissions: 0,
    acceptedRate: 0,
    averageReviewTimeDays: 14,
    reviewersCount: 5,
    submissionsByMonth: [],
    statusDistribution: [],
  };
}
