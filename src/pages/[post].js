import Head from "next/head";
import { NextMarkdown } from "../components/NextMarkdown";
import {
  Container,
  Link,
  Badge,
  Text,
  Spacer,
  Divider,
} from "@nextui-org/react";
import { getPosts } from "lib";
import FancyTitle from "src/components/FancyTitle";
import { default as NextLink } from "next/link";

function filterOutImages(markdown) {
  // regular expression to match image components in markdown
  const imageRegex = /!\[[^\]]*\]\((.*?)\s*("(?:.*[^"])")?\s*\)/g;

  // replace image components with an empty string
  const filteredMarkdown = markdown.replace(imageRegex, "").replace(/\n/g, "");

  return filteredMarkdown;
}

export default function Post({ content, hash, tags }) {
  return (
    <Container>
      <Head>
        <title>{content.title}</title>
        <meta property="og:title" content={content.title} />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content={`https://fakhoury.xyz/api/og?title=${encodeURIComponent(
            content.title
          )}`}
        />
        <meta
          property="og:description"
          content={
            filterOutImages(content.body).split(" ").slice(0, 10).join(" ") +
            "..."
          }
        />
      </Head>
      <Text h1>
        <FancyTitle text={content.title} />
      </Text>
      <Badge color="primary">
        {new Date(content.timestamp * 1000).toLocaleString("en", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })}
      </Badge>
      {tags.map((tag, i) => (
        <NextLink href={`/writing/${tag}`} key={i}>
          <Badge color="secondary">#{tag}</Badge>
        </NextLink>
      ))}
      <Spacer />
      <NextMarkdown>{content.body}</NextMarkdown>
      <Spacer y={2} />
      <Divider />
      <NextLink href="/writing">
        <Text size="$sm">← All writing</Text>
      </NextLink>
      <Text size="$xs" color="$gray600" style={{ wordBreak: "break-word" }}>
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
