import { Link, Spacer, Text, Badge } from "@nextui-org/react";
import { getPosts } from "lib";
import { NextMarkdown } from "../components/NextMarkdown";

export default function Writing({ posts }) {
  return (
    <ul>
      {Object.keys(posts).map((post, i) => (
        <li key={i}>
          <Text h2>
            <Link href={post}>{posts[post].content.title}</Link>{" "}
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
