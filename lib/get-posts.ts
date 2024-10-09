import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { cache } from "react";
import type { Post } from "@/lib/types";

const POSTS_DIRECTORY = path.join(process.cwd(), "content/posts");

export const getPosts = cache(async () => {
  const posts = await fs.readdir(POSTS_DIRECTORY);

  const postsWithMetadata = await Promise.all(
    posts
      .filter((file) => /\.mdx?$/.test(file))
      .map(async (file) => {
        const filePath = path.join(POSTS_DIRECTORY, file);
        const fileContents = await fs.readFile(filePath, "utf8");
        const { data, content } = matter(fileContents);

        if (!data.publish || !data.date || !data.title || !content) return null;

        return {
          tags: data.tags || [],
          date: new Date(data.date),
          modified: data.modified ? new Date(data.modified) : undefined,
          slug: data.slug || file.replace(/\.mdx?$/, ""),
          origin: data.origin,
          image: data.image,
          description: data.description || content.slice(0, 100) + "...",
          title: data.title,
          body: content,
        } as Post;
      })
  );

  return postsWithMetadata
    .filter((post): post is Post => post !== null)
    .sort((a, b) => {
      const aTime = (a.modified || a.date).getTime();
      const bTime = (b.modified || b.date).getTime();
      return bTime - aTime;
    });
});

export async function getPost(slug?: string) {
  const posts = await getPosts();
  if (!slug) return posts[0];
  return posts.find((post) => post.slug === slug);
}

export default getPosts;
