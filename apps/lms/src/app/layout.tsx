// // src/app/layout.tsx
// import "./globals.css";
// import { Geist, Geist_Mono } from "next/font/google";
// import { AuthProvider } from "@/contexts/AuthContext";
// import MainLayout from "@/components/Layout/MainLayout";

// const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <body
//         className={`${geistSans.variable} ${geistMono.variable} antialiased`}
//       >
//         <AuthProvider>
//           {/* Only wrap with MainLayout if the page requires it */}
//           <MainLayout>{children}</MainLayout>
//         </AuthProvider>
//       </body>
//     </html>
//   );
// }
"use client";

import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import { AuthProvider } from "@/contexts/AuthContext";
import MainLayout from "@/components/Layout/MainLayout";
import { usePathname } from "next/navigation";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // List of routes that should NOT use MainLayout
  const noLayoutRoutes = ["/login"];

  const shouldUseLayout = !noLayoutRoutes.includes(pathname);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          {shouldUseLayout ? (
            <MainLayout>{children}</MainLayout>
          ) : (
            children
          )}
        </AuthProvider>
      </body>
    </html>
  );
}
