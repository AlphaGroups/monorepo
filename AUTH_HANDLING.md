# Authentication Handling Guide

This document explains how authentication is handled in the LMS application, particularly for handling 404 page redirects and token expiration.

## 404 Page Navigation

The NotFound pages have been updated to redirect users appropriately:

1. **LMS App NotFound Pages** (`not-found.tsx` and `src/app/(main)/NotFound/page.tsx`):
   - If user is authenticated: redirects to their respective dashboard based on role
   - If user is not authenticated: redirects to login page
   - Button now says "Return to Dashboard" instead of "Return to Home"
   - Includes loading state during authentication check

2. **Role to Dashboard Mapping**:
   - superadmin: `/dashboards/superadmin`
   - admin: `/dashboards/admin`
   - class_user: `/dashboards/teacher`
   - teacher: `/dashboards/teacher`
   - student: `/dashboards/student`

## Token Expiration Handling

Multiple layers of protection against token expiration:

1. **Axios Interceptor** (`src/hooks/useAuthInterceptor.ts`):
   - Automatically intercepts 401 responses
   - Logs out the user and redirects to login if token is invalid/expired

2. **Periodic Token Checks** (`src/hooks/useAuthInterceptor.ts`):
   - Runs every 5 minutes to check token validity
   - Attempts to refresh token if needed
   - Logs out and redirects if token cannot be refreshed

3. **JWT Token Validation** (`src/services/token.service.ts`):
   - Decodes JWT tokens to check expiration time
   - Provides utilities to refresh tokens automatically

4. **Auth Handler Component** (`src/components/AuthHandler.tsx`):
   - Provides global authentication checks
   - Handles redirects based on authentication status

## Implementation Details

### New Files Added:
- `src/hooks/useAuthInterceptor.ts` - Handles API response interceptors and token checks
- `src/utils/authUtils.ts` - Provides utility functions for auth handling
- `src/components/AuthHandler.tsx` - Global auth handling component
- `src/services/token.service.ts` - Token validation and refresh logic

### Updated Files:
- `src/app/not-found.tsx` - Updated to redirect based on auth status
- `src/app/(main)/NotFound/page.tsx` - Updated to redirect based on auth status
- `src/app/(main)/layout.tsx` - Added auth interceptor to the layout

### Key Features:
1. **Role-based Redirects**: Users are redirected to their appropriate dashboards
2. **Automatic Token Refresh**: Tokens are checked and refreshed periodically
3. **401 Response Handling**: Immediate logout on unauthorized API responses
4. **Loading States**: Proper UI during authentication checks
5. **Session Management**: Proper cleanup of auth data on logout

## Testing the Implementation

1. **Normal Flow**: Navigate to a non-existent route - should redirect to appropriate dashboard if authenticated
2. **Unauthenticated Flow**: Navigate to a non-existent route while not logged in - should redirect to login
3. **Token Expiration**: Simulate token expiration to test automatic logout and redirect
4. **API Error Handling**: Test API calls with invalid tokens to ensure proper redirection

## Deployment Notes

When deploying to production:
1. Ensure your backend supports token refresh endpoints if you plan to use automatic refresh
2. Update the refresh endpoint URL in `token.service.ts` if needed
3. Configure appropriate token expiration times on your backend
4. Make sure CORS settings allow for the refresh endpoint if it's on a different domain