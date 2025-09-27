import type { NextConfig } from "next";
import { join } from "path";

const nextConfig: NextConfig = {
  basePath: "/lms", // prefix all routes with /lms
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
};

export default nextConfig;
