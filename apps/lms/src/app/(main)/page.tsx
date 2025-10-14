"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap } from "lucide-react";

export default function HomePage() {
  const { userProfile, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // If user is not logged in, redirect to login
    if (!isLoading && !userProfile) {
      router.replace("/login");
    } else if (userProfile) {
      // Redirect based on user role
      switch (userProfile.role) {
        case "superadmin":
          router.replace("/dashboards/superadmin");
          break;
        case "admin":
          router.replace("/dashboards/admin");
          break;
        case "teacher":
          router.replace("/dashboards/teacher");
          break;
        case "student":
          router.replace("/dashboards/student");
          break;
        default:
          router.replace("/dashboards/student"); // Default redirect
      }
    }
  }, [userProfile, isLoading, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-hero p-4">
      <div className="w-full max-w-md">
        <Card className="card-elegant">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-gradient-primary rounded-full shadow-custom-glow">
                <GraduationCap className="h-8 w-8 text-primary-foreground" />
              </div>
            </div>
            <CardTitle className="text-2xl font-heading font-semibold">
              Welcome to EduPlatform
            </CardTitle>
            <p className="text-muted-foreground">Redirecting to your dashboard...</p>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-sm text-muted-foreground">
              If you are not redirected automatically, please check your login status.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}