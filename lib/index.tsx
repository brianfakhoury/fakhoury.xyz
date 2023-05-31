import fs from "fs";
import path from "path";
import matter from "gray-matter";

import LINKS from "./data/links.json";
import POSTS from "./data//posts.json";

type Post = {
  tags: String[];
  date: Date;
  slug: String;
  origin: String[];
  image: String;
  description: String;
  title: String;
  body: String;
};

type Links = [
  {
    title: String;
    emoji?: String;
    items: [
      {
        link: String;
        title: String;
      }
    ];
  }
];

let cachedPosts: Post[] | null = null;

export async function getPosts(): Promise<Post[]> {
  return new Promise((resolve, reject) => {
    try {
      if (cachedPosts) {
        resolve(cachedPosts);
      }

      const markdownFilesPath = path.join(process.cwd(), "lib/data/Blog");
      const markdownFileNames = fs.readdirSync(markdownFilesPath);

      const posts: Post[] = markdownFileNames
        .filter((file) => file.endsWith(".md"))
        .map((filename) => {
          const filePath = path.join(markdownFilesPath, filename);
          const fileContents = fs.readFileSync(filePath, "utf8");
          const { data, content } = matter(fileContents);

          return {
            tags: data.tags.split(", ").map((tag) => tag.substring(5)),
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
