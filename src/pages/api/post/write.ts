import { NextApiRequest, NextApiResponse } from 'next';
import { format } from 'date-fns';

import { createPost } from '~/lib/posts';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { id, contentHtml, title } = req.body;

  try {
    await createPost({
      id,
      contentHtml,
      title,
      date: format(new Date(), 'yyyy-MM-dd'),
    });
    res.status(200).json({ message: 'create success' });
  } catch (error) {
    res.status(500).json({ error: error });
  }
}
