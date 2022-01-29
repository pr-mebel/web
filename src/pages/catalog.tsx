import { makeStyles } from '@material-ui/core/styles';
import React, { FC } from 'react';

import { CardPopup, Filters, Gallery, Lead, Questions, TextBlock } from '@/blocks/catalog';
import { DesignOffer, Map, ShopImg } from '@/blocks/common';
import { useTrackUtm } from '@/hooks';
import { useCards } from '@/hooks/catalog/use-cards';

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
    useTrackUtm();
    const classes = useStyles();
    const {
        filters,
        list,
        selectedItem,
        bounds,
        hasMore,
        isLoading,
        cardModal,
        onChangeFilter,
        onCardClick,
        onShowMore,
    } = useCards();

    return (
        <>
            <main>
                <Lead sectionID={filters.section} />
                <section className={classes.filterSection}>
                    <Filters filter={filters} onChange={onChangeFilter} />
                </section>
                <section className={classes.gallerySection}>
                    <Gallery
                        items={list}
                        isLoading={isLoading}
                        hasMore={hasMore}
                        onCardClick={onCardClick}
                        onLoadMore={onShowMore}
                    />
                </section>
                <section className={classes.designOfferSection}>
                    <TextBlock />
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
            {cardModal.isOpen && selectedItem && (
                <CardPopup
                    hasNext={bounds?.hasNext}
                    hasPrev={bounds?.hasPrev}
                    selectedItem={selectedItem}
                    isOpen={cardModal.isOpen}
                    onClose={cardModal.handleClose}
                    onClickBack={cardModal.onOpenPrev}
                    onClickForward={cardModal.onOpenNext}
                />
            )}
        </>
    );
};

export default Catalog;
