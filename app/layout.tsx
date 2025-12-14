// // app/layout.tsx

// import type { Metadata } from "next";
// import { Inter } from "next/font/google";

// // Import your global CSS file (as seen in your file structure)
// import "./globals.css";
// const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "International Journal of Arts and Social Sciences (IJASSW)",
//   description:
//     "A multidisciplinary journal publishing research in arts, humanities, sciences, and social sciences.",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       {/* set light mode as default */}
//       <body>
//         {/* className={inter.className} */}
//         {/* 2. Main Content Area */}
//         <div className="min-h-screen">
//           {children}{" "}
//           {/* This renders the content of app/page.tsx, app/submission/page.tsx, etc. */}
//         </div>
//       </body>
//     </html>
//   );
// }
// app/inactive/page.tsx
import { Metadata } from "next";
import { Globe } from "lucide-react";

// 🎯 Metadata should be generic to avoid revealing the journal's identity
export const metadata: Metadata = {
  title: "Domain Status Error",
  description: "The requested URL is currently unavailable or unregistered.",
  // Prevent search engine indexing
  robots: {
    index: false,
    follow: false,
  },
};

export default function InactiveUrlPage() {
  return (
    // Use a generic, default background without app layout styling
    <html lang="en">
      <body className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md">
          <Globe className="mx-auto mb-4 text-gray-400" size={48} />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            URL Unavailable
          </h1>
          <p className="text-gray-600">
            The requested URL is currently unavailable or unregistered. Please
            check the address or contact support for assistance.
          </p>
        </div>
      </body>
    </html>
  );
}
