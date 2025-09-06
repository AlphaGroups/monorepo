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

export type UserRole = "superadmin" | "admin" | "class_user" | "student" | "teacher";

export interface UserProfile {
    id: number;
    name: string;
    first_name: string;
    last_name: string;
    email: string;
    role: UserRole;
    mobile: string;
}