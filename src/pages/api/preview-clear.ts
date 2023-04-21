import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.clearPreviewData();

  res.status(200).json({ message: 'cookies cleared' });
}
