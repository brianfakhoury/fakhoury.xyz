import { Link, Spacer, Text, Badge } from "@nextui-org/react";
import { getPosts } from "lib";
import { NextMarkdown } from "src/components/NextMarkdown";
import FancyTitle from "src/components/FancyTitle";

export default function Writing({ posts }) {
  return (
    <ul>
      {Object.keys(posts)
        .sort((a, b) => posts[b].content.timestamp - posts[a].content.timestamp)
        .map((post, i) => (
          <li key={i}>
            <Text h2>
              <Link href={post} css={{ display: "block" }}>
                <FancyTitle text={posts[post].content.title} />
              </Link>
            </Text>

            <Badge color="primary">
              {new Date(posts[post].content.timestamp * 1000).toLocaleString(
                "en",
                {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                }
              )}
            </Badge>
            {posts[post].tags.map((tag, i) => (
              <Badge color="secondary" key={i}>
                #{tag}
              </Badge>
            ))}

            <NextMarkdown>
              {posts[post].content.body.substring(0, 500) + "..."}
            </NextMarkdown>
            <Link href={`/${post}`}>
              <Text color="$gray800">Continue →</Text>
            </Link>
          </li>
        ))}
    </ul>
  );
}

export const getStaticProps = async () => {
  const posts = await getPosts();
  return {
    props: { posts },
  };
};
