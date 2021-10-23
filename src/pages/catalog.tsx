import React, { FC, useCallback, useState, useEffect } from 'react';
import { useRequest } from 'ahooks';
import { useRouter } from 'next/router';
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
import { Filter, FilterField, FilterValue, Item } from '@/entities';
import { fetchCatalogByFilter } from '@/utils/api';
import { checkIfNameAndValueAreKnown } from '@/utils';
import { batchSize } from '@/constants';

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

const initialFilters = {
    doorType: 'any',
    section: 'cupboard',
    style: 'any',
} as Filter;

const Catalog: FC = () => {
    const router = useRouter();
    const [filters, setFilters] = useState(initialFilters);
    const [items, setItems] = useState<Item[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);
    const getCatalogRequest = useRequest(() => fetchCatalogByFilter(filters, page), {
        refreshDeps: [filters, page],
        onSuccess: (res) => {
            setItems((prev) => [...prev, ...res.data.items]);
            setHasMore(res.data.total > page * batchSize);
        },
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
    const cardModalFullScreen = useModal();
    const classes = useStyles();

    /**
     * Поменять значение одного из параметра фильтра
     */
    const handleChangeFilter = useCallback(
        ({ name, value }: { name: FilterField; value: FilterValue}) => {
            setFilters((prev) => ({
                ...prev,
                [name]: value,
            }));
            setPage(1);
            setHasMore(false);
            setItems([]);
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
        setPage((prev) => prev + 1);
        setHasMore(false);
    }, []);

    /**
     * Разбирает поиск из урла, подставляет параметры в селекты, и делает по ним запрос
     */
    useEffect(() => {
        const { query } = router;
        let res: Partial<Filter> = {};

        if (Object.values(query).length) {
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
        } else {
            setFilters(initialFilters);
        }
    }, [router]);

    return (
        <>
            <main>
                <Lead sectionID={filters.section} />
                <section className={classes.filterSection}>
                    <Filters filter={filters} onChange={handleChangeFilter} />
                </section>
                <section className={classes.gallerySection}>
                    <Gallery
                        items={items}
                        isLoading={getCatalogRequest.loading}
                        hasMore={hasMore}
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
            {cardModal.isOpen && currentItemID !== undefined && (
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
            {cardModalFullScreen.isOpen && currentItemID !== undefined && (
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
