// next api route that exposes the getPosts function from the lib folder and returns the posts array
import { NextApiRequest, NextApiResponse } from "next";
import { getPosts } from "../../../lib";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const posts = await getPosts();
  res.json({ posts });
}
