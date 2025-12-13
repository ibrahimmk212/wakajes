// src/components/HeroSection.tsx
import Link from "next/link";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative h-96 flex items-center justify-center text-center text-white bg-blue-900 overflow-hidden">
      {/* Background Image - Replace with your actual image path */}
      <Image
        src="/images/hero-bg.png" //used for the hero section background
        alt="Call for Papers"
        layout="fill"
        objectFit="cover"
        quality={100}
        className="opacity-30"
      />
      <div className="relative z-10 p-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Call for Papers 2025
        </h1>
        <p className="text-lg mb-6">
          Submit your original research to our peer-reviewed journal.
        </p>
        <Link href="/paper-submission">
          <button className="bg-white text-blue-700 font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-gray-100 transition duration-300">
            Submit Research Paper
          </button>
        </Link>
      </div>
    </section>
  );
}
