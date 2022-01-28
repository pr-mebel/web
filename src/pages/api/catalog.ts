import { gql } from '@apollo/client';
import type { NextApiRequest, NextApiResponse } from 'next';

import { client } from '@/api/client';
import { batchSize } from '@/constants';
import { Collection, DoorTypeID, Filter, SectionCollection, StyleID } from '@/entities';
import { parseContentfulCatalog } from '@/normalizers';
import { isProduction } from '@/utils';

type Output = {
    result: SectionCollection | Collection;
};

const catalog = async (req: NextApiRequest, res: NextApiResponse) => {
    const {
        page,
        filters: { style, doorType, section },
    } = req.body as {
        page: number;
        filters: Filter;
    };

    try {
        const data = await client.query<Output>({
            query:
                style === ('any' as StyleID) && doorType === ('any' as DoorTypeID)
                    ? gql`
                {
                    result: ${section}SectionCollection(limit: 1, preview: ${!isProduction()}) {
                        items {
                            cardsCollection(limit: ${batchSize}, skip: ${batchSize * (page - 1)}) {
                                total
                                items {
                                    ... on ${section[0].toUpperCase() + section.slice(1)} {
                                        id
                                        collection
                                        description
                                        imageFull: image {
                                            url(transform: {format: WEBP})
                                            title
                                            width
                                            height
                                        }
                                        imageMedium: image {
                                            url(transform: {format: WEBP})
                                            title
                                            width
                                            height
                                        }
                                        imageMinified: image {
                                            url(transform: {width: 750, height: 500, format: WEBP})
                                            title
                                            width
                                            height
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
                    result: ${section}Collection(where: {
                        ${style !== 'any' ? `${style}: true` : ''}
                        ${doorType !== 'any' ? `${doorType}: true` : ''}
                    }, order: [id_ASC], limit: ${batchSize}, skip: ${
                          batchSize * (page - 1)
                      }, preview: ${!isProduction()}){
                        total
                        items {
                            id
                            collection
                            description
                            imageFull: image {
                                url(transform: {
                                    format: WEBP
                                })
                                title
                                width
                                height
                            }
                            imageMedium: image {
                                url(transform: {
                                    format: WEBP
                                })
                                title
                                width
                                height
                            }
                            imageMinified: image {
                                url(transform: {
                                    width: 750
                                    height: 500
                                    format: WEBP
                                })
                                title
                                width
                                height
                            }
                            sys {
                                id
                            }
                        }
                    }
                }`,
        });
        const resData = parseContentfulCatalog(data);

        return res.status(200).json(resData);
    } catch (error) {
        return res.status(500).json(error);
    }
};

export default catalog;
