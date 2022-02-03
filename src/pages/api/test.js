import { withSentry } from '@sentry/nextjs';

const handler = async (req, res) => {
    throw new Error('API throw error test');
    // eslint-disable-next-line no-unreachable
    res.status(200).json({ name: 'John Doe' });
};

export default withSentry(handler);
