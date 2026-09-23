// src/components/Card.tsx (A reusable sub-component)
import React from "react";
// You would replace the 'div' with an actual Icon component (e.g., from react-icons)

interface CardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Card: React.FC<CardProps> = ({ icon, title, description }) => (
  <div className="p-6 text-center border rounded-lg shadow-sm hover:shadow-lg transition duration-300">
    <div className="text-4xl text-blue-600 mb-3 mx-auto w-12 h-12 flex items-center justify-center">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600 text-sm">{description}</p>
  </div>
);

// src/components/FeatureCards.tsx (The main component)
export default function FeatureCards() {
  const features = [
    {
      icon: "⏱️",
      title: "Quick Review",
      description: "Fast and fair review for timely publication.",
    },
    {
      icon: "💲",
      title: "Low Cost",
      description: "Affordable publication fee for authors worldwide.",
    },
    {
      icon: "📈",
      title: "High Impact Factor",
      description: "Indexed by leading scientific databases.",
    },
    {
      icon: "🔓",
      title: "Open Access",
      description: "Your work is freely available to the global community.",
    },
  ];

  return (
    <section className="py-12 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-10">
        Why Publish with GSJ?
      </h2>
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-6">
        {features.map((feature) => (
          <Card
            key={feature.title}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </section>
  );
}
