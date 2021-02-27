import { gql } from '@apollo/client';
import { batchSize } from '__constants__';
import { client } from './client';

export const fetchCatalogByFilter = ({ section, style, doorType }, page) =>
    client.query({
        query:
            style === 'any' && doorType === 'any'
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
    });
