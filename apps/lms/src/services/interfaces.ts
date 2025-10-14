// apps/lms/src/services/interfaces.ts

// Login request body
export interface LoginRequest {
  email: string;
  password: string;
}

// Login response body
export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  token_type: "bearer";
}

// Generic pagination response interface
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  size: number;
  totalPages: number;
}

export type UserRole =
  | "superadmin"
  | "admin"
  | "student"
  | "teacher";

export interface UserProfile {
  id: number;
  name: string;
  first_name: string;
  last_name: string;
  email: string;
  role: UserRole;
  mobile: string;
  avatar?: string;
  created_at?: string;
}

// services/admin.ts
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

export interface teacherData {
  full_name: string;
  email: string;
  mobile: string;
  password: string;
  college_id: number;
  subject: string;
}

export interface Student {
  id: number;
  full_name: string;
  email: string;
  mobile: string;
  college_id: number;
  class_id: number;
  avatar?: string;
  status: "active" | "inactive";
  createdAt: string;
  lastLogin?: string;
}
