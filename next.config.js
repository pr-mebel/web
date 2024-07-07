const moduleExports = {
  swcMinify: true,
  env: {
    VERCEL_ENV: process.env.VERCEL_ENV,
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

module.exports = moduleExports;
