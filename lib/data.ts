// lib/data.ts (Add this interface and function)

interface PublishedArticle {
  id: number;
  title: string;
  author: string;
  doi: string;
  pages: string; // e.g., 45-60
  abstract: string;
  pdfUrl: string; // Direct link to the full paper PDF
}

interface JournalIssue {
  issue: number;
  volume: number;
  year: number;
  publicationDate: string;
  articles: PublishedArticle[];
}

export async function getCurrentIssue(): Promise<JournalIssue> {
  // 🎯 Replace with actual database query to fetch the latest published issue!
  await new Promise((resolve) => setTimeout(resolve, 300));

  return {
    issue: 2,
    volume: 8,
    year: 2025,
    publicationDate: "December 20, 2025",
    articles: [
      {
        id: 1,
        title:
          "Exploring the Dynamics of Digital Nomadism and Global Labor Markets",
        author: "Dr. Emily V. Harrison",
        doi: "10.1234/ijassw.2025.v8i2.001",
        pages: "1-15",
        abstract:
          "This paper examines the rise of digital nomadism as a significant force reshaping global labor markets, focusing on its socioeconomic implications and policy challenges in host countries.",
        pdfUrl: "/articles/v8i2/article1.pdf",
      },
      {
        id: 2,
        title:
          "The Role of Indigenous Knowledge in Climate Change Adaptation Strategies in Southeast Asia",
        author: "Prof. Anjali Sharma and Ben K. Li",
        doi: "10.1234/ijassw.2025.v8i2.002",
        pages: "16-30",
        abstract:
          "A qualitative study analyzing how traditional ecological knowledge systems inform and enhance climate change resilience efforts in local communities across five nations.",
        pdfUrl: "/articles/v8i2/article2.pdf",
      },
      {
        id: 3,
        title:
          "Re-evaluating Post-Colonial Theory in Modern African Literature",
        author: "Dr. Chinedu Okafor",
        doi: "10.1234/ijassw.2025.v8i2.003",
        pages: "31-44",
        abstract:
          "The study offers a critical perspective on applying classic post-colonial frameworks to contemporary literary works from the continent, arguing for new theoretical lenses.",
        pdfUrl: "/articles/v8i2/article3.pdf",
      },
      // ... add more articles
    ],
  };
}

interface IssueSummary {
  id: number;
  issue: number;
  volume: number;
  year: number;
  publicationDate: string; // e.g., "June 30, 2024"
  articleCount: number;
}

export async function getJournalArchives(): Promise<IssueSummary[]> {
  // 🎯 Replace with actual database query to fetch summaries of all past issues!
  await new Promise((resolve) => setTimeout(resolve, 300));

  return [
    // Volume 8 (Newest)
    {
      id: 10,
      volume: 8,
      issue: 2,
      year: 2025,
      publicationDate: "Dec 20, 2025",
      articleCount: 12,
    }, // Current (for display consistency)
    {
      id: 9,
      volume: 8,
      issue: 1,
      year: 2025,
      publicationDate: "Jun 25, 2025",
      articleCount: 15,
    },
    // Volume 7
    {
      id: 8,
      volume: 7,
      issue: 2,
      year: 2024,
      publicationDate: "Dec 15, 2024",
      articleCount: 14,
    },
    {
      id: 7,
      volume: 7,
      issue: 1,
      year: 2024,
      publicationDate: "Jun 30, 2024",
      articleCount: 16,
    },
    // Volume 6
    {
      id: 6,
      volume: 6,
      issue: 2,
      year: 2023,
      publicationDate: "Dec 22, 2023",
      articleCount: 13,
    },
    {
      id: 5,
      volume: 6,
      issue: 1,
      year: 2023,
      publicationDate: "Jun 18, 2023",
      articleCount: 17,
    },
    // Volume 5 (Oldest)
    {
      id: 4,
      volume: 5,
      issue: 2,
      year: 2022,
      publicationDate: "Dec 10, 2022",
      articleCount: 11,
    },
    {
      id: 3,
      volume: 5,
      issue: 1,
      year: 2022,
      publicationDate: "Jun 28, 2022",
      articleCount: 19,
    },
  ];
}

export async function getIssueBySlug(
  slug: string
): Promise<JournalIssue | null> {
  // Determine Volume and Issue numbers from the slug format (e.g., 'v8i2')
  const match = slug.match(/v(\d+)i(\d+)/);
  if (!match) return null;

  const volume = parseInt(match[1]);
  const issue = parseInt(match[2]);

  // 🎯 INTEGRATION POINT: Replace this mock data logic with a database query:
  // await db.issues.findOne({ volume, issue }).populate('articles');

  // MOCK DATA: Return data based on the requested slug
  if (volume === 8 && issue === 1) {
    return {
      issue: 1,
      volume: 8,
      year: 2025,
      publicationDate: "June 25, 2025",
      articles: [
        {
          id: 201,
          title: "The Evolving Role of NGOs in Post-Conflict Reconstruction",
          author: "Dr. Hana Al-Farsi",
          doi: "10.1234/v8i1.001",
          pages: "1-18",
          abstract:
            "Focuses on the shifting mandates and funding structures of non-governmental organizations in stabilization efforts.",
          pdfUrl: "/articles/v8i1/article_a.pdf",
        },
        {
          id: 202,
          title: "Historical Linguistics and the Spread of Bantu Languages",
          author: "Prof. Mark E. Evans",
          doi: "10.1234/v8i1.002",
          pages: "19-35",
          abstract:
            "An analysis of phonological shifts across different Bantu language groups to map ancient migration routes.",
          pdfUrl: "/articles/v8i1/article_b.pdf",
        },
        {
          id: 203,
          title: "Urban Greening Policies and Social Equity",
          author: "Dr. C. Rodriguez",
          doi: "10.1234/v8i1.003",
          pages: "36-50",
          abstract:
            "Investigates whether urban renewal and green infrastructure projects inadvertently lead to gentrification.",
          pdfUrl: "/articles/v8i1/article_c.pdf",
        },
      ],
    };
  }
  // Add logic for other issues (v7i2, v7i1, etc.)

  // Default fallback
  return null;
}
