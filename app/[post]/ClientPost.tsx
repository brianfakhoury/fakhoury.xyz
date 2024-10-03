// app/[post]/ClientPost.tsx
"use client";

import { useEffect, useState } from "react";
import { usePalette } from "color-thief-react";
import { getBrightness } from "../../utils/colorUtils";
import { Container, Text, Spacer, Divider, Badge, Link } from "@nextui-org/react";
import FancyTitle from "../components/FancyTitle";
import NextLink from "next/link";
import { NextMarkdown } from "../components/NextMarkdown";

function getCoverColor(data, isDark) {
  for (const color of data) {
    let brightness = getBrightness(color);
    if ((isDark && brightness < 60) || (!isDark && brightness > 180)) {
      return color;
    }
  }
  return "$background";
}

export default function ClientPost({ title, body, tags, date, origin, image }) {
  const [coverColor, setCoverColor] = useState("$background");
  const { data } = usePalette(image, 10, "hex");
  const isDark = false; // replace with actual theme logic if needed

  useEffect(() => {
    if (data) {
      setCoverColor(getCoverColor(data, isDark));
    }
  }, [data, isDark]);

  return (
    <Container>
      <Container display="flex" direction="column" css={{ height: "350px" }}>
        <Text small>
          {new Date(date).toLocaleString("en", {
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
          display: "flex",
          justifyContent: "center",
        }}
      >
        {image ? (
          <img
            src={image}
            alt={title}
            style={{
              position: "absolute",
              bottom: "0",
              width: "100%",
              height: "auto",
              maxWidth: "1000px",
              borderRadius: "20px",
            }}
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
            bg: `linear-gradient(to bottom, ${coverColor}, ${coverColor} 65%, transparent)`,
            zIndex: "1",
          }}
        />
      </Container>

      <Container className="post">
        <NextMarkdown>{body}</NextMarkdown>
      </Container>

      <Spacer y={2} />
      <Divider />
      {origin && (
        <Text size="$xs" color="$gray600" style={{ wordBreak: "break-word" }}>
          Orignally published at:{" "}
          <Link color="text" target="_blank" href={origin}>
            {origin}
          </Link>
        </Text>
      )}
      {tags.map((tag, i) => (
        <NextLink href={`/writing/${tag}`} key={i}>
          <Badge color="default">#{tag}</Badge>
        </NextLink>
      ))}
      <NextLink href="/writing">
        <Text size="$sm">← All writing</Text>
      </NextLink>

      <Spacer y={2} />
    </Container>
  );
}
