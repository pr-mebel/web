import type { NextApiRequest, NextApiResponse } from 'next';
import { gql } from '@apollo/client';
import { client } from '@/utils/client';
import { parseContentfulCatalog } from '@/normalizers';
import { batchSize } from '@/constants';
import { StyleId, DoorTypeId, SectionCollection, Collection } from '@/entities';

type Output = {
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

export default (req: NextApiRequest, res: NextApiResponse) => {
    const { page, filters: { style, doorType, section } } = req.body;

    return client.query<Output>({
        query:
            style === StyleId.any && doorType === DoorTypeId.any
                ? gql`
                {
                    ${section}SectionCollection(limit: 1) {
                        items {
                            cardsCollection(limit: ${batchSize}, skip: ${batchSize * page}) {
                                total
                                items {
                                    ... on ${section[0].toUpperCase() + section.slice(1)} {
                                        id
                                        collection
                                        description
                                        imageFull: image {
                                            url(transform: {format: WEBP})
                                        }
                                        imageMedium: image {
                                            url(transform: {width: 750, height: 500, format: WEBP})
                                        }
                                        imageMinified: image {
                                            url(transform: {width: 435, height: 290, format: WEBP})
                                        }
                                        sys {
                                            id
                                        }
                                    }
                                }
                            }
                        }
                    }
                }`
                : gql`
                {
                    ${section}Collection(where: {
                        ${style !== 'any' ? `${style}: true` : ''}
                        ${doorType !== 'any' ? `${doorType}: true` : ''}
                    }, order: [id_ASC], limit: ${batchSize}, skip: ${batchSize * page}){
                        total
                        items {
                            id
                            collection
                            description
                            imageFull: image {
                                url(transform: {
                                    format: WEBP
                                })
                            }
                            imageMedium: image {
                                url(transform: {
                                    width: 750
                                    height: 500
                                    format: WEBP
                                })
                            }
                            imageMinified: image {
                                url(transform: {
                                    width: 435
                                    height: 290
                                    format: WEBP
                                })
                            }
                            sys {
                                id
                            }
                        }
                    }
                }`,
    })
    .then((data) => parseContentfulCatalog(data))
    .then((data) => res.status(200).json(data))
    .catch((error) => res.status(500).json(error));
};
