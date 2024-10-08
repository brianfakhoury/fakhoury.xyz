import fs from "fs/promises";
import matter from "gray-matter";
import { cache } from "react";
import type { Post } from "@/lib/types";

const POSTS_DIRECTORY = "./content/posts";

export const getPosts = cache(async () => {
  const posts = await fs.readdir(POSTS_DIRECTORY);

  const postsWithMetadata = await Promise.all(
    posts
      .filter((file) => file.endsWith(".md") || file.endsWith(".mdx"))
      .map(async (file) => {
        const filePath = `${POSTS_DIRECTORY}/${file}`;
        const fileContents = await fs.readFile(filePath, "utf8");
        const { data, content } = matter(fileContents);

        if (!data.publish || !data.date || !data.title || !content) return null;

        return {
          tags: data.tags || [],
          date: new Date(data.date),
          modified: data.modified && new Date(data.modified),
          slug: data.slug || file.replace(/\.mdx?$/, ""),
          origin: data.origin ?? undefined,
          image: data.image ?? undefined,
          description:
            data.description ||
            content.split(" ").slice(0, 10).join(" ") + "...",
          title: data.title,
          body: content,
        } as Post;
      })
  );
  return postsWithMetadata
    .filter((post) => post !== null)
    .sort((a, b) => {
      const aTime = (a.modified || a.date).getTime();
      const bTime = (b.modified || b.date).getTime();
      return bTime - aTime;
    });
});

export async function getPost(slug?: string) {
  const posts = await getPosts();
  // if no slug, return first post
  if (!slug) return posts[0];
  // otherwise search for post with slug
  return posts.find((post) => post.slug === slug);
}

export default getPosts;
