import { useRequest } from 'ahooks';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { fetchCatalogByFilter } from '@/api';
import { batchSize } from '@/constants';
import { Filter, FilterField, FilterValue, Item, SectionID } from '@/entities';
import { checkIfNameAndValueAreKnown } from '@/utils';

import { useModal } from '..';

const initialFilters = {
    doorType: 'any',
    section: 'cupboard',
    style: 'any',
} as Filter;

export const useCards = () => {
    const router = useRouter();

    const [filters, setFilters] = useState(initialFilters);
    const [list, setList] = useState<Item[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);
    const [isDataOutdated, setIsDataOutdated] = useState(false);
    const [currentItemID, setCurrentItemID] = useState<number | null>(null);
    const cardModal = useModal({
        onClose: () => {
            setCurrentItemID(null);
        },
    });
    const cardModalFullScreen = useModal();

    const { run, loading } = useRequest(fetchCatalogByFilter, {
        manual: true,
        onSuccess: (res) => {
            setList((prev) => [...prev, ...res.data.items]);
            setHasMore(res.data.total > page * batchSize);
        },
    });

    const bounds = useMemo(() => {
        if (currentItemID === null) {
            return null;
        }

        let hasPrev = false;
        let hasNext = false;

        if (currentItemID > 0) {
            hasPrev = true;
        }

        if (currentItemID < list.length - 1) {
            hasNext = true;
        }

        return {
            hasPrev,
            hasNext,
        };
    }, [list, currentItemID]);

    const selectedItem = useMemo(() => {
        if (currentItemID !== null && currentItemID < list.length) {
            return list[currentItemID];
        }

        return null;
    }, [list, currentItemID]);

    const handleChangeFilter = useCallback(({ name, value }: { name: FilterField; value: FilterValue }) => {
        if (name === 'section') {
            setFilters({
                ...initialFilters,
                [name]: value as SectionID,
            });
        } else {
            setFilters((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
        setList([]);
        setPage(1);
        setHasMore(false);
        setIsDataOutdated(true);
    }, []);

    const handleClickCard = useCallback(
        (itemID: number) => {
            setCurrentItemID(itemID);
            cardModal.handleOpen();
        },
        [cardModal]
    );

    /**
     * Открыть следующий итем внутри модального окна итемов
     */
    const handleGoToNextCard = useCallback(() => {
        setCurrentItemID((prev) => (prev !== null ? prev + 1 : prev));
    }, []);

    /**
     * Открыть предыдущий итем внутри модального окна итемов
     */
    const handleGoToPrevCard = useCallback(() => {
        setCurrentItemID((prev) => (prev !== null ? prev - 1 : prev));
    }, []);

    /**
     * Подгрузить больше изображений в галерее
     */
    const handleDownloadMoreCards = useCallback(() => {
        setPage((prev) => prev + 1);
        setHasMore(false);
        setIsDataOutdated(true);
    }, []);

    useEffect(() => {
        const { query, isReady } = router;
        let res: Partial<Filter> = {};

        if (!isReady) return;

        Object.entries(query).forEach(([key, value]) => {
            if (typeof value === 'string') {
                const pair = { name: key, value };

                if (checkIfNameAndValueAreKnown(pair)) {
                    res = {
                        ...res,
                        [pair.name]: pair.value,
                    };
                }
            }
        });

        if (Object.values(res).length) {
            setFilters((prev) => ({
                ...prev,
                ...res,
            }));
        }

        setList([]);
        setPage(1);
        setHasMore(false);
        setIsDataOutdated(true);
    }, [router]);

    useEffect(() => {
        if (hasMore && currentItemID && list.length - 5 <= currentItemID) {
            handleDownloadMoreCards();
        }
    }, [list, currentItemID, hasMore, handleDownloadMoreCards]);

    useEffect(() => {
        if (isDataOutdated) {
            run(filters, page);
            setIsDataOutdated(false);
        }
    }, [isDataOutdated, filters, page, run]);

    return {
        filters,
        list,
        selectedItem,
        bounds,
        hasMore,
        isLoading: loading,
        cardModal: {
            ...cardModal,
            onOpenNext: handleGoToNextCard,
            onOpenPrev: handleGoToPrevCard,
        },
        cardModalFullScreen,
        onChangeFilter: handleChangeFilter,
        onCardClick: handleClickCard,
        onDownloadMore: handleDownloadMoreCards,
    };
};
