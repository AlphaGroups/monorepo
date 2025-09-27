// "use client";
// import React, { useState, useEffect } from 'react';
// import { usePathname, useSearchParams } from 'next/navigation';

// interface GlobalLoaderContextType {
//   isLoading: boolean;
//   setLoading: (loading: boolean) => void;
// }

// const GlobalLoaderContext = React.createContext<GlobalLoaderContextType | undefined>(undefined);

// export const useGlobalLoader = () => {
//   const context = GlobalLoaderContext;
//   if (!context) {
//     throw new Error('useGlobalLoader must be used within a GlobalLoaderProvider');
//   }
//   return context;
// };

// export const GlobalLoaderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [isLoading, setIsLoading] = useState(false);
//   const pathname = usePathname();
//   const searchParams = useSearchParams();

//   useEffect(() => {
//     // Hide loader when route changes
//     setIsLoading(false);
//   }, [pathname, searchParams]);

//   useEffect(() => {
//     let requestCount = 0;
    
//     const handleStart = () => {
//       requestCount++;
//       setIsLoading(true);
//     };
    
//     const handleEnd = () => {
//       requestCount--;
//       if (requestCount <= 0) {
//         requestCount = 0;
//         setIsLoading(false);
//       }
//     };

//     window.addEventListener('globalLoadingStart', handleStart);
//     window.addEventListener('globalLoadingEnd', handleEnd);

//     // Cleanup
//     return () => {
//       window.removeEventListener('globalLoadingStart', handleStart);
//       window.removeEventListener('globalLoadingEnd', handleEnd);
//     };
//   }, []);

//   const setLoading = (loading: boolean) => {
//     setIsLoading(loading);
//   };

//   return (
//     <GlobalLoaderContext.Provider value={{ isLoading, setLoading }}>
//       {children}
//       {isLoading && (
//         <div className="fixed top-0 left-0 right-0 h-1 bg-primary z-[9999]">
//           <div className="h-full bg-primary animate-pulse"></div>
//         </div>
//       )}
//     </GlobalLoaderContext.Provider>
//   );
// };

"use client";
import React, { useState, useEffect, useContext } from "react";
import { usePathname, useSearchParams } from "next/navigation";

interface GlobalLoaderContextType {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
}

const GlobalLoaderContext = React.createContext<GlobalLoaderContextType | undefined>(undefined);

// ✅ Corrected hook
export const useGlobalLoader = () => {
  const context = useContext(GlobalLoaderContext);
  if (!context) {
    throw new Error("useGlobalLoader must be used within a GlobalLoaderProvider");
  }
  return context;
};

export const GlobalLoaderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Hide loader when route changes
    setIsLoading(false);
  }, [pathname, searchParams]);

  useEffect(() => {
    let requestCount = 0;

    const handleStart = () => {
      requestCount++;
      setIsLoading(true);
    };

    const handleEnd = () => {
      requestCount--;
      if (requestCount <= 0) {
        requestCount = 0;
        setIsLoading(false);
      }
    };

    window.addEventListener("globalLoadingStart", handleStart);
    window.addEventListener("globalLoadingEnd", handleEnd);

    return () => {
      window.removeEventListener("globalLoadingStart", handleStart);
      window.removeEventListener("globalLoadingEnd", handleEnd);
    };
  }, []);

  const setLoading = (loading: boolean) => {
    setIsLoading(loading);
  };

  return (
    <GlobalLoaderContext.Provider value={{ isLoading, setLoading }}>
      {children}
      {isLoading && (
        <div className="fixed top-0 left-0 right-0 h-1 bg-primary z-[9999]">
          <div className="h-full bg-primary animate-pulse"></div>
        </div>
      )}
    </GlobalLoaderContext.Provider>
  );
};
