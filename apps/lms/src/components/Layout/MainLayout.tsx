// // "use client";

// // import React, { useState } from "react";
// // import { useAuth } from "@/contexts/AuthContext";
// // import Header from "./Header";
// // import Sidebar from "./Sidebar";
// // import { cn } from "@/lib/utils";

// // interface MainLayoutProps {
// //   children: React.ReactNode;
// // }

// // const MainLayout = ({ children }: MainLayoutProps) => {
// //   const { userProfile, isLoading } = useAuth();
// //   const [sidebarOpen, setSidebarOpen] = useState(true);
// //   const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

// //   if (isLoading) {
// //     return (
// //       <div className="flex justify-center items-center h-screen">
// //         Loading...
// //       </div>
// //     );
// //   }

// //   // Show only children if no userProfile (e.g., login page)
// //   if (!userProfile) return <>{children}</>;

// //   return (
// //     <div className="min-h-screen bg-background">
// //       <Header
// //         onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
// //         showSidebarToggle={true}
// //       />

// //       <div className="flex">
// //         {/* Sidebar */}
// //         <div
// //           className={cn(
// //             "transition-all duration-300 ease-in-out border-r bg-sidebar",
// //             sidebarCollapsed ? "w-16" : "w-64",
// //             sidebarOpen
// //               ? "translate-x-0"
// //               : "-translate-x-full md:translate-x-0",
// //             "fixed md:sticky top-16 h-[calc(100vh-4rem)] z-40 md:z-auto"
// //           )}
// //         >
// //           <Sidebar
// //             isCollapsed={sidebarCollapsed}
// //             userRole={userProfile.role}
// //             className="h-full"
// //           />

// //           {/* Collapse Toggle Button */}
// //           <button
// //             onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
// //             className="absolute -right-3 top-6 hidden md:flex items-center justify-center w-6 h-6 bg-background border border-border rounded-full shadow-sm hover:shadow-md transition-shadow"
// //           >
// //             <svg
// //               className={cn(
// //                 "w-3 h-3 transition-transform duration-200",
// //                 sidebarCollapsed ? "rotate-180" : ""
// //               )}
// //               fill="none"
// //               stroke="currentColor"
// //               viewBox="0 0 24 24"
// //             >
// //               <path
// //                 strokeLinecap="round"
// //                 strokeLinejoin="round"
// //                 strokeWidth={2}
// //                 d="M15 19l-7-7 7-7"
// //               />
// //             </svg>
// //           </button>
// //         </div>

// //         {/* Mobile Sidebar Overlay */}
// //         {sidebarOpen && (
// //           <div
// //             className="fixed inset-0 bg-black/50 z-30 md:hidden"
// //             onClick={() => setSidebarOpen(false)}
// //           />
// //         )}

// //         {/* Main Content */}
// //         <main className="flex-1 transition-all duration-300 ease-in-out min-h-[calc(100vh-4rem)] p-6">
// //           <div className="max-w-7xl mx-auto">{children}</div>
// //         </main>
// //       </div>
// //     </div>
// //   );
// // };

// // export default MainLayout;

// "use client";

// import React, { useState } from "react";
// import { useAuth } from "@/contexts/AuthContext";
// import Header from "./Header";
// import Sidebar from "./Sidebar";
// import { cn } from "@/lib/utils";
// import { usePathname } from "next/navigation";

// interface MainLayoutProps {
//   children: React.ReactNode;
// }

// const MainLayout = ({ children }: MainLayoutProps) => {
//   const { userProfile, isLoading } = useAuth();
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
//   const pathname = usePathname();

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         Loading...
//       </div>
//     );
//   }

//   // pages that should NOT use MainLayout
//   const noLayoutRoutes = ["/lms/login"];
//   const isNoLayout = noLayoutRoutes.includes(pathname);

//   if (isNoLayout) {
//     return <>{children}</>;
//   }

//   return (
//     <div className="min-h-screen bg-background">
//       <Header
//         onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
//         showSidebarToggle={true}
//       />

//       <div className="flex">
//         <div
//           className={cn(
//             "transition-all duration-300 ease-in-out border-r bg-sidebar",
//             sidebarCollapsed ? "w-16" : "w-64",
//             sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
//             "fixed md:sticky top-16 h-[calc(100vh-4rem)] z-40 md:z-auto"
//           )}
//         >
//           <Sidebar
//             isCollapsed={sidebarCollapsed}
//             className="h-full"
//             userRole={userProfile?.role}
//           />
//         </div>

//         {sidebarOpen && (
//           <div
//             className="fixed inset-0 bg-black/50 z-30 md:hidden"
//             onClick={() => setSidebarOpen(false)}
//           />
//         )}

//         <main className="flex-1 transition-all duration-300 ease-in-out min-h-[calc(100vh-4rem)] p-6">
//           <div className="max-w-7xl mx-auto">{children}</div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default MainLayout;
"use client";
import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { cn } from "@/lib/utils";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const { userProfile, isLoading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Return early if not mounted to prevent hydration issues
  if (!isMounted || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // If no user profile, don't render the layout
  if (!userProfile) {
    return <div className="min-h-screen flex items-center justify-center">Access denied</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        showSidebarToggle={true}
      />

      <div className="flex">
        <div
          className={cn(
            "transition-all duration-300 ease-in-out border-r bg-sidebar",
            sidebarCollapsed ? "w-16" : "w-64",
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0",
            "fixed md:sticky top-16 h-[calc(100vh-4rem)] z-40 md:z-auto"
          )}
        >
          <Sidebar
            isCollapsed={sidebarCollapsed}
            className="h-full"
            userRole={userProfile?.role}
          />
        </div>

        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <main className="flex-1 transition-all duration-300 ease-in-out min-h-[calc(100vh-4rem)] p-6">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
