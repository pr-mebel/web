import { captureException } from '@sentry/nextjs';

export const logException = (error: unknown, source: string, other: Record<string, unknown>) => {
    captureException(error, {
        extra: {
            source,
            ...other,
        },
    });
};
