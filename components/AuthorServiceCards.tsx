import React from "react";
import { Link } from "react-router-dom";

interface CardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  target?: string;
  rel?: string;
}

const Card: React.FC<CardProps> = ({ icon, title, description, href, target, rel }) => {
  const isInternalLink = !href.startsWith("http") && !href.startsWith("/docs") && target !== "_blank";

  if (isInternalLink) {
    return (
      <Link
        to={href}
        className="block p-6 text-center border rounded-lg shadow-sm hover:shadow-lg transition duration-300 hover:border-blue-500"
      >
        <div className="text-4xl text-blue-600 mb-3 mx-auto w-12 h-12 flex items-center justify-center">
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-2 text-blue-500">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
      </Link>
    );
  }

  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className="block p-6 text-center border rounded-lg shadow-sm hover:shadow-lg transition duration-300 hover:border-blue-500"
    >
      <div className="text-4xl text-blue-600 mb-3 mx-auto w-12 h-12 flex items-center justify-center">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-blue-500">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </a>
  );
};

export default function AuthorServiceCards() {
  const services = [
    {
      icon: "📢",
      title: "Call for Paper",
      description: "Submit your original research and contribute to advancing global knowledge.",
      href: "/paper-submission",
    },
    {
      icon: "⬆️",
      title: "Research Paper Submission",
      description: "Submit your paper easily through our online submission system.",
      href: "/paper-submission",
    },
    {
      icon: "✍️",
      title: "Registration",
      description: "Register to publish your paper and get access to author resources.",
      href: "/registration",
    },
    {
      icon: "📘",
      title: "Publication List",
      description: "Explore the wide range of articles published in GSJ.",
      href: "/current-edition",
    },
    {
      icon: "📄",
      title: "Copyright Forms",
      description: "Access and download copyright transfer forms for your publications.",
      href: "/docs/IJASSW_copyright_form.pdf",
      target: "_blank",
      rel: "noopener noreferrer",
    },
    {
      icon: "👥",
      title: "Editorial Board",
      description: "Meet our distinguished panel of experts guiding GSJ publications.",
      href: "/editorial-board",
    },
  ];

  return (
    <section className="py-12 bg-white">
      <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
        Authors & Researchers
      </h2>
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <Card key={service.title} {...service} />
        ))}
      </div>
    </section>
  );
}
