// app/layout.tsx

import type { Metadata } from "next";
import { Inter } from "next/font/google";

// Import your global CSS file (as seen in your file structure)
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "International Journal of Arts and Social Sciences (IJASSW)",
  description:
    "A multidisciplinary journal publishing research in arts, humanities, sciences, and social sciences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* set light mode as default */}
      <body>
        {/* className={inter.className} */}
        {/* 2. Main Content Area */}
        <div className="min-h-screen">
          {children}{" "}
          {/* This renders the content of app/page.tsx, app/submission/page.tsx, etc. */}
        </div>
      </body>
    </html>
  );
}
