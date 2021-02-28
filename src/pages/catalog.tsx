import React, { FC, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {
    DesignOffer,
    Map,
    ShopImg,
    CardPopup,
    Filters,
    Gallery,
    Lead,
    Questions,
    FullScreenPopup,
} from '@/components';
import { useRouter } from 'next/router';
import {
    fetchCatalog,
    changeFilter,
    resetCatalog,
    resetFilters,
    openCardPopup,
    closeCardPopup,
    goToNextCard,
    goToPrevCard,
    changePage,
    openFullScreenPopup,
    closeFullScreenPopup,
} from '@/redux';
import { filters, FilterField, SectionId, DoorTypeId, StyleId } from '@/entities';
import { catalogSelector } from '@/selectors';
import { checkIfNameAndValueAreKnown } from '@/utils';

const useStyles = makeStyles((theme) => ({
    filterSection: {
        marginTop: '60px',
    },
    gallerySection: {
        marginTop: '20px',
        marginBottom: '60px',
    },
    designOfferSection: {
        margin: '40px 0',
    },
    shopImgSection: {
        marginTop: '40px',
    },
    mapSection: {
        marginTop: '80px',
    },
    [theme.breakpoints.down('md')]: {
        filterSection: {
            marginTop: '40px',
        },
        mapSection: {
            marginTop: '60px',
        },
    },
    [theme.breakpoints.down('sm')]: {
        mapSection: {
            marginTop: '40px',
        },
    },
}));

const Catalog: FC = () => {
    const classes = useStyles();
    const router = useRouter();
    const dispatch = useDispatch();
    const {
        items,
        hasMore,
        isLoading,
        page,
        filter,
        currentItemId,
        isCardPopupOpen,
        isFullScreenPopupOpen,
    } = useSelector(catalogSelector);

    /**
     * Применить фильтр
     */
    const handleApplyFilter = useCallback(() => {
        dispatch(resetCatalog());
        dispatch(fetchCatalog());
    }, [dispatch]);

    /**
     * Открыть картинку на полный экран
     */
    const handleOpenFullScreenPopup = useCallback(
        (itemId) => {
            dispatch(openFullScreenPopup(itemId));
        },
        [dispatch],
    );

    /**
     * Закрыть картинку, открытую на полный экран
     */
    const handleCloseFullScreenPopup = useCallback(() => {
        dispatch(closeFullScreenPopup());
    }, [dispatch]);

    /**
     * Поменять значение одного из параметра фильтра
     */
    const handleChangeFilter = useCallback(
        ({ name, value }) => {
            dispatch(
                changeFilter({
                    name,
                    value,
                }),
            );

            handleApplyFilter();
        },
        [dispatch, handleApplyFilter],
    );

    /**
     * Открыть модальное окно с итемом
     */
    const handleCardClick = useCallback(
        (itemId) => {
            dispatch(openCardPopup(itemId));
        },
        [dispatch],
    );

    /**
     * Закрыть модальное окно итемов
     */
    const handleCloseCardPopup = useCallback(() => {
        dispatch(closeCardPopup());
    }, [dispatch]);

    /**
     * Открыть следующий итем внутри модального окна итемов
     */
    const handleGoToNextCard = useCallback(() => {
        dispatch(goToNextCard());
    }, [dispatch]);

    /**
     * Открыть предыдущий итем внутри модального окна итемов
     */
    const handleGoToPrevCard = useCallback(() => {
        dispatch(goToPrevCard());
    }, [dispatch]);

    /**
     * Подгрузить больше изображений в галерее
     */
    const handleDownloadMoreCards = useCallback(() => {
        dispatch(changePage(page + 1));
        dispatch(fetchCatalog());
    }, [dispatch, page]);

    /**
     * Разбирает поиск из урла, подставляет параметры в селекты, и делает по ним запрос
     */
    useEffect(() => {
        const { query } = router;

        if (Object.values(query).length) {
            Object.entries(query).forEach(([key, value]) => {
                if (typeof value === 'string') {
                    const pair = { name: key, value };
                    
                    if (checkIfNameAndValueAreKnown(pair)) {
                        dispatch(
                            changeFilter(pair),
                        );
                    }
                }

            });
        } else {
            dispatch(resetFilters());
        }
        handleApplyFilter();
    }, [router.query, dispatch, handleApplyFilter]);

    return (
        <>
            <main>
                <Lead sectionId={filter.section} />
                <section className={classes.filterSection}>
                    <Filters filter={filter} options={filters} onChange={handleChangeFilter} />
                </section>
                <section className={classes.gallerySection}>
                    <Gallery
                        items={items}
                        isLoading={isLoading}
                        hasMore={hasMore}
                        page={page}
                        onCardClick={handleCardClick}
                    />
                </section>
                <section className={classes.designOfferSection}>
                    <DesignOffer />
                </section>
                <section className={classes.questionsSection}>
                    <Questions />
                </section>
                <section className={classes.shopImgSection}>
                    <ShopImg />
                </section>
                <section className={classes.mapSection}>
                    <Map />
                </section>
            </main>
            {isCardPopupOpen && (
                <CardPopup
                    items={items}
                    currentItemId={currentItemId}
                    isOpen={isCardPopupOpen}
                    isLoading={isLoading}
                    onClose={handleCloseCardPopup}
                    onClickBack={handleGoToPrevCard}
                    onClickForward={handleGoToNextCard}
                    onDownloadMoreCards={handleDownloadMoreCards}
                    onFullScreenPopupOpen={handleOpenFullScreenPopup}
                />
            )}
            {isFullScreenPopupOpen && (
                <FullScreenPopup
                    img={items[currentItemId].imageFull.url}
                    isOpen={isFullScreenPopupOpen}
                    onClose={handleCloseFullScreenPopup}
                />
            )}
        </>
    );
};

export default Catalog;
