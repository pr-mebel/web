export type GalleryProps = {
    items: {
        id: string;
        imageMinified: {
            url: string;
        };
        collection: string;
    }[];
    page: number;
    isLoading: boolean;
    hasMore: boolean;
    onCardClick: Function;
};
