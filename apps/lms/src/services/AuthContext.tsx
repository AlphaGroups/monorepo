"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthService } from "@/services/auth.service";
import { UserProfile } from "@/services/interfaces";
import { useRouter } from "next/navigation";

interface AuthContextType {
  user: UserProfile | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      AuthService.getProfile()
        .then((profile) => {
          setUser(profile);

          // 🚀 Redirect based on role
          switch (profile.role) {
            case "superadmin":
              router.replace("/admin/dashboard");
              break;
            case "admin":
              router.replace("/admin/college-dashboard");
              break;
            case "teacher":
              router.replace("/class/dashboard");
              break;
            case "student":
              router.replace("/student/dashboard");
              break;
            default:
              router.replace("/");
          }
        })
        .catch(() => {
          setUser(null);
          localStorage.clear();
        });
    }
  }, [router]);

  const login = async (email: string, password: string) => {
    await AuthService.login({ email, password });
    const profile = await AuthService.getProfile();
    setUser(profile);
  };

  const logout = () => {
    setUser(null);
    localStorage.clear();
    router.replace("/lms/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
}
