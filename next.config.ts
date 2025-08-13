import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disable static generation for now due to Next.js 15 issue
  trailingSlash: false,
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  eslint: {
    ignoreDuringBuilds: true, // Allow build to continue with warnings
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
