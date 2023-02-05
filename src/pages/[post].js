import { Spacer, Text, Badge, Divider } from "@nextui-org/react";
import Head from "next/head";
import ReactMarkdown from "react-markdown";
import remarkUnwrapImages from "remark-unwrap-images";
import { Container, Link, Image } from "@nextui-org/react";
import { getPosts } from "lib";

export default function Post({ content, hash, tags }) {
  return (
    <Container>
      <Head>
        <title>{content.title}</title>
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
        <meta property="og:type" content="article" />
        <meta
          property="og:image"
          content={`https://fakhoury.xyz/api/og?title=${content.title}`}
        />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          property="og:description"
          content={content.body.split(" ").slice(0, 10).join(" ") + "..."}
        />
      </Head>
      <Text h1>{content.title}</Text>
      <Badge color="primary">
        {new Date(content.timestamp * 1000).toLocaleString("en", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })}
      </Badge>
      {tags.map((tag, i) => (
        <Badge color="secondary" key={i}>
          #{tag}
        </Badge>
      ))}
      <Spacer />
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
      <Spacer y={2} />
      <Divider />
      <Link href="/writing">
        <Text size="$sm">← All writing</Text>
      </Link>
      <Text size="$xs" color="$gray600">
        Arweave transaction:{" "}
        <Link
          color="text"
          isExternal
          target="_blank"
          href={`https://viewblock.io/arweave/tx/${hash}`}
        >
          {hash}
        </Link>
      </Text>

      <Spacer y={2} />
    </Container>
  );
}

export async function getStaticPaths() {
  const posts = await getPosts();
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
  const posts = await getPosts();
  let { hash, tags, content } = posts[params["post"]];
  return {
    props: { content, hash, tags },
  };
}
