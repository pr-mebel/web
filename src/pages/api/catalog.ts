import { gql } from '@apollo/client';
import type { NextApiRequest, NextApiResponse } from 'next';

import { client } from '@/api/client';
import { SectionCollection, SectionID } from '@/entities';
import { isProduction } from '@/utils';

type Output = {
    result: SectionCollection;
};

const getRequest = (section: SectionID) => {
    let filters = '';

    switch (section) {
        case 'cupboard': {
            filters = `
                modern
                classic
                neoclassic
                designer
                coupe
                swing
                folding
            `;
            break;
        }
        case 'wardrobe': {
            filters = `
                modern
                classic
                neoclassic
            `;
            break;
        }
    }

    return gql`
        {
            result: ${section}SectionCollection(limit: 1, preview: ${!isProduction()}) {
                items {
                    cardsCollection {
                        total
                        items {
                            ... on ${section[0].toUpperCase() + section.slice(1)} {
                                id
                                collection
                                description
                                ${filters}
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
        }
    `;
};

const catalog = async (req: NextApiRequest, res: NextApiResponse) => {
    const { section } = req.body as {
        section: SectionID;
    };

    try {
        const data = await client.query<Output>({ query: getRequest(section) });

        return res.status(200).json(data.data.result.items[0].cardsCollection.items);
    } catch (error) {
        return res.status(500).json(error);
    }
};

export default catalog;
