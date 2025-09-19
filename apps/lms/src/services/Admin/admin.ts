// apps/lms/src/services/admin.ts
import api from "@/services/api";

export interface AdminPayload {
  full_name: string;
  email: string;
  mobile?: string;
  password?: string;
  college_name: string;
}

export interface Admin {
  id: string;
  name: string;
  full_name:string;
  email: string;
  college_name: string;
  collegeId: string;
  mobile?: string;
  avatar?: string;
  status: "active" | "inactive";
  createdAt: string;
  lastLogin?: string;
}

export interface College {
  id: string;
  name: string;
}

// Fetch all admins
export const getAdmins = async (): Promise<Admin[]> => {
  const res = await api.get("/admins/");
  const data = res.data;
  return Array.isArray(data) ? data : data.admins || [];
};

// Fetch all colleges
export const getColleges = async (): Promise<College[]> => {
  const res = await api.get("/colleges/");
  return res.data;
};

// Create a new admin
export const createAdmin = async (payload: AdminPayload): Promise<Admin> => {
  const res = await api.post("/admins/", payload);
  return res.data;
};

// Update an existing admin
export const updateAdmin = async (id: string, payload: AdminPayload): Promise<Admin> => {
  const res = await api.put(`/admins/${id}`, payload);
  return res.data;
};

// Delete an admin
export const deleteAdmin = async (id: string): Promise<void> => {
  await api.delete(`/admins/${id}`);
};
