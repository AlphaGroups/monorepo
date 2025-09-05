/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/lms/:path*",
        destination: "http://localhost:4000/lms/:path*", // proxy to LMS
      },
    ];
  },
};

module.exports = nextConfig;
