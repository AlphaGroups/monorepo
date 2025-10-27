/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,

  // ✅ For static export mode
  output: "export",
  trailingSlash: true,

  // ✅ Fixes Next.js workspace root detection warning
  outputFileTracingRoot: __dirname,

  // ✅ Required for static export (Next.js 15+)
  images: {
    unoptimized: true,
  },

  // ✅ Build-time environment variable injection
  env: {
    NEXT_PUBLIC_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_LMS_API_URL:
      process.env.NEXT_PUBLIC_LMS_API_URL || "http://localhost:4000",
  },

  // ✅ Skip rewrites for static export — handled by SWA instead
  // Keep this only for local development (when running `yarn dev`)
  async rewrites() {
    if (process.env.NODE_ENV === "development") {
      return [
        {
          source: "/lms/:path*",
          destination: "http://localhost:4000/lms/:path*",
        },
      ];
    }
    return [];
  },

  compress: true,

  // ✅ Security + Performance headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
