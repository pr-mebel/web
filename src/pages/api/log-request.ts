import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

import { env } from '@/env';

type Body = {
  email?: string;
  name: string;
  tel: string;
  place: string;
  description?: string;
};

const logRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, name, tel, description, place } = req.body as Body;

  const roistatData = {
    roistat: req.cookies['roistat_visit']
      ? req.cookies['roistat_visit']
      : 'nocookie',
    key: env.ROISTAT_KEY,
    title: `Заявка с формы "${place}"`,
    comment: description ? description : null,
    name: name,
    phone: tel,
    email: email ? email : null,
    is_skip_sending: 0,
  };

  try {
    await axios.get('https://cloud.roistat.com/api/proxy/1.0/leads/add', {
      params: roistatData,
    });

    console.info('roistat: lead sended');
  } catch (error) {
    console.error('unable to send lead', { error });
  }

  res.status(200).json('success');
};

export default logRequest;
