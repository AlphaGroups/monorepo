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
  const [sidebarOpen, setSidebarOpen] = useState(false); // Changed to false by default for mobile
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Check if screen is mobile/tablet and set appropriate default state
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false); // Hide sidebar on mobile by default
      } else {
        setSidebarOpen(true);  // Show sidebar on desktop
      }
    };

    handleResize(); // Set initial state
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
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
    <div className="flex flex-col min-h-screen bg-background">
      <Header
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        showSidebarToggle={true}
        sidebarOpen={sidebarOpen}
      />
      <div className="flex flex-1 overflow-hidden">
        <div
          className={cn(
            "transition-all duration-300 ease-in-out border-r bg-sidebar",
            sidebarCollapsed ? "w-16" : "w-64",
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0",
            "fixed inset-y-0 top-16 h-[calc(100vh-4rem)] z-50 md:z-0", // Fixed positioning and proper z-index
            "max-w-[80%] sm:max-w-xs", // Limit sidebar width on small screens
            "overflow-y-auto" // Enable scrolling within sidebar if content overflows
          )}
          style={{ 
            msOverflowStyle: 'none',  // Hide scrollbar for Internet Explorer, Edge
            scrollbarWidth: 'none',   // Hide scrollbar for Firefox
          }}
          aria-hidden={!sidebarOpen}
        >
          <div 
            className="w-full h-full overflow-y-auto"
            style={{ 
              msOverflowStyle: 'none',  // Hide scrollbar for Internet Explorer, Edge
              scrollbarWidth: 'none',   // Hide scrollbar for Firefox
            }}
          >
            <Sidebar
              isCollapsed={sidebarCollapsed}
              className="h-full"
              userRole={userProfile?.role}
              onClose={() => setSidebarOpen(false)} // Close sidebar on mobile when navigation items are clicked
            />
          </div>
        </div>

        {/* Mobile overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/60 z-40 md:hidden transition-opacity duration-300"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
        )}
        
        {/* Mobile close button - positioned outside the sidebar content */}
        {sidebarOpen && (
          <button
            className="md:hidden fixed top-20 right-4 p-2 rounded-full bg-background border border-border z-50 shadow-lg"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        )}
        
        {/* Desktop collapse/expand button */}
        <button
          className={cn(
            "hidden md:block p-2 rounded-full bg-background border border-border fixed top-1/2 transform -translate-y-1/2 z-40 shadow-md transition-all duration-300",
            sidebarOpen ? "left-[16.5rem]" : "left-4",
            sidebarCollapsed && "left-[4.5rem]"
          )}
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <svg 
            className={`w-3 h-3 transition-transform duration-200 ${sidebarCollapsed ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M15 19l-7-7 7-7" 
            />
          </svg>
        </button>

        <main 
          className={cn(
            "flex-1 transition-all duration-300 ease-in-out p-6",
            sidebarOpen && !sidebarCollapsed ? "md:ml-64" : "md:ml-0", // Add margin when sidebar is open and not collapsed
            sidebarCollapsed && "md:ml-16", // Add smaller margin when sidebar is collapsed
            "overflow-y-auto relative" // Enable scrolling only for main content and add relative positioning
          )}
        >
          <div className="max-w-7xl mx-auto w-full h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
