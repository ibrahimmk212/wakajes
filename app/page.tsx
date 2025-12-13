// app/page.tsx (Final Assembly)

import HeroSection from "@/components/HeroSection";
import AuthorServiceCards from "@/components/AuthorServiceCards"; // Component for the 6-grid services
import ImportantDates from "@/components/ImportantDates";
import JournalList from "@/components/JournalList";

export default function HomePage() {
  return (
    <main>
      {/* 1. Call for Papers Banner (Includes 'Why Publish with GSJ?') */}
      <HeroSection />

      {/* 2. Authors & Researchers Grid (The 6 boxes from image_248319.png) */}
      <AuthorServiceCards />

      {/* 3. Highlighted deadline */}
      <ImportantDates />

      {/* 4. Showcase of all available journal titles */}
      <JournalList />
    </main>
  );
}
