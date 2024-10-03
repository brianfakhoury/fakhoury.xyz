import { NextApiRequest, NextApiResponse } from "next";
import { getPosts } from "../../lib";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const posts = await getPosts();
  res.json({ posts });
}
