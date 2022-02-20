import { gql } from '@apollo/client';

import { isProduction } from '@/utils';

const FAQEntityID = '50kulGjR4KrEMHAomWqIgM';

export const makeRequest = () => {
    return gql`
    {
        faqList(id: "${FAQEntityID}", preview: ${!isProduction()}) {
            itemsCollection {
                items {
                    title
                    text
                }
            }
        }
    }
`;
};
