import LINKS from "./data/links.json";
import POSTS from "./data//posts.json";

type Post = {
  hash: String;
  tags: [String];
  content: {
    body: String;
    title: String;
    timestamp: String;
  };
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

export const getPosts = async (): Promise<Post> => {
  const posts = JSON.parse(JSON.stringify(POSTS));
  for (const key in posts) {
    let data = await fetch(
      `https://nylbrpc3wbgdhwigt7iwja2jfrsnzl4xgfwgm3sxnrhwoupebtrq.arweave.net/${posts[key]["hash"]}`
    );
    let { content } = await data.json();
    posts[key]["content"] = content;
  }
  return posts;
};

export const getLinks = (): Links => JSON.parse(JSON.stringify(LINKS));
