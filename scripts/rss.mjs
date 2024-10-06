import fs from "fs";
import RSS from "rss";
import path from "path";
import { marked } from "marked";
import matter from "gray-matter";

// TODO import posts

const renderer = new marked.Renderer();

renderer.link = (href, _, text) =>
  `<a href="${href}" target="_blank" rel="noopener noreferrer">${text}</a>`;

marked.setOptions({
  gfm: true,
  breaks: true,
  renderer,
});

const renderPost = (md) => marked.parse(md);

const main = () => {
  const feed = new RSS({
    title: "Brian Fakhoury",
    site_url: "https://fakhoury.xyz",
    feed_url: "https://fakhoury.xyz/feed.xml",
    language: "en",
    description: "Brian Fakhoury's writing",
  });

  posts.forEach((post) => {
    const url = `https://fakhoury.xyz/${post.slug}`;

    feed.item({
      title: post.title,
      description: renderPost(post.body),
      date: new Date(post?.date),
      author: "Brian Fakhoury",
      url,
      guid: url,
    });
  });

  const rss = feed.xml({ indent: true });
  fs.writeFileSync(path.join(__dirname, "../public/feed.xml"), rss);
};

main();
