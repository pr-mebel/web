import React, { FC, useCallback, useState } from 'react';
import { useRequest } from 'ahooks';
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
import { useModal } from '@/hooks';
import { Filter } from '@/entities';
import { fetchCatalogByFilter } from '@/utils/api';

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
    const [filters, setFilters] = useState<Filter>({
        doorType: 'any',
        section: 'cupboard',
        style: 'any',
    });
    const [pagination, setPagination] = useState({
        current: 1,
        hasMore: false,
    })
    const getCatalogRequest = useRequest(() => fetchCatalogByFilter(filters, pagination.current), {
        refreshDeps: [filters, pagination],
    });
    const [currentItemID, setCurrentItemID] = useState<number | undefined>();
    const cardModal = useModal({
        onOpen: (itemID: number) => {
            setCurrentItemID(itemID);
        },
        onClose: () => {
            setCurrentItemID(undefined);
        },
    });
    const cardModalFullScreen = useModal({
        onOpen: (itemID: number) => {
            setCurrentItemID(itemID);
        },
        onClose: () => {
            setCurrentItemID(undefined);
        },
    });
    const classes = useStyles();

    /**
     * Поменять значение одного из параметра фильтра
     */
    const handleChangeFilter = useCallback(
        ({ name, value }: { name: keyof Filter; value: Filter}) => {
            setFilters((prev) => ({
                ...prev,
                [name]: value,
            }));
        },
        [],
    );

    /**
     * Открыть следующий итем внутри модального окна итемов
     */
    const handleGoToNextCard = useCallback(() => {
        setCurrentItemID((prev) => prev !== undefined ? prev + 1 : prev);
    }, []);

    /**
     * Открыть предыдущий итем внутри модального окна итемов
     */
    const handleGoToPrevCard = useCallback(() => {
        setCurrentItemID((prev) => prev !== undefined ? prev - 1 : prev);
    }, []);

    /**
     * Подгрузить больше изображений в галерее
     */
    const handleDownloadMoreCards = useCallback(() => {
        setPagination((prev) => ({
            current: prev.current + 1,
            hasMore: false,
        }));
    }, []);

    /**
     * Разбирает поиск из урла, подставляет параметры в селекты, и делает по ним запрос
     */
    // useEffect(() => {
    //     const { query } = router;

    //     if (Object.values(query).length) {
    //         Object.entries(query).forEach(([key, value]) => {
    //             if (typeof value === 'string') {
    //                 const pair = { name: key, value };

    //                 if (checkIfNameAndValueAreKnown(pair)) {
    //                     dispatch(
    //                         changeFilter(pair),
    //                     );
    //                 }
    //             }

    //         });
    //     } else {
    //         dispatch(resetFilters());
    //     }
    // }, [router.query, dispatch]);

    return (
        <>
            <main>
                <Lead sectionId={filters.section} />
                <section className={classes.filterSection}>
                    <Filters filter={filters} onChange={handleChangeFilter} />
                </section>
                <section className={classes.gallerySection}>
                    <Gallery
                        items={getCatalogRequest.data?.data.items || []}
                        isLoading={getCatalogRequest.loading}
                        hasMore={pagination.hasMore}
                        onCardClick={cardModal.handleOpen}
                        onLoadMore={handleDownloadMoreCards}
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
            {cardModal.isOpen && currentItemID && (
                <CardPopup
                    items={getCatalogRequest.data?.data.items || []}
                    currentItemId={currentItemID}
                    isOpen={cardModal.isOpen}
                    isLoading={getCatalogRequest.loading}
                    onClose={cardModal.handleClose}
                    onClickBack={handleGoToPrevCard}
                    onClickForward={handleGoToNextCard}
                    onDownloadMoreCards={handleDownloadMoreCards}
                    onFullScreenPopupOpen={cardModalFullScreen.handleOpen}
                />
            )}
            {cardModalFullScreen.isOpen && currentItemID &&  (
                <FullScreenPopup
                    img={getCatalogRequest.data?.data.items[currentItemID].imageFull.url || ''}
                    isOpen={cardModalFullScreen.isOpen}
                    onClose={cardModalFullScreen.handleClose}
                />
            )}
        </>
    );
};

export default Catalog;
