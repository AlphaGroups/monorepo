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
// The backend expects admin_id as a query parameter and class_id as an array in the request body
export const grantAdminAccess = async (
  adminId: string,
  classId: string
): Promise<AdminAccessResponse> => {
  try {
    const res = await api.post(`/adminaccess/grant?admin_id=${adminId}`, [classId]);
    return res.data;
  } catch (error) {
    console.error('Error in grantAdminAccess:', error);
    throw error;
  }
};

// Revoke access for admin from a specific class
export const revokeAdminAccessFromClass = async (
  adminId: string,
  classId: string
): Promise<AdminAccessResponse> => {
  try {
    const res = await api.delete(`/adminaccess/revoke/${adminId}/class/${classId}`);
    return res.data;
  } catch (error) {
    console.error('Error in revokeAdminAccessFromClass:', error);
    throw error;
  }
};

// Revoke all access for admin
export const revokeAdminAccessFromAll = async (
  adminId: string
): Promise<AdminAccessResponse> => {
  try {
    const res = await api.delete(`/adminaccess/revoke/${adminId}/all`);
    return res.data;
  } catch (error) {
    console.error('Error in revokeAdminAccessFromAll:', error);
    throw error;
  }
};