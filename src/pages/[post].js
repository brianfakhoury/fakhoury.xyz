import { Spacer, Text, Badge } from "@nextui-org/react";
import Head from "next/head";
import ReactMarkdown from "react-markdown";
import remarkUnwrapImages from "remark-unwrap-images";
import { Container, Link, Image } from "@nextui-org/react";

import posts from "../data/posts.json";

export async function getStaticPaths() {
  return {
    paths: Object.keys(posts).map((slug) => ({
      params: {
        post: slug,
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  let hash = posts[params["post"]];
  let data = await fetch(
    `https://nylbrpc3wbgdhwigt7iwja2jfrsnzl4xgfwgm3sxnrhwoupebtrq.arweave.net/${hash}`
  );
  let { content } = await data.json();
  return {
    props: { content },
  };
}

export default function Post({ content }) {
  return (
    <Container>
      <Head>
        <title>{content.title} - Brian Fakhoury</title>
        <link rel="icon" type="image/x-icon" href="/azuki.png" />
        <meta
          name="”description”"
          content="Hey, I'm Brian 👋🏼. I hope you enjoy my writing."
        />
        <meta
          name="keywords"
          content="brian fakhoury, venture capital, machine learning, neuroscience, crypto, blockchain, defi, lifestyle, personal page"
        />
        <meta property="og:title" content={content.title} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/header.png" />
        <meta property="og:description" content="Ad astra per aspera." />
      </Head>
      <Text h1>{content.title}</Text>
      <Badge>
        {new Date(content.timestamp * 1000).toLocaleString("en", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })}
      </Badge>
      <ReactMarkdown
        remarkPlugins={[remarkUnwrapImages]}
        components={{
          h1: ({ node, ...props }) => <Text h1 {...props} />,
          h2: ({ node, ...props }) => <Text h2 {...props} />,
          h3: ({ node, ...props }) => <Text h3 {...props} />,
          p: ({ node, ...props }) => <Text {...props} />,
          a: ({ node, ...props }) => (
            <Link target="_blank" css={{ display: "inline" }} {...props} />
          ),
          strong: ({ node, ...props }) => <Text b {...props} />,
          blockquote: ({ node, ...props }) => <Text blockquote {...props} />,
          code: ({ node, ...props }) => <Text code {...props} />,
          img: ({ node, ...props }) => (
            <Image alt="" css={{ borderRadius: "10px" }} {...props} />
          ),
        }}
      >
        {content.body}
      </ReactMarkdown>
      <Spacer y={3} />
    </Container>
  );
}
