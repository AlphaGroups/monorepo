// Service to handle token management and expiration
import { useAuth } from '@/contexts/AuthContext';
import { AuthService } from '@/services/auth.service';
import api from '@/services/api';

// Function to check if token is expired
export const isTokenExpired = (token: string | null): boolean => {
  if (!token) return true;

  try {
    // Decode JWT token to check expiration
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );

    const { exp } = JSON.parse(jsonPayload);
    const expirationTime = exp * 1000; // Convert to milliseconds
    const currentTime = Date.now();

    return currentTime >= expirationTime;
  } catch (error) {
    // If there's an error decoding the token, assume it's invalid
    console.error('Error decoding token:', error);
    return true;
  }
};

// Function to automatically refresh token if needed
export const checkAndRefreshToken = async (): Promise<boolean> => {
  try {
    const token = localStorage.getItem('accessToken');
    
    if (!token) {
      return false; // No token to refresh
    }

    if (isTokenExpired(token)) {
      // Try to refresh the token using refresh token
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        try {
          // Attempt to refresh the token using the api service
          const response = await api.post('/auth/refresh', {
            refresh_token: refreshToken
          });

          if (response.status === 200 && response.data?.access_token) {
            localStorage.setItem('accessToken', response.data.access_token);
            // Update the default header for future requests
            api.defaults.headers.Authorization = `Bearer ${response.data.access_token}`;
            return true; // Token refreshed successfully
          } else {
            // Refresh failed, token is expired
            return false;
          }
        } catch (error) {
          console.error('Token refresh failed:', error);
          return false;
        }
      } else {
        // No refresh token available
        return false;
      }
    }

    // Token is still valid
    return true;
  } catch (error) {
    console.error('Error checking token:', error);
    return false;
  }
};

// Hook to handle token expiration checks
export const useTokenExpirationHandler = () => {
  const { logout } = useAuth();

  // Check token expiration periodically
  const startTokenCheck = () => {
    // Check immediately
    checkTokenAndHandleExpiration();
    
    // Then check every 5 minutes
    const interval = setInterval(() => {
      checkTokenAndHandleExpiration();
    }, 5 * 60 * 1000); // 5 minutes

    return () => clearInterval(interval);
  };

  const checkTokenAndHandleExpiration = async () => {
    const isValid = await checkAndRefreshToken();
    if (!isValid) {
      // Token is expired and cannot be refreshed
      logout();
    }
  };

  return { startTokenCheck };
};