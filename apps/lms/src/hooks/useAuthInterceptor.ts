import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { AuthService } from '@/services/auth.service';
import api from '@/services/api';
import { isTokenExpired, checkAndRefreshToken } from '@/services/token.service';

// Custom hook to handle authentication interception
const useAuthInterceptor = () => {
  const router = useRouter();
  const { userProfile, token, logout } = useAuth();

  useEffect(() => {
    // Create an interceptor for API calls
    const interceptor = api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          // Token expired or invalid - log out the user
          logout();
          router.push('/login');
        }
        return Promise.reject(error);
      }
    );

    // Cleanup interceptor on unmount
    return () => {
      api.interceptors.response.eject(interceptor);
    };
  }, [logout, router]);

  // Check if token is still valid periodically
  useEffect(() => {
    if (!token) return;

    const interval = setInterval(async () => {
      // Check if token is expired
      const isValid = await checkAndRefreshToken();
      if (!isValid) {
        // Token is expired and cannot be refreshed
        logout();
        router.push('/login');
      } else if (!userProfile && token) {
        // Token is valid but we don't have user profile, fetch it
        AuthService.getProfile()
          .then(profile => {
            // If successful, continue as normal
          })
          .catch(error => {
            // If failed, log out the user
            logout();
            router.push('/login');
          });
      }
    }, 300000); // Check every 5 minutes

    return () => clearInterval(interval);
  }, [token, userProfile, logout, router]);
};

export default useAuthInterceptor;