import posthog from 'posthog-js';

import { env } from '@/env';

if (typeof window !== 'undefined') {
  posthog.init(env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
    person_profiles: 'always',
    loaded: (posthog) => {
      if (env.NODE_ENV === 'development') posthog.debug();
    },
  });
}
