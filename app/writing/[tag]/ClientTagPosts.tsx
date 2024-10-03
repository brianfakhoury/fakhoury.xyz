// app/writing/[tag]/ClientTagPosts.tsx
"use client";

import { Container, Text } from "@nextui-org/react";
import ListOfPosts from "../../components/ListOfPosts";
import NextLink from "next/link";
import React from "react";

export default function ClientTagPosts({ posts, tag }) {
  return (
    <>
      <Container>
        <Text h2 style={{ textAlign: "center" }}>
          #{tag}
          <NextLink href="/writing">
            <Text h6>← Back To All Posts</Text>
          </NextLink>
        </Text>
      </Container>
      <ListOfPosts posts={posts} />
    </>
  );
}
