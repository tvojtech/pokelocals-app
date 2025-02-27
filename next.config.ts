import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['cdn.discordapp.com'],
  },
  experimental: {
    // dynamicIO: true,
  },
};

export default nextConfig;
