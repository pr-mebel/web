module.exports = {
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
