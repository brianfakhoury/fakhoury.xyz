import { Text } from "@nextui-org/react";
import { getPosts } from "lib";
import Link from "next/link";
import ListOfPosts from "src/components/ListOfPosts";

export default function Writing({ posts }) {
  return <ListOfPosts posts={posts} />;
}

export const getStaticProps = async () => {
  const posts = await getPosts();
  return {
    props: { posts },
  };
};
