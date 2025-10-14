import "./globals.css";
import { Inter } from "next/font/google";
import { AuthProvider } from "@/contexts/AuthContext";
import { LayoutProvider } from "@/components/Layout/LayoutProvider";
import { GlobalLoaderProvider } from "@/components/GlobalLoader";
import { ThemeProvider } from "@/contexts/ThemeProvider";
import { Suspense } from "react";

const inter = Inter({ 
  variable: "--font-inter", 
  subsets: ["latin"], 
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Suspense fallback={null}>
            <GlobalLoaderProvider>
              <AuthProvider>{children}</AuthProvider>
            </GlobalLoaderProvider>
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  );
}
