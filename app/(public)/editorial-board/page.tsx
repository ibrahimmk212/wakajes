// app/editorial-board/page.tsx
import EditorialMemberCard from "@/components/EditorialMemberCard";
import PeerReviewSteps from "@/components/PeerReviewSteps";

export default function EditorialBoardPage() {
  // In a real app, this data would be fetched from a CMS or Database using a Server Component
  const editorialMembers = [
    {
      name: "Dr. Habib Hassan",
      affiliation: "College of Education, Waka-Biu",
      country: "Nigeria",
      // email: "milorad.wang@university.edu",
    },
    {
      name: "Dr. Mercy B. Wakawa",
      affiliation: "College of Education, Waka-Biu",
      country: "Nigeria",
    },
    {
      name: "Mr. Mohammed Y. Tong",
      affiliation: "College of Education, Waka-Biu",
      country: "Nigeria",
      // email: "mathew.goldjohn@university.edu",
    },
    {
      name: "Dr. Mohammed H. Barka",
      affiliation: "College of Education, Waka-Biu",
      country: "Nigeria",
      // email: "ezwan.nassuf@university.edu",
    },
    {
      name: "Mr. James B. Ayuba",
      affiliation: "College of Education, Waka-Biu",
      country: "Nigeria",
      // email: "m.khoss.jabar@university.edu",
    },
    // ... many more members
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 md:p-8">
      {/* Hero Banner Placeholder */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-blue-900 mb-2">
          Editorial Board & Peer Review
        </h1>
        <p className="text-lg text-gray-600">
          Upholding Rigorous Standards for Quality Research Publication
        </p>
      </div>

      <h2 className="text-3xl font-bold text-center mb-8">
        Peer Review Process
      </h2>
      <PeerReviewSteps />

      <h2 className="text-3xl font-bold text-center mt-16 mb-8">
        Editorial & Research Evaluation Board
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {editorialMembers.map((member, index) => (
          <EditorialMemberCard
            key={index}
            name={member.name}
            affiliation={member.affiliation}
            country={member.country}
          />
        ))}
      </div>
    </div>
  );
}
