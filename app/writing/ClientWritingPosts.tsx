// app/writing/ClientWritingPosts.tsx
"use client";

import React from "react";
import ListOfPosts from "../components/ListOfPosts";
import { Text } from "@nextui-org/react";

export default function ClientWritingPosts({ posts }) {
  return (
    <>
      <Text h2 style={{ textAlign: "center" }}>
        Written Words
      </Text>
      <ListOfPosts posts={posts} />
    </>
  );
}
