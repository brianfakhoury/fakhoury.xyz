// app/sitemap.ts
import getPosts from "@/lib/get-posts";
import { getTagsWithLatestModified } from "@/lib/utils";

export default async function sitemap() {
  const posts = await getPosts();
  const latest_post = posts[0];
  const tag_list = getTagsWithLatestModified(posts);

  const writings = posts.map((post) => ({
    url: `https://fakhoury.xyz/${post.slug}`,
    lastModified: new Date(post.modified || post.date)
      .toISOString()
      .split("T")[0],
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const tags = tag_list.map(({ tag, modified }) => ({
    url: `https://fakhoury.xyz/writing/${tag}`,
    lastModified: new Date(modified).toISOString().split("T")[0],
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  const home = {
    url: "https://fakhoury.xyz",
    lastModified: new Date().toISOString().split("T")[0],
    changeFrequency: "monthly",
    priority: 1.0,
  };

  const writing = {
    url: "https://fakhoury.xyz/writing",
    lastModified: new Date(latest_post.modified || latest_post.date)
      .toISOString()
      .split("T")[0],
    changefreq: "monthly",
    priority: 0.5,
  };

  return [home, writing, ...tags, ...writings];
}
