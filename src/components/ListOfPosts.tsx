import {
  Text,
  Badge,
  Spacer,
  Container,
  Divider,
  Col,
} from "@nextui-org/react";
import { NextMarkdown } from "./NextMarkdown";
import FancyTitle from "./FancyTitle";
import Link from "next/link";

export default function ListOfPosts({ posts }) {
  return (
    <ul>
      {posts
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .map((post, i) => (
          <Container css={{ p: "0" }} xs key={i}>
            <Divider />
            <Container
              xs
              display="flex"
              justify="space-between"
              style={{
                padding: "10px 0",
              }}
            >
              <Col span={9}>
                <Link href={`/${post.slug}`}>{post.title}</Link>
              </Col>
              <Col
                span={3}
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "flex-start",
                }}
              >
                <Badge size="sm" color="primary">
                  {new Date(post.date).toLocaleString("en", {
                    month: "short",
                    year: "numeric",
                  })}
                </Badge>
              </Col>
            </Container>
          </Container>
        ))}
    </ul>
  );
}
