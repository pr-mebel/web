import { SectionId, StyleId, DoorTypeId } from '@/entities';

export type FetchCatalogByFilterParams = {
    section: SectionId;
    style: StyleId;
    doorType: DoorTypeId;
};

type Image = {
    url: string;
};

type Collection = {
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
}

type SectionCollection = {
    items: {
        cardsCollection: Collection;
    }[];
};

export enum FetchCatalogResponseSection {
    cupboard = 'cupboardSectionCollection',
    wardrobe = 'wardrobeSectionCollection',
    accessories = 'accessoriesSectionCollection',
    lightingSystems = 'lightingSystemsSectionCollection',
}

export interface FetchCatalogByFilterResponse {
    data:
    | {
        cupboardSectionCollection: SectionCollection;
    }
    | {
        wardrobeSectionCollection: SectionCollection;
    }
    | {
        accessoriesSectionCollection: SectionCollection;
    }
    | {
        lightingSystemsSectionCollection: SectionCollection;
    }
    | {
        cupboardCollection: Collection;
    }
    | {
        wardrobeCollection: Collection;
    };
}
