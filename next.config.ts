import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['cdn.discordapp.com'],
  },
  experimental: {
    // dynamicIO: true,
    // ppr: true,
  },
};

export default nextConfig;
