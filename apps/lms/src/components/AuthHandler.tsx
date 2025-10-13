"use client";

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { checkAuthAndRedirect } from '@/utils/authUtils';

// Component to handle global authentication logic
const AuthHandler = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { userProfile, isLoading, logout } = useAuth();

  useEffect(() => {
    // Check authentication and redirect if necessary
    if (!isLoading) {
      const wasRedirected = checkAuthAndRedirect(userProfile, router, pathname);
      if (!wasRedirected && pathname.startsWith('/lms/')) {
        // If on LMS routes and no profile, redirect to login
        if (!userProfile && !pathname.includes('/login')) {
          logout();
          router.push('/login');
        }
      }
    }
  }, [userProfile, isLoading, router, pathname, logout]);

  // Also add an interceptor to handle 401 responses globally
  useEffect(() => {
    // This would typically be done by setting up an axios interceptor
    // For now, we'll just return children
    return () => {
      // Cleanup if necessary
    };
  }, []);

  return <>{children}</>;
};

export default AuthHandler;