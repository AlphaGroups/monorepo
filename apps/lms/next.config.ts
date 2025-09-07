import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/lms", // prefix all routes with /lms
  eslint: {
    ignoreDuringBuilds: true, // disables ESLint errors from breaking the build
  },
};

export default nextConfig;
