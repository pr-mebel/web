import { useRequest } from 'ahooks';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useReducer } from 'react';

import { fetchCatalogByFilter } from '@/api';
import { batchSize } from '@/constants';
import { Filter, FilterField, FilterValue } from '@/entities';
import { checkIfNameAndValueAreKnown } from '@/utils';

import { useModal } from '../../use-modal';
import { initialState, reducer } from './reducer';

export const useCards = () => {
    const router = useRouter();
    const [state, dispatch] = useReducer(reducer, initialState);
    const cardModal = useModal({
        onClose: () => {
            dispatch({
                type: 'use-cards/setActiveItem',
                payload: null,
            });
        },
    });
    const cardModalFullScreen = useModal();

    const { run, loading } = useRequest(fetchCatalogByFilter, {
        manual: true,
        onSuccess: (res, params) => {
            dispatch({
                type: 'use-cards/setList',
                payload: {
                    section: params[0],
                    items: res.data,
                },
            });
            dispatch({
                type: 'use-cards/toggleLoading',
                payload: false,
            });
        },
        onError: () => {
            dispatch({
                type: 'use-cards/toggleLoading',
                payload: false,
            });
        },
    });

    const currentListFiltered = useMemo(() => {
        return state[state.filters.section].filter((item) => {
            let styleRes = true;
            if (state.filters.style !== 'any') {
                styleRes = !!item[state.filters.style];
            }

            let doorTypeRes = true;
            if (state.filters.doorType !== 'any') {
                doorTypeRes = !!item[state.filters.doorType];
            }

            return styleRes && doorTypeRes;
        });
    }, [state]);

    const currentList = useMemo(() => {
        return currentListFiltered.slice(0, state.page * batchSize);
    }, [currentListFiltered, state.page]);

    const bounds = useMemo(() => {
        if (state.currentItemID === null) {
            return null;
        }

        let hasPrev = false;
        let hasNext = false;

        if (state.currentItemID > 0) {
            hasPrev = true;
        }

        if (state.currentItemID < currentList.length - 1) {
            hasNext = true;
        }

        return {
            hasPrev,
            hasNext,
        };
    }, [currentList, state]);

    const selectedItem = useMemo(() => {
        if (state.currentItemID !== null) {
            return currentList[state.currentItemID];
        }

        return null;
    }, [currentList, state.currentItemID]);

    const hasMore = useMemo(() => {
        return currentListFiltered.length > state.page * batchSize;
    }, [currentListFiltered, state.page]);

    const handleChangeFilter = useCallback(({ name, value }: { name: FilterField; value: FilterValue }) => {
        dispatch({
            type: 'use-cards/setFilter',
            payload: {
                name,
                value,
            },
        });
        dispatch({
            type: 'use-cards/resetPage',
        });
    }, []);

    const handleClickCard = useCallback(
        (itemID: number) => {
            dispatch({
                type: 'use-cards/setActiveItem',
                payload: itemID,
            });
            cardModal.handleOpen();
        },
        [cardModal]
    );

    /**
     * Открыть следующий итем внутри модального окна итемов
     */
    const handleGoToNextCard = useCallback(() => {
        dispatch({
            type: 'use-cards/incrementActiveItem',
        });
    }, []);

    /**
     * Открыть предыдущий итем внутри модального окна итемов
     */
    const handleGoToPrevCard = useCallback(() => {
        dispatch({
            type: 'use-cards/decrementActiveItem',
        });
    }, []);

    /**
     * Подгрузить больше изображений в галерее
     */
    const handleShowMoreCards = useCallback(() => {
        dispatch({
            type: 'use-cards/incrementPage',
        });
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
            Object.entries(res).forEach(([name, value]) => {
                dispatch({
                    type: 'use-cards/setFilter',
                    payload: {
                        name: name as FilterField,
                        value,
                    },
                });
            });
        }

        dispatch({
            type: 'use-cards/setParamsParsed',
        });
    }, [router]);

    useEffect(() => {
        if (state.areParamsParsed && !state[state.filters.section].length && !state.loading) {
            dispatch({
                type: 'use-cards/toggleLoading',
                payload: true,
            });
            run(state.filters.section);
        }
    }, [run, loading, router.isReady, state]);

    useEffect(() => {
        if (hasMore && state.currentItemID && currentList.length - 5 <= state.currentItemID) {
            handleShowMoreCards();
        }
    }, [state.currentItemID, hasMore, handleShowMoreCards, currentList.length]);

    return {
        filters: state.filters,
        list: currentList,
        selectedItem,
        hasMore,
        bounds,
        isLoading: loading,
        cardModal: {
            ...cardModal,
            onOpenNext: handleGoToNextCard,
            onOpenPrev: handleGoToPrevCard,
        },
        cardModalFullScreen,
        onChangeFilter: handleChangeFilter,
        onCardClick: handleClickCard,
        onShowMore: handleShowMoreCards,
    };
};
