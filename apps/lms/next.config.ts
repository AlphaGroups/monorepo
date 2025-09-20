import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/lms", // prefix all routes with /lms
  eslint: {
    ignoreDuringBuilds: true, // disables ESLint errors from breaking the build
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
    ],
  },
};

export default nextConfig;
