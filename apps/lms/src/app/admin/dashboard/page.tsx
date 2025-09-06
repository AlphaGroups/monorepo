"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import SuperAdminDashboard from "../../dashboards/SuperAdminDashboard";

export default function Page() {
  return (
    <ProtectedRoute allowedRoles={["super_admin"]}>
      <SuperAdminDashboard />
    </ProtectedRoute>
  );
}
