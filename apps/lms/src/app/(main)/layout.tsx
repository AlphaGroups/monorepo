"use client";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import MainLayout from "@/components/Layout/MainLayout";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userProfile, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !userProfile) {
      router.push("/login");
    }
  }, [userProfile, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!userProfile) {
    return null; // waiting for redirect
  }

  return <MainLayout>{children}</MainLayout>;
}
