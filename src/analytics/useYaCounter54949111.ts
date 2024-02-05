import { useCallback, useEffect, useState } from 'react';

import { isProduction } from '@/utils';

import { YaCounter54949111Goal } from './events';

export const useYaCounter54949111 = () => {
    const [ready, setReady] = useState(false);

    const handleTrackEvent = useCallback(
        (event: YaCounter54949111Goal) => {
            if (!ready) return;

            window.yaCounter54949111?.reachGoal(event);
        },
        [ready]
    );

    useEffect(() => {
        setReady(isProduction());
    }, []);

    return {
        track: handleTrackEvent,
    };
};
