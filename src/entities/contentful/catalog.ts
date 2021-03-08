import { ContentModelSectionId, ContentModelId } from './content-model';

type Image = {
    url: string;
};

export type Collection = {
    items: {
        collection: string;
        description: string;
        id: string;
        imageFull: Image;
        imageMedium: Image;
        imageMinified: Image;
        sys: {
            id: string;
        };
    }[];
    total: number;
    __typename: ContentModelId;
}

export type SectionCollection = {
    items: {
        cardsCollection: Collection;
    }[];
    total: number;
    __typename: ContentModelSectionId;
};