export type Image = {
    url: string;
    title: string;
    width: number;
    height: number;
};

export type Item = {
    collection: string;
    description: string;
    id: string;
    modern?: boolean | null;
    classic?: boolean | null;
    neoclassic?: boolean | null;
    designer?: boolean | null;
    coupe?: boolean | null;
    swing?: boolean | null;
    folding?: boolean | null;
    imageFull: Image;
    imageMedium: Image;
    imageMinified: Image;
    sys: {
        id: string;
    };
};

export type Collection = {
    items: Item[];
    total: number;
};

export type SectionCollection = {
    items: {
        cardsCollection: Collection;
    }[];
    total: number;
};
