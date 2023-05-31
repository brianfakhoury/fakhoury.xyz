import { Text, Badge, Spacer, Container, Divider } from "@nextui-org/react";
import { NextMarkdown } from "./NextMarkdown";
import FancyTitle from "./FancyTitle";
import Link from "next/link";

export default function ListOfPosts({ posts }) {
  return (
    <ul>
      {posts
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .map((post, i) => (
          <>
            <Divider />
            <Container
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "10px 0",
              }}
            >
              <Link href={`/${post.slug}`}>
                <FancyTitle text={post.title} />
              </Link>
              <Badge size="sm" color="primary">
                {new Date(post.date).toLocaleString("en", {
                  month: "short",
                  year: "numeric",
                })}
              </Badge>
            </Container>
          </>
        ))}
    </ul>
  );
}
