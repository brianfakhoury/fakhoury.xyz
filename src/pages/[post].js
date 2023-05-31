import Head from "next/head";
import { NextMarkdown } from "../components/NextMarkdown";
import {
  Container,
  Link,
  Badge,
  Text,
  Spacer,
  Divider,
  Grid,
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

export default function Post({
  tags,
  date,
  slug,
  origin,
  image,
  description,
  title,
  body,
}) {
  return (
    <Container>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta
          property="og:image"
          content={`https://fakhoury.xyz/api/og?title=${encodeURIComponent(
            title
          )}`}
        />
        <meta
          property="og:description"
          content={
            description ||
            filterOutImages(body).split(" ").slice(0, 10).join(" ") + "..."
          }
        />
      </Head>
      <Badge color="primary">
        {date.toLocaleString("en", {
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
      <Spacer y={2} />
      <Text size="36px" style={{ textAlign: "center" }}>
        <FancyTitle text={title} />
      </Text>
      <Spacer y={2} />
      <NextMarkdown>{body}</NextMarkdown>
      <Spacer y={2} />
      <Divider />
      {origin && (
        <Text size="$xs" color="$gray600" style={{ wordBreak: "break-word" }}>
          Orignally published at:{" "}
          <Link
            color="text"
            target="_blank"
            href={origin}
            style={{ display: "inline" }}
          >
            {origin}
          </Link>
        </Text>
      )}
      <NextLink href="/writing">
        <Text size="$sm">← All writing</Text>
      </NextLink>

      <Spacer y={2} />
    </Container>
  );
}

export async function getStaticPaths() {
  const posts = await getPosts();
  return {
    paths: posts.map((post) => ({
      params: { post: post.slug },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const posts = await getPosts();
  let target_post = posts.find((post) => post.slug === params["post"]);
  let { tags, date, slug, origin, image, description, title, body } =
    target_post;
  return {
    props: { tags, date, slug, origin, image, description, title, body },
  };
}
