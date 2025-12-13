// app/current-edition/page.tsx
import VolumeArchive from "@/components/VolumeArchive";

// Example structure of archive data (fetched at build time/server-side in Next.js)
const archiveData = [
  {
    volume: 13,
    year: 2026,
    issues: [
      { issue: 6, month: "June" },
      { issue: 5, month: "May" },
      { issue: 4, month: "April" },
      { issue: 3, month: "March" },
      { issue: 2, month: "February" },
      { issue: 1, month: "January" },

      // ...
    ],
  },
  {
    volume: 12,
    year: 2024,
    issues: [
      { issue: 12, month: "Dec" },
      { issue: 11, month: "Nov" },
      // ...
    ],
  },
  // ... more volumes
];

export default function CurrentEditionPage() {
  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold text-center mb-10">
        All Published Editions
      </h1>

      <div className="space-y-10">
        {archiveData.map((volume) => (
          <VolumeArchive key={volume.volume} {...volume} />
        ))}
      </div>
    </div>
  );
}
