"use client";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, Suspense } from "react";
import MainLayout from "@/components/Layout/MainLayout";
import useAuthInterceptor from "@/hooks/useAuthInterceptor";

function AuthChecker({ children }: { children: React.ReactNode }) {
  const { userProfile, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  useAuthInterceptor(); // Add the auth interceptor

  useEffect(() => {
    if (!isLoading && !userProfile && !pathname.includes('/login')) {
      router.push("/login"); // basePath will add /lms/ prefix
    }
  }, [userProfile, isLoading, router, pathname]);

  // Wait until auth state is fully resolved before rendering
  if (isLoading || (pathname !== '/login' && !userProfile)) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!userProfile) {
    return null;
  }

  return <MainLayout>{children}</MainLayout>;
}

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthChecker>
      <Suspense 
        fallback={
          <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
          </div>
        }
      >
        {children}
      </Suspense>
    </AuthChecker>
  );
}
