import api from "./api";
import { LoginRequest, LoginResponse, UserProfile } from "@/services/interfaces";
import qs from "qs";

export const AuthService = {
  // login for both normal users and superadmin
  login: async (
    payload: LoginRequest,
    isSuperAdmin: boolean = false
  ): Promise<LoginResponse> => {
    let res;

    if (isSuperAdmin) {
      // 🔑 Superadmin OAuth2 flow
      const formData = qs.stringify({
        grant_type: "password",
        username: payload.email,
        password: payload.password,
      });

      res = await api.post<LoginResponse>("/auth/token", formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
    } else {
      // 👩‍🏫 Admin/Teacher/Student flow
      // For student authentication, the backend should handle the password generation logic
      res = await api.post<LoginResponse>("/auth/login", {
        email: payload.email,
        password: payload.password,
      });
    }

    // Save tokens if present
    if (res.data?.access_token) {
      localStorage.setItem("accessToken", res.data.access_token);
      localStorage.setItem("refreshToken", res.data.refresh_token ?? "");
      localStorage.setItem("tokenType", res.data.token_type ?? "bearer");
    }

    return res.data;
  },

  logout: async (): Promise<void> => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("tokenType");
    await api.post("/auth/logout");
  },

  getProfile: async (): Promise<UserProfile> => {
    const res = await api.get<UserProfile>("/auth/profile");
    return res.data;
  },
};
