import { noop } from 'lodash';
import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * https://stackoverflow.com/questions/56952038/how-to-reset-setinterval-function-using-react-hooks
 */
export const useInterval = (callback: (...args: unknown[]) => unknown, delay: number | null, resetIntervalTime = 0) => {
    const savedCallback = useRef<typeof callback>(noop);
    const intervalId = useRef<NodeJS.Timeout | null>(null);
    const [currentDelay, setDelay] = useState<number | null>(delay);

    const pause = useCallback(() => {
        setDelay(null);
    }, []);

    const unpause = useCallback(() => {
        setDelay(delay);
    }, [delay]);

    const clear = useCallback(() => {
        if (intervalId.current) {
            clearInterval(intervalId.current);
        }
    }, [intervalId]);

    const reset = useCallback(() => {
        pause();

        setTimeout(unpause, resetIntervalTime);
    }, [pause, unpause, resetIntervalTime]);

    // Remember the latest function.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        function tick() {
            savedCallback.current();
        }

        if (intervalId.current) clear();

        if (currentDelay !== null) {
            intervalId.current = setInterval(tick, currentDelay);
        }

        return clear;
    }, [currentDelay, clear]);

    return {
        pause,
        unpause,
        reset,
    };
};
