/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/AuthorServiceCards.tsx
import React from "react";
import Link from "next/link";

// Assuming a reusable Card component is available (e.g., src/components/Card.tsx)
const Card = ({ icon, title, description, href, target, rel }: any) => {
  // Determine if it's an internal Next.js route or an external/static file link
  const isInternalLink = !href.startsWith("http") && target !== "_blank";

  if (isInternalLink) {
    // Use Next.js Link for internal navigation for performance
    return (
      <Link href={href} passHref legacyBehavior>
        <a className="block p-6 text-center border rounded-lg shadow-sm hover:shadow-lg transition duration-300 hover:border-blue-500">
          <div className="text-4xl text-blue-600 mb-3 mx-auto w-12 h-12 flex items-center justify-center">
            {icon}
          </div>
          <h3 className="text-xl font-semibold mb-2 text-blue-500">{title}</h3>
          <p className="text-gray-600 text-sm">{description}</p>
        </a>
      </Link>
    );
  }

  // For external links or static file downloads (like your PDF)
  return (
    <a
      href={href}
      target={target} // This is "_blank" for the PDF
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
      description:
        "Submit your original research and contribute to advancing global knowledge.",
      href: "/paper-submission",
    },
    {
      icon: "⬆️",
      title: "Research Paper Submission",
      description:
        "Submit your paper easily through our online submission system.",
      href: "/paper-submission",
    },
    {
      icon: "✍️",
      title: "Registration",
      description:
        "Register to publish your paper and get access to author resources.",
      href: "/registration",
    },
    {
      icon: "📘",
      title: "Publication List",
      description: "Explore the wide range of articles published in GSJ.",
      href: "/current-edition",
    },
    // {
    //   icon: "📄",
    //   title: "Templates",
    //   description:
    //     "Download ready-to-use templates to format your research paper easily.",
    //   href: "/author-guidelines#downloads",
    // },
    {
      icon: "📄",
      title: "Copyright Forms",
      description:
        "Access and download copyright transfer forms for your publications.",
      // docx file in public/docs/copyright_form.pdf
      // open in new tab
      href: "/docs/IJASSW_copyright_form.pdf",
      target: "_blank",
      rel: "noopener noreferrer",
    },
    {
      icon: "👥",
      title: "Editorial Board",
      description:
        "Meet our distinguished panel of experts guiding GSJ publications.",
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
