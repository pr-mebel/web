import type { NextApiRequest, NextApiResponse } from 'next';
import client from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const twilioClient = client(accountSid, authToken);

type Body = {
    phone: string;
};

const verifyPhone = async (req: NextApiRequest, res: NextApiResponse) => {
    const { phone } = req.body as Body;

    twilioClient.lookups.v1
        .phoneNumbers(phone)
        .fetch()
        .then((phoneNumber) => {
            res.status(200).json(phoneNumber);
        })
        .catch((error) => {
            res.status(500).json(error);
        });
};

export default verifyPhone;
