"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

const NotFound = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { userProfile, isLoading } = useAuth();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      pathname
    );
  }, [pathname]);

  // Role → dashboard mapping (duplicated from AuthContext for this component)
  const roleDashboards = {
    superadmin: "/dashboards/superadmin",
    admin: "/dashboards/admin",
    class_user: "/dashboards/teacher",
    teacher: "/dashboards/teacher",
    student: "/dashboards/student",
  };

  const handleReturnHome = () => {
    if (userProfile && userProfile.role) {
      // If user is authenticated, redirect to their dashboard with /lms prefix
      const dashboard = roleDashboards[userProfile.role as keyof typeof roleDashboards] || "/";
      const prefixedDashboard = `/lms${dashboard}`;
      router.push(prefixedDashboard);
    } else {
      // If user is not authenticated, redirect to login with /lms prefix
      router.push("/lms/login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-primary">404</h1>
        <p className="text-xl text-muted-foreground mb-4">
          Oops! Page not found
        </p>
        <button
          onClick={handleReturnHome}
          disabled={isLoading}
          className="inline-block mt-4 px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition disabled:opacity-50"
        >
          {isLoading ? "Loading..." : "Return to Dashboard"}
        </button>
      </div>
    </div>
  );
};

export default NotFound;
