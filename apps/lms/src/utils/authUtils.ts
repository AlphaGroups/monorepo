// Utility functions for handling authentication
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

// Function to check if user needs to be redirected based on authentication status
export const checkAuthAndRedirect = (userProfile: any, router: any, currentPath: string = '') => {
  // Role → dashboard mapping
  const roleDashboards: Record<string, string> = {
    superadmin: "/dashboards/superadmin",
    admin: "/dashboards/admin",
    class_user: "/dashboards/teacher",
    teacher: "/dashboards/teacher",
    student: "/dashboards/student",
  };

  // If user is not authenticated and not on login page, redirect to login
  if (!userProfile) {
    if (currentPath !== '/login' && !currentPath.includes('/login')) {
      router.push('/login');
      return true; // Indicates redirection happened
    }
  } 
  // If user is authenticated but on login page, redirect to dashboard
  else if (userProfile && (currentPath === '/login' || currentPath.includes('/login'))) {
    const dashboard = roleDashboards[userProfile.role] || "/";
    router.push(dashboard);
    return true; // Indicates redirection happened
  }

  return false; // No redirection needed
};

// Hook for handling authentication expiration
export const useCheckAuthExpiration = () => {
  const router = useRouter();
  const { userProfile, logout } = useAuth();

  // This function checks if the user's auth has expired and redirects appropriately
  const handleAuthExpiration = () => {
    logout(); // Clear user data
    router.push('/login'); // Redirect to login
  };

  return { handleAuthExpiration };
};