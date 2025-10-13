"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { ReactNode, useEffect } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: string[];
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { userProfile, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!userProfile) {
        router.replace("/lms/login"); // redirect to login with /lms prefix
      } else if (allowedRoles && (!userProfile.role || !allowedRoles.includes(userProfile.role))) {
        router.replace("/lms"); // redirect if role not allowed with /lms prefix
      }
    }
  }, [userProfile, isLoading, router, allowedRoles]);

  if (isLoading || !userProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return <>{children}</>;
}
