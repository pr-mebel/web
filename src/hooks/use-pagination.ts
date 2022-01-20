import { useInterval } from '@/utils';
import { useState, useCallback, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';

type UsePaginationParams = {
    total: number;
    changePageIntervalTime?: number;
    resetIntervalTime?: number;
    resetIntervalOnChange?: boolean;
    onBeforeNext?: (...arg0: unknown[]) => unknown;
    onBeforePrev?: (...arg0: unknown[]) => unknown;
};

export const usePagination = ({
    total,
    resetIntervalTime,
    changePageIntervalTime,
    resetIntervalOnChange,
    onBeforeNext,
    onBeforePrev,
}: UsePaginationParams) => {
    const [activePage, setActivePage] = useState(0);
    const [triggered, setTriggered] = useState(false);

    const handleReset = useCallback(() => {
        setActivePage(0);
    }, []);

    const handleSet = useCallback((page: number) => {
        setActivePage(page);
    }, []);

    const handleNextPage = useCallback(() => {
        setTriggered(true);
        onBeforeNext?.();
        setActivePage((prev) => {
            if (prev === total) {
                return 0;
            }

            return prev + 1;
        });
    }, [total, onBeforeNext]);

    const handlePrevPage = useCallback(() => {
        setTriggered(true);
        onBeforePrev?.();
        setActivePage((prev) => {
            if (prev === 0) {
                return total;
            }

            return prev - 1;
        });
    }, [total, onBeforePrev]);

    /**
     * Крутит карусель
     */
    const { pause, unpause, reset } = useInterval(
        handleNextPage,
        changePageIntervalTime ?? null,
        resetIntervalTime
    );

    const handlers = useSwipeable({
        onSwipedLeft: () => handleNextPage(),
        onSwipedRight: () => handlePrevPage(),
        preventDefaultTouchmoveEvent: true,
    });

    useEffect(() => {
        if (triggered) {
            setTriggered(false);
            if (resetIntervalOnChange) {
                reset();
            }
        }
    }, [triggered, resetIntervalOnChange, reset]);

    return {
        current: activePage,
        swipableHandlers: handlers,
        interval: {
            pause,
            unpause,
            reset,
        },
        onSet: handleSet,
        onReset: handleReset,
        onNext: handleNextPage,
        onPrev: handlePrevPage,
    };
};
