import type { NextConfig } from "next";
import { join } from "path";

const nextConfig: NextConfig = {
  // Use basePath only in development to avoid issues when deployed as standalone app
  basePath: process.env.NODE_ENV === 'development' ? "/lms" : "",
  
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
  // Use assetPrefix conditionally as well
  assetPrefix: process.env.NODE_ENV === 'development' ? "/lms" : "",
  
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
