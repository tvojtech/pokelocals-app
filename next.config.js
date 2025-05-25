import { fileURLToPath } from 'node:url';

import { createJiti } from 'jiti';
const jiti = createJiti(fileURLToPath(import.meta.url));

await jiti.import('./src/env/env');

/** @type {import('next').NextConfig} */
const nextConfig = {
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
      {
        // Source path pattern for the files
        source: '/images/(.*)',
        headers: [
          {
            // The Cache-Control header
            key: 'Cache-Control',
            // public: Can be cached by intermediaries (like CDNs)
            // max-age=2368800: Cache for cca one month (in seconds)
            // immutable: Indicates the file content will never change for this URL
            value: 'public, max-age=2368800, must-revalidate, immutable',
          },
        ],
      },
    ];
  },
  experimental: {
    dynamicIO: false,
    useCache: true,
    ppr: false,
  },
};

export default nextConfig;
