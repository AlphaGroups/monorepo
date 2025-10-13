import type { NextConfig } from "next";
import { join } from "path";

const nextConfig: NextConfig = {
  // Remove basePath to avoid issues with proxy setup
  // basePath: "/lms",
  
  eslint: {
    ignoreDuringBuilds: true, // disables ESLint errors from breaking the build
  },
  outputFileTracingRoot: join(__dirname, "../../"), // Point to monorepo root to resolve multiple lockfiles warning
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
    ],
  },
  // Asset prefix for proper loading under proxy
  assetPrefix: "/lms",
  
  // Performance optimizations
  compress: true,
  
  // Optional: Add headers for security and performance
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
