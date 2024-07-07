// const { withSentryConfig } = require('@sentry/nextjs');

const moduleExports = {
  swcMinify: true,
  env: {
    VERCEL_ENV: process.env.VERCEL_ENV,
  },
  images: {
    domains: ['images.ctfassets.net'],
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

// const sentryWebpackPluginOptions = {
//     silent: true,
// };

// module.exports = withSentryConfig(moduleExports, sentryWebpackPluginOptions);
