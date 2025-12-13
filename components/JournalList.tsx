// src/components/JournalCard.tsx (A reusable sub-component)
import Link from "next/link";
import Image from "next/image";

interface JournalCardProps {
  title: string;
  imageSrc: string;
  submissionLink: string;
}

const JournalCard: React.FC<JournalCardProps> = ({
  title,
  imageSrc,
  submissionLink,
}) => (
  <div className="bg-white pt-4 rounded-lg shadow-md overflow-hidden text-center hover:shadow-xl transition duration-300">
    <div className="relative w-full h-60 ">
      <Image src={imageSrc} alt={title} layout="fill" objectFit="contain" />
    </div>
    <div className="p-4">
      <h3 className="text-gray-700 mb-3">{title}</h3>
      <Link href={submissionLink}>
        <button className="bg-blue-700 text-sm py-2 px-4 rounded hover:bg-gray-300 transition duration-300 text-white">
          Submit Paper
        </button>
      </Link>
    </div>
  </div>
);

// src/components/JournalList.tsx (The main component)
export default function JournalList() {
  // In a real application, this data would be fetched from your database
  const journals = [
    {
      title: "International Journal of Arts and Social Sciences in the world",
      imageSrc: "/images/journal-1.png",
      link: "/paper-submission?journal=IJAR",
    },
    {
      title: "Journal of Emerging Science & Tech",
      imageSrc: "/images/journal-1.png",
      link: "/paper-submission?journal=JEST",
    },
    {
      title: "Global Research & Innovation Journal - Physics",
      imageSrc: "/images/journal-1.png",
      link: "/paper-submission?journal=GRIJP",
    },
    // ... add more journals
  ];

  return (
    // Better design and layout for journal list
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
          Our Journals
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {journals.map((journal) => (
            <JournalCard
              key={journal.title}
              title={journal.title}
              imageSrc={journal.imageSrc}
              submissionLink={journal.link}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
