import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  target: process.env.NEXT_PRIVATE_TARGET === 'server' ? 'server' : 'experimental-serverless-trace',
  generateBuildId: async () => {
    return 'build-' + Date.now();
  }
};

export default nextConfig;
