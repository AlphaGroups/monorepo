// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   // basePath: "/lms", // prefix all routes with /lms
//   eslint: {
//     ignoreDuringBuilds: true, // ✅ disables ESLint errors from breaking build
//   },
// };

// export default nextConfig;
// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   eslint: {
//     ignoreDuringBuilds: true,
//   },
//   async rewrites() {
//     return [
//       {
//         source: '/lms/:path*',
//         destination: 'http://localhost:4000/lms/:path*', // forward to LMS
//       },
//     ];
//   },
// };

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/lms/:path*',
        destination: `${process.env.NEXT_PUBLIC_LMS_API_URL}/lms/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
