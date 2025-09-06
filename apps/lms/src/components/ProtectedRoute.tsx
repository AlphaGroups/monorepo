// "use client";

// import { useRouter } from "next/navigation";
// import { useAuth } from "@/contexts/AuthContext";
// import { ReactNode, useEffect } from "react";

// interface ProtectedRouteProps {
//   children: ReactNode;
//   allowedRoles?: string[];
// }


























































// export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
//   const { user, isLoading } = useAuth();
//   const router = useRouter();

//   useEffect(() => {
//     if (!isLoading) {
//       if (!user) {
//         router.replace("/login"); // redirect to login
//       } else if (allowedRoles && (!user.role || !allowedRoles.includes(user.role))) {
//         router.replace("/"); // redirect if role not allowed
//       }
//     }
//   }, [user, isLoading, router, allowedRoles]);

//   if (isLoading || !user) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
//       </div>
//     );
//   }

//   return <>{children}</>;
// }
