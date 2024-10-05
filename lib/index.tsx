import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Post, Links } from "@/types";

import LINKS from "@/data/links.json";

let cachedPosts: Post[] | null = null;

export async function getPosts(): Promise<Post[]> {
  return new Promise((resolve, reject) => {
    try {
      if (cachedPosts) {
        resolve(cachedPosts);
      }

      const markdownFilesPath = path.join(process.cwd(), "data/blog");
      const markdownFileNames = fs.readdirSync(markdownFilesPath);

      const posts: Post[] = markdownFileNames
        .filter((file) => file.endsWith(".md"))
        .map((filename) => {
          const filePath = path.join(markdownFilesPath, filename);
          const fileContents = fs.readFileSync(filePath, "utf8");
          const { data, content } = matter(fileContents);

          return {
            tags: data.tags.split(", ").map((tag: string) => tag.substring(5)),
            date: data.date,
            slug: data.slug,
            origin: data.origin,
            image: data.image,
            description: data.description,
            title: content.substring(2, content.indexOf("\n\n") + 1),
            body: content.substring(content.indexOf("\n\n") + 1),
          };
        });

      cachedPosts = posts;
      resolve(posts);
    } catch (error) {
      reject(error);
    }
  });
}

export const getLinks = (): Links => JSON.parse(JSON.stringify(LINKS));
