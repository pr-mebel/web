import { Box } from '@mui/material';
import React, { FC } from 'react';

import { useYaCounter54949111 } from '@/analytics';
import { CardPopup, Filters, Gallery, Lead, Questions, TextBlock } from '@/blocks/catalog';
import { Contacts, DesignOffer, ShopImg } from '@/blocks/common';
import { useTrackUtm } from '@/hooks';
import { useCards } from '@/hooks/catalog/use-cards';

const Catalog: FC = () => {
    useTrackUtm();
    const analytics = useYaCounter54949111();
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
                <Box
                    component="section"
                    sx={(theme) => ({
                        marginTop: '60px',
                        [theme.breakpoints.down('lg')]: {
                            marginTop: '40px',
                        },
                    })}
                >
                    <Filters filter={filters} onChange={onChangeFilter} />
                </Box>
                <Box
                    component="section"
                    sx={{
                        marginTop: '20px',
                        marginBottom: '60px',
                    }}
                >
                    <Gallery
                        items={list}
                        isLoading={isLoading}
                        hasMore={hasMore}
                        onCardClick={onCardClick}
                        onLoadMore={() => {
                            analytics.track('catalog-page/show-more-button/click');
                            onShowMore();
                        }}
                    />
                </Box>
                <Box
                    component="section"
                    sx={{
                        marginTop: '40px',
                    }}
                >
                    <TextBlock />
                </Box>
                <Box
                    component="section"
                    sx={{
                        marginTop: '40px',
                    }}
                >
                    <DesignOffer />
                </Box>
                <Box
                    component="section"
                    sx={{
                        marginTop: '40px',
                    }}
                >
                    <Questions />
                </Box>
                <Box
                    component="section"
                    sx={{
                        marginTop: '40px',
                    }}
                >
                    <ShopImg />
                </Box>
                <Box
                    component="section"
                    sx={(theme) => ({
                        marginTop: '80px',
                        [theme.breakpoints.down('lg')]: {
                            marginTop: '60px',
                        },
                        [theme.breakpoints.down('md')]: {
                            marginTop: '40px',
                        },
                    })}
                >
                    <Contacts />
                </Box>
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
