import { Container, Text } from "@nextui-org/react";
import { getPosts } from "lib";
import Link from "next/link";
import ListOfPosts from "src/components/ListOfPosts";
import Head from "next/head";

export default function Writing({ filteredPosts, tag }) {
  return (
    <>
      <Head>
        <title>Writing</title>
        <meta
          name="”description”"
          content="Hey, I'm Brian 👋🏼. I hope you enjoy my writing."
        />
        <meta
          name="keywords"
          content="brian fakhoury, venture capital, machine learning, neuroscience, crypto, blockchain, defi, lifestyle, personal page"
        />
        <meta
          property="og:image"
          content={`https://fakhoury.xyz/api/og?title=Writing`}
        />
        <meta property="og:description" content="Catalog of my essays" />
      </Head>
      <Container>
        <Text h2 style={{ textAlign: "center" }}>
          #{tag}
          <Link href="/writing">
            <Text h6>← Back To All Posts</Text>
          </Link>
        </Text>
      </Container>
      <ListOfPosts posts={filteredPosts} />
    </>
  );
}

export async function getStaticPaths() {
  const posts = await getPosts();
  const paths = new Set();
  posts.map((post) => post.tags.map((tag) => paths.add(tag)));
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
  const filteredPosts = posts.filter((post) => post.tags.includes(tag));
  return {
    props: { filteredPosts, tag },
  };
};
