import { gql } from '@apollo/client';
import { batchSize } from '@/constants';
import { client } from '../client';
import { StyleId, DoorTypeId } from '@/entities';
import { FetchCatalogByFilterParams, FetchCatalogByFilterResponse } from './types';

/**
 * Запрашивает из contentful CMS карточки по текущему фильтру
 * @param param0 Параметры фильтров
 * @param page Текущая страница в каталоге
 * @returns Объект с новыми карточками
 */
export const fetchCatalogByFilter = (
    { section, style, doorType }: FetchCatalogByFilterParams,
    page: number,
) =>
    client.query<FetchCatalogByFilterResponse>({
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
    });
