import { getPosts } from "lib";
import ListOfPosts from "src/components/ListOfPosts";
import Head from "next/head";
import { Text } from "@nextui-org/react";

export default function Writing({ posts }) {
  return (
    <>
      <Head>
        <title>Writing</title>
        <meta property="og:title" content="Writing" />
        <meta property="og:type" content="website" />
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
      <Text h2 style={{ textAlign: "center" }}>
        Written Words
      </Text>
      <ListOfPosts posts={posts} />
    </>
  );
}

export const getStaticProps = async () => {
  const posts = await getPosts();
  return {
    props: { posts },
  };
};
