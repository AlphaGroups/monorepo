import api from "@/services/api";

export interface AdminAccessGrant {
  admin_id: string;
  class_id: string;
}

export interface AdminAccessResponse {
  message: string;
  success: boolean;
}

// Grant access to admin for a class
export const grantAdminAccess = async (
  adminId: string,
  classId: string
): Promise<AdminAccessResponse> => {
  const res = await api.post(`/adminaccess/grant`, {
    admin_id: adminId,
    class_id: classId,
  });
  return res.data;
};

// Revoke access for admin from a specific class
export const revokeAdminAccessFromClass = async (
  adminId: string,
  classId: string
): Promise<AdminAccessResponse> => {
  const res = await api.delete(`/adminaccess/revoke/${adminId}/class/${classId}`);
  return res.data;
};

// Revoke all access for admin
export const revokeAdminAccessFromAll = async (
  adminId: string
): Promise<AdminAccessResponse> => {
  const res = await api.delete(`/adminaccess/revoke/${adminId}/all`);
  return res.data;
};