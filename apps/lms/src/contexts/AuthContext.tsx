"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { AuthService } from "@/services/auth.service";
import { UserProfile } from "@/services/interfaces";
import { useRouter } from "next/navigation";
// import { UserRole } from "@/services/interfaces";
export type UserRole =
  | "superadmin"
  | "admin"
  | "class_user"
  | "student"
  | "teacher";

interface AuthContextType {
  userProfile: UserProfile | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Role → dashboard mapping
  const roleDashboards: Record<UserRole, string> = {
    superadmin: "/dashboards/superadmin",
    admin: "/dashboards/admin",
    class_user: "/dashboards/teacher",
    teacher: "/dashboards/teacher",
    student: "/dashboards/student",
  };

  // Hydrate user from localStorage on mount
  useEffect(() => {
    const savedToken = localStorage.getItem("accessToken");
    const savedUser = localStorage.getItem("auth-userProfile");

    if (savedToken) {
      setToken(savedToken);

      if (savedUser) {
        setUserProfile(JSON.parse(savedUser));
        setIsLoading(false);
      } else {
        AuthService.getProfile()
          .then((profile) => {
            setUserProfile(profile);
            localStorage.setItem("auth-userProfile", JSON.stringify(profile));
          })
          .catch(() => logout())
          .finally(() => setIsLoading(false));
      }
    } else {
      setIsLoading(false);
    }
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Login API
      const { access_token } = await AuthService.login({ email, password });
      localStorage.setItem("accessToken", access_token);
      setToken(access_token);

      // Fetch profile
      const profile = await AuthService.getProfile();
      setUserProfile(profile);
      localStorage.setItem("auth-userProfile", JSON.stringify(profile));

      // Wait a tick to ensure state is updated before navigation
      await new Promise(resolve => setTimeout(resolve, 0));
      
      // Role-based redirection - ensure profile and role exist
      if (profile && profile.role) {
        const dashboard = roleDashboards[profile.role] || "/";
        router.replace(dashboard); // Using replace instead of push to avoid back button issues
      } else {
        // Fallback if role is missing
        router.replace("/");
      }
    } catch (error) {
      // Reset loading on error
      setIsLoading(false);
      throw error;
    }
  };

  // Logout function
  const logout = () => {
    setUserProfile(null);
    setToken(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("tokenType");
    localStorage.removeItem("auth-userProfile");
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{ userProfile, token, login, logout, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
