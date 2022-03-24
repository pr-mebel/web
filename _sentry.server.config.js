import * as Sentry from '@sentry/nextjs';

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;

Sentry.init({
    dsn: SENTRY_DSN || 'https://fa6b8fb3222b4a9a8f93d234051e7625@o573653.ingest.sentry.io/5724237',
    tracesSampleRate: 1.0,
    environment: process.env.VERCEL_ENV,
});
