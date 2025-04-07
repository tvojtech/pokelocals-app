import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['cdn.discordapp.com'],
  },
  async headers() {
    return [
      {
        // Source path pattern for the files
        source: '/(favicon.svg|favicon-.*.png|manifest.webmanifest)',
        headers: [
          {
            // The Cache-Control header
            key: 'Cache-Control',
            // public: Can be cached by intermediaries (like CDNs)
            // max-age=592200: Cache for 7 days (in seconds)
            // immutable: Indicates the file content will never change for this URL
            value: 'public, max-age=592200, must-revalidate, immutable',
          },
        ],
      },
      {
        // Source path pattern for the files
        source: '/images/(logo-.*.svg)',
        headers: [
          {
            // The Cache-Control header
            key: 'Cache-Control',
            // public: Can be cached by intermediaries (like CDNs)
            // max-age=592200: Cache for 7 days (in seconds)
            // immutable: Indicates the file content will never change for this URL
            value: 'public, max-age=592200, must-revalidate, immutable',
          },
        ],
      },
    ];
  },
  experimental: {
    // dynamicIO: true,
    // ppr: true,
  },
};

export default nextConfig;
