export interface PublishedArticle {
  id: number;
  title: string;
  author: string;
  doi: string;
  pages: string;
  abstract: string;
  pdfUrl: string;
}

export interface JournalIssue {
  issue: number;
  volume: number;
  year: number;
  publicationDate: string;
  articles: PublishedArticle[];
}

export async function getCurrentIssue(): Promise<JournalIssue> {
  return {
    issue: 3,
    volume: 4,
    year: 2026,
    publicationDate: "January 2027",
    articles: [],
  };
}

export interface IssueSummary {
  id: number;
  issue: number;
  volume: number;
  year: number;
  publicationDate: string;
  articleCount: number;
}

export async function getJournalArchives(): Promise<IssueSummary[]> {
  return [
    {
      id: 1,
      volume: 4,
      issue: 3,
      year: 2026,
      publicationDate: "Jan 2027 (Upcoming)",
      articleCount: 0,
    },
    {
      id: 2,
      volume: 4,
      issue: 2,
      year: 2026,
      publicationDate: "Jul 2026",
      articleCount: 12,
    },
    {
      id: 3,
      volume: 4,
      issue: 1,
      year: 2026,
      publicationDate: "Jan 2026",
      articleCount: 10,
    },
    {
      id: 4,
      volume: 3,
      issue: 2,
      year: 2025,
      publicationDate: "Dec 2025",
      articleCount: 14,
    },
    {
      id: 5,
      volume: 3,
      issue: 1,
      year: 2025,
      publicationDate: "Jun 2025",
      articleCount: 11,
    },
  ];
}

export async function getIssueBySlug(
  slug: string
): Promise<JournalIssue | null> {
  const match = slug.match(/v(\d+)i(\d+)/);
  if (!match) return null;

  return {
    issue: parseInt(match[2]),
    volume: parseInt(match[1]),
    year: 2026,
    publicationDate: "2026",
    articles: [],
  };
}
