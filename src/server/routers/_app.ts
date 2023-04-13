import axios from 'axios';
import { z } from 'zod';

import { client } from '@/api/client';
import { sectionCollectionZod, sectionIDs } from '@/entities';
import { makeRequest as makeCatalogRequest } from '@/lib/catalog';
import { makeRequest as makeFaqRequest } from '@/lib/faq';

import { procedure, router } from '../trpc';

const FetchFAQRespone = z.object({
    faqList: z.object({
        itemsCollection: z.object({
            items: z.array(
                z.object({
                    title: z.string(),
                    text: z.string(),
                })
            ),
        }),
    }),
});

const FetchCatalogRespone = z.object({
    result: sectionCollectionZod,
});

const LogRequest = z.object({
    email: z.optional(z.string()),
    name: z.string(),
    tel: z.string(),
    place: z.string(),
    description: z.optional(z.string()),
});

export const appRouter = router({
    catalog: procedure.input(z.object({ section: sectionIDs })).query(async ({ input }) => {
        const data = await client.query<z.infer<typeof FetchCatalogRespone>>({
            query: makeCatalogRequest(input.section),
        });

        return data.data.result.items[0].cardsCollection.items;
    }),
    faq: procedure.query(async () => {
        const data = await client.query<z.infer<typeof FetchFAQRespone>>({
            query: makeFaqRequest(),
        });

        return data.data.faqList.itemsCollection.items;
    }),
    logRequest: procedure.input(LogRequest).query(async ({ input, ctx }) => {
        const { email, name, tel, description, place } = input;

        console.log(ctx);

        //   const roistatData = {
        //     roistat: req.cookies['roistat_visit'] ? .cookies['roistat_visit'] : 'nocookie',
        //     key: process.env.ROISTAT_KEY,
        //     title: `Заявка с формы "${place}"`,
        //     comment: description ? description : null,
        //     name: name,
        //     phone: tel,
        //     email: email ? email : null,
        //     is_skip_sending: 0,
        // };

        // try {
        //     await axios.get('https://cloud.roistat.com/api/proxy/1.0/leads/add', { params: {} });

        //     console.info('roistat: lead sended');
        // } catch (error) {
        //     console.error('unable to send lead', { error });
        // }

        return null;
    }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
