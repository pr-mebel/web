import { env } from '@/env';

export const isProduction = () => env.NEXT_PUBLIC_NODE_ENV === 'production';
