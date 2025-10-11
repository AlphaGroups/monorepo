// apps/lms/src/services/admin.ts
import api from "@/services/api";
import { PaginatedResponse } from "@/services/interfaces";

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

// Fetch all admins with pagination
export const getAdmins = async (page: number = 1, size: number = 10): Promise<PaginatedResponse<Admin>> => {
  const res = await api.get("/admins/", {
    params: {
      page,
      size
    }
  });
  
  // Handle both direct array responses and paginated responses
  if (Array.isArray(res.data)) {
    return {
      data: res.data,
      total: res.data.length,
      page: page,
      size: size,
      totalPages: Math.ceil(res.data.length / size)
    };
  } else {
    // If the response is already paginated, return it directly
    return res.data;
  }
};

// Fetch all colleges with pagination
export const getColleges = async (page: number = 1, size: number = 10): Promise<PaginatedResponse<College>> => {
  const res = await api.get("/colleges/", {
    params: {
      page,
      size
    }
  });
  
  // Handle both direct array responses and paginated responses
  if (Array.isArray(res.data)) {
    return {
      data: res.data,
      total: res.data.length,
      page: page,
      size: size,
      totalPages: Math.ceil(res.data.length / size)
    };
  } else {
    // If the response is already paginated, return it directly
    return res.data;
  }
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
