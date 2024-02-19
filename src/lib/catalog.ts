import { gql } from '@apollo/client';

import { SectionID } from '@/entities';
import { isProduction } from '@/utils';

export const makeRequest = (section: SectionID, skip = 0) => {
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
                    cardsCollection(skip: ${skip}) {
                        total
                        items {
                            ... on ${section[0].toUpperCase() + section.slice(1)} {
                                id
                                collection
                                description
                                ${filters}
                                imageFull: image {
                                    url(transform: {quality: 80, format: WEBP})
                                    title
                                    width
                                    height
                                }
                                imageMedium: image {
                                    url(transform: {quality: 70, format: WEBP})
                                    title
                                    width
                                    height
                                }
                                imageMinified: image {
                                    url(transform: {quality: 20, format: WEBP})
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
