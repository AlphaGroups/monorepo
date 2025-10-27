/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,

  output: "export",
  trailingSlash: true,
  outputFileTracingRoot: __dirname,

  images: {
    unoptimized: true,
  },

  env: {
    NEXT_PUBLIC_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_LMS_API_URL:
      process.env.NEXT_PUBLIC_LMS_API_URL || "http://localhost:4000",
  },

  async rewrites() {
    // Use environment variable for API URL, default to localhost in development
    const apiBaseUrl = process.env.NEXT_PUBLIC_LMS_API_URL || "http://localhost:4000";
    
    return [
      {
        source: "/lms/:path*",
        destination: `${apiBaseUrl}/lms/:path*`,
      },
    ];
  },

  compress: true,
};

module.exports = nextConfig;
