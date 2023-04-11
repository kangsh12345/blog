import { NextApiRequest, NextApiResponse } from 'next';

import { getSortedPostsData } from '~/lib/posts';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const allPostsData = getSortedPostsData();
  res.status(200).json({ allPostsData });
}
