import type { NextApiRequest, NextApiResponse } from 'next';
import { gql } from '@apollo/client';
import { client } from '@/utils/client';
import { parseContentfulCatalog } from '@/normalizers';
import { batchSize } from '@/constants';
import { StyleID, DoorTypeID, SectionCollection, Collection, Filter } from '@/entities';

type Output = {
    result: SectionCollection | Collection;
}

const catalog =  async (
    req: NextApiRequest,
    res: NextApiResponse,
) => {
    const { page, filters: { style, doorType, section } } = req.body as {
        page: number;
        filters: Filter;
    };

    try {
        const data = await client.query<Output>({
            query: style === 'any' as StyleID && doorType === 'any' as DoorTypeID ?
                gql`
                {
                    result: ${section}SectionCollection(limit: 1) {
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
                }` :
                gql`
                {
                    result: ${section}Collection(where: {
                        ${style !== 'any' ? `${style}: true` : ''}
                        ${doorType !== 'any' ? `${doorType}: true` : ''}
                    }, order: [id_ASC], limit: ${batchSize}, skip: ${batchSize * (page - 1)}){
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
        });
        const resData = parseContentfulCatalog(data);

        console.log(`
        {
            result: ${section}Collection(where: {
                ${style !== 'any' ? `${style}: true` : ''}
                ${doorType !== 'any' ? `${doorType}: true` : ''}
            }, order: [id_ASC], limit: ${batchSize}, skip: ${batchSize * (page - 1)}){
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
        }`);

        return res.status(200).json(resData);
    } catch (error) {
        return res.status(500).json(error);
    }
};

export default catalog;