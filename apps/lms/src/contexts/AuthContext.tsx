"use client"
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type UserRole = 'super_admin' | 'admin' | 'class_user' | 'student' |"teacher";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  collegeId?: string;
  classIds?: string[];
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Mock authentication for demo purposes
const mockUsers: Record<string, User & { password: string }> = {
  'superadmin@edu.com': {
    id: '1',
    name: 'John Doe',
    email: 'superadmin@edu.com',
    role: 'super_admin',
    password: 'admin123'
  },
  'admin@college.edu': {
    id: '2',
    name: 'Jane Smith',
    email: 'admin@college.edu',
    role: 'admin',
    password: 'admin123',
    collegeId: 'college-1'
  },
  'teacher@college.edu': {
    id: '3',
    name: 'Mike Johnson',
    email: 'teacher@college.edu',
    role: 'class_user',
    password: 'teacher123',
    collegeId: 'college-1',
    classIds: ['class-1', 'class-2']
  },
  'student@college.edu': {
    id: '4',
    name: 'Alice Wilson',
    email: 'student@college.edu',
    role: 'student',
    password: 'student123',
    classIds: ['class-1', 'class-2', 'class-3']
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on app load
    const savedToken = localStorage.getItem('auth-token');
    const savedUser = localStorage.getItem('auth-user');
    
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
    
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser = mockUsers[email];
    
    if (!mockUser || mockUser.password !== password) {
      setIsLoading(false);
      throw new Error('Invalid credentials');
    }
    
    const { password: _, ...userWithoutPassword } = mockUser;
    const mockToken = `mock-jwt-token-${mockUser.id}`;
    
    setUser(userWithoutPassword);
    setToken(mockToken);
    
    localStorage.setItem('auth-token', mockToken);
    localStorage.setItem('auth-user', JSON.stringify(userWithoutPassword));
    
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('auth-token');
    localStorage.removeItem('auth-user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        isLoading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};