import getPosts from "@/lib/get-posts";
import { Post } from "@/lib/types";
import { Feed } from "feed";

export default async function getFeed() {
  const posts: Post[] = await getPosts();

  // Initialize the Feed
  const feed = new Feed({
    title: "Brian Fakhoury",
    description: "My personal site and digital garden.",
    id: "https://fakhoury.xyz/",
    link: "https://fakhoury.xyz/",
    language: "en",
    image: "https://fakhoury.xyz/opengraph-image.jpg",
    favicon: "https://fakhoury.xyz/favicon.ico",
    copyright: "2024, Brian Fakhoury",
    updated: posts[0].modified || posts[0].date,
    generator: "Feed for Node",
    feedLinks: {
      json: "https://fakhoury.xyz/feed.json",
      atom: "https://fakhoury.xyz/atom.xml",
      rss: "https://fakhoury.xyz/feed.xml",
    },
    author: {
      name: "Brian Fakhoury",
      link: "https://fakhoury.xyz",
    },
  });

  posts.forEach((post) => {
    feed.addItem({
      title: post.title,
      id: `https://fakhoury.xyz/${post.slug}`,
      link: `https://fakhoury.xyz/${post.slug}`,
      image: `https://fakhoury.xyz/${post.slug}/og.png`,
      description: post.description,
      //   content: post.body,
      author: [
        {
          name: "Brian Fakhoury",
          link: "https://fakhoury.xyz",
        },
      ],
      date: post.modified || post.date,
      published: post.date,
      category: (post.tags || []).map((tag) => ({ name: tag })),
    });
  });

  feed.addCategory("Technology");
  feed.addCategory("Programming");
  feed.addCategory("Self Improvement");

  return feed;
}
