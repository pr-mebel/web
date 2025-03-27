await import('./src/env.js');

/** @type {import("next").NextConfig} */
const config = {
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.ctfassets.net',
        port: '',
      },
    ],
  },
  redirects: async () => [
    {
      source: '/catalog.html',
      destination: '/catalog',
      permanent: true,
    },
  ],
};

export default config;
