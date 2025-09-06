"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import SuperAdminDashboard from "../../dashboards/superadmin/page";

export default function Page() {
  return (
    <ProtectedRoute allowedRoles={["superadmin"]}>
      <SuperAdminDashboard />
    </ProtectedRoute>
  );
}
