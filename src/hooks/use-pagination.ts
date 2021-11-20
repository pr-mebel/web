import { useState, useCallback } from 'react';
import { useSwipeable } from 'react-swipeable';

type UsePaginationParams = {
    total: number;
};

export const usePagination = ({ total }: UsePaginationParams) => {
    const [activePage, setActivePage] = useState(0);

    const handleReset = useCallback(() => {
        setActivePage(0);
    }, []);

    const handleSet = useCallback((page: number) => {
        setActivePage(page);
    }, []);

    const handleNextPage = useCallback(() => {
        setActivePage((prev) => {
            if (prev === total) {
                return 0;
            }

            return prev + 1;
        });
    }, [total]);

    const handlePrevPage = useCallback(() => {
        setActivePage((prev) => {
            if (prev === 0) {
                return total;
            }

            return prev - 1;
        });
    }, [total]);

    const handlers = useSwipeable({
        onSwipedLeft: () => handleNextPage(),
        onSwipedRight: () => handlePrevPage(),
        preventDefaultTouchmoveEvent: true,
    });

    return {
        current: activePage,
        swipableHandlers: handlers,
        onSet: handleSet,
        onReset: handleReset,
        onNext: handleNextPage,
        onPrev: handlePrevPage,
    };
};
