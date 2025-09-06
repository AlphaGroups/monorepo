import api from "./api";
import { LoginRequest, LoginResponse, UserProfile } from "@/services/interfaces";

export const AuthService = {
  login: async (payload: LoginRequest): Promise<LoginResponse> => {
    const res = await api.post<LoginResponse>("/auth/login", payload);

    if (res.data?.access_token) {
      localStorage.setItem("accessToken", res.data.access_token);
      localStorage.setItem("refreshToken", res.data.refresh_token);
      localStorage.setItem("tokenType", res.data.token_type);
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
