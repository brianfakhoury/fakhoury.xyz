import { getPosts } from "lib";
import ListOfPosts from "src/components/ListOfPosts";
import Head from "next/head";

export default function Writing({ posts }) {
  return (
    <>
      <Head>
        <title>Writing</title>
        <meta property="og:title" content="Writing" />
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
