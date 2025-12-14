// app/layout.tsx

// import type { Metadata } from "next";
// import { Inter } from "next/font/google";

// Import your global CSS file (as seen in your file structure)
// import "./globals.css";

// Import your custom components
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "International Journal of Arts and Social Sciences (IJASSW)",
//   description:
//     "A multidisciplinary journal publishing research in arts, humanities, sciences, and social sciences.",
// };

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* set light mode as default */}
      <body>
        {/* 1. The Dark Header/Navbar */}
        <Header />
        {/* 2. Main Content Area */}
        {/* <div className="min-h-screen"> */}
        {children}{" "}
        {/* This renders the content of app/page.tsx, app/submission/page.tsx, etc. */}
        {/* </div> */}
        {/* 3. The Sticky Blue Footer (and the main footer) */}
        <Footer />
      </body>
    </html>
  );
}
