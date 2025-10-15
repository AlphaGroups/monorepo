/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
  async rewrites() {
    return [
      // Proxy /lms/* to the LMS app running on a different port
      // Since the LMS app has basePath="/lms", we need to include the /lms prefix in destination
      {
        source: "/lms/:path*",
        destination: `${process.env.NEXT_PUBLIC_LMS_API_URL || "http://localhost:4000"}/lms/:path*`, 
      },
    ];
  },
  // Enable compression
  compress: true,
  
  // Performance optimization headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
