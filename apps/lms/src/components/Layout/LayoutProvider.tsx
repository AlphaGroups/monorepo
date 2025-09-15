"use client";
import { usePathname } from "next/navigation";
import MainLayout from "./MainLayout";

export function LayoutProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Don't wrap login page with MainLayout
  if (pathname === "/login") {
    return <>{children}</>;
  }

  return <MainLayout>{children}</MainLayout>;
}
