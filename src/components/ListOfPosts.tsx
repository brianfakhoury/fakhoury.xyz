import { Text, Badge } from "@nextui-org/react";
import { NextMarkdown } from "./NextMarkdown";
import FancyTitle from "./FancyTitle";
import Link from "next/link";

export default function ListOfPosts({ posts }) {
  return (
    <ul>
      {Object.keys(posts)
        .sort((a, b) => posts[b].content.timestamp - posts[a].content.timestamp)
        .map((post, i) => (
          <li key={i}>
            <Text h2>
              <Link href={post} style={{ display: "block" }}>
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
              <Link href={`/writing/${tag}`} key={i}>
                <Badge color="secondary">#{tag}</Badge>
              </Link>
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
