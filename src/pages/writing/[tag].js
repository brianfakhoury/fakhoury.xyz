import { Container, Text } from "@nextui-org/react";
import { getPosts } from "lib";
import Link from "next/link";
import ListOfPosts from "src/components/ListOfPosts";

export default function Writing({ filteredPosts, tag }) {
  return (
    <>
      <Container>
        <Text>Filtered by #{tag}</Text>
        <Link href="/writing">
          <Text h6>← Back To All Posts</Text>
        </Link>
      </Container>
      <ListOfPosts posts={filteredPosts} />
    </>
  );
}

export async function getStaticPaths() {
  const posts = await getPosts();
  const paths = new Set();
  for (let key in posts) {
    posts[key].tags.forEach((e) => paths.add(e));
  }
  return {
    paths: Array.from(paths).map((slug) => ({
      params: {
        tag: slug,
      },
    })),
    fallback: false,
  };
}

export const getStaticProps = async ({ params }) => {
  const posts = await getPosts();
  const tag = params["tag"];
  const filteredPosts = Object.fromEntries(
    Object.entries(posts).filter(([key, value]) => value.tags.includes(tag))
  );
  return {
    props: { filteredPosts, tag },
  };
};
