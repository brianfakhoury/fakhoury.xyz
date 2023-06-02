import Head from "next/head";
import { NextMarkdown } from "../components/NextMarkdown";
import {
  Container,
  Link,
  Badge,
  Text,
  Spacer,
  Divider,
  useTheme,
} from "@nextui-org/react";
import { getPosts } from "lib";
import FancyTitle from "src/components/FancyTitle";
import NextLink from "next/link";
import { useEffect, useState } from "react";
import { usePalette } from "color-thief-react";
import { getBrightness } from "utils/colorUtils";
import { filterOutImages } from "utils/markdownUtils";

function getCoverColor(data, isDark) {
  for (const color of data) {
    let brightness = getBrightness(color);
    if ((isDark && brightness < 60) || (!isDark && brightness > 150)) {
      return color;
    }
  }
  return "$background";
}

function getOgDescription(body, description) {
  return (
    description ||
    filterOutImages(body).split(" ").slice(0, 10).join(" ") + "..."
  );
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
  const [coverColor, setCoverColor] = useState("$background");
  const { data, error } = usePalette(image, 8, "hex");
  const { isDark } = useTheme();

  useEffect(() => {
    if (data) {
      setCoverColor(getCoverColor(data, isDark));
    }
  }, [data, isDark]);

  return (
    <Container>
      <Head>
        <title>{title.trim()}</title>
        <meta property="og:title" content={title.trim()}></meta>
        <meta
          property="og:image"
          content={`https://fakhoury.xyz/api/og?title=${encodeURIComponent(
            title
          )}`}
        />
        <meta
          property="og:description"
          content={getOgDescription(body, description)}
        />
        <meta
          property="description"
          content={getOgDescription(body, description)}
        />
        <meta property="twitter:title" content={title.trim()}></meta>
        <meta
          property="twitter:description"
          content={getOgDescription(body, description)}
        ></meta>
        <meta
          property="twitter:image"
          content={`https://fakhoury.xyz/api/og?title=${encodeURIComponent(
            title
          )}`}
        ></meta>
      </Head>
      <Container display="flex" direction="column" css={{ height: "350px" }}>
        <Text small>
          {date.toLocaleString("en", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </Text>
        <Text size="4vh">
          <FancyTitle text={title} />
        </Text>
      </Container>

      <Container
        css={{
          position: "absolute",
          p: "0",
          margin: "0",
          top: "0",
          left: "0",
          width: "100vw",
          height: "500px",
          zIndex: "-1",
          maxWidth: "100%",
          overflow: "hidden",
        }}
      >
        {image ? (
          <img
            style={{
              position: "absolute",
              bottom: "0",
              width: "100%",
              height: "auto",
            }}
            src={image}
          />
        ) : (
          <Container
            css={{
              width: "100%",
              height: "100%",
              backgroundColor: "$green50",
              maxWidth: "100%",
            }}
          />
        )}
        <Container
          css={{
            position: "absolute",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            maxWidth: "100%",
            bg: `linear-gradient(to bottom, ${coverColor}, ${coverColor} 75%, transparent)`,
            zIndex: "1",
            "@xs": {
              bg: `linear-gradient(to bottom, ${coverColor}, ${coverColor} 50%, transparent)`,
            },
          }}
        />
      </Container>
      <Container
        className="post"
        css={{
          "& > :first-child::first-letter": {
            initialLetter: "2",
            p: "0 8px",
            fontFamily: "serif",
          },
          borderLeft: "1px solid $gray50",
          borderRight: "1px solid $gray50",
          padding: "0 30px",
          "h2, h3": {
            position: "relative",
            paddingLeft: "20px",
          },
          "& h2::before, h3::before": {
            content: "",
            position: "absolute",
            top: "0",
            bottom: "0",
            left: "0",
            width: "5px",
            backgroundColor: "$green600",
          },
          "@media (max-width: 599px)": {
            "&": {
              borderLeft: "none",
              borderRight: "none",
              padding: "0",
            },
          },
        }}
      >
        <NextMarkdown>{body}</NextMarkdown>
      </Container>
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
      {tags.map((tag, i) => (
        <NextLink href={`/writing/${tag}`} key={i}>
          <Badge color="neutral">#{tag}</Badge>
        </NextLink>
      ))}
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
    paths: posts.map((post) => ({ params: { post: post.slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const posts = await getPosts();
  const { tags, date, slug, origin, image, description, title, body } =
    posts.find((post) => post.slug === params["post"]);

  return {
    props: { tags, date, slug, origin, image, description, title, body },
  };
}
