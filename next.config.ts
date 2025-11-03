import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',

  // Enable instrumentation hook to control Prisma initialization
  // This prevents database connection attempts during Docker build
  experimental: {
    instrumentationHook: true,
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
        port: '',
        pathname: '/storage/v1/object/**',
      },
    ],
  },
};

export default nextConfig;
