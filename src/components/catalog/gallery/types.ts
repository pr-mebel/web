export type GalleryProps = {
    items: {
        id: string;
        imageMinified: {
            url: string;
        };
        collection: string;
    }[];
    isLoading: boolean;
    hasMore: boolean;
    onCardClick: (cardID: number) => void;
    onLoadMore: () => void;
};
