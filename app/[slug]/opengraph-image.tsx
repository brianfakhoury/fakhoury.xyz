import { ImageResponse } from "next/og";
import { headers } from "next/headers";

export const runtime = "edge";

export const alt = "Brian Fakhoury Website Header";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

interface ImageParams {
  params: { slug: string };
}

export default async function Image({ params }: ImageParams) {
  const headersList = headers();
  const host =
    headersList.get("host") ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.VERCEL_URL;
  const protocol = host?.includes("localhost") ? "http" : "https";
  const post = await fetch(
    `${protocol}://${host}/api/get-post?slug=${params.slug}`
  ).then((res) => res.json());

  const arrayBufferToBase64 = (buffer: ArrayBuffer) => {
    const binary = new Uint8Array(buffer).reduce(
      (data, byte) => data + String.fromCharCode(byte),
      ""
    );
    return btoa(binary);
  };

  const logo_src = await fetch(new URL("../icon.png", import.meta.url))
    .then((res) => res.arrayBuffer())
    .then((buffer) => {
      const base64Flag = "data:image/jpeg;base64,";
      return base64Flag + arrayBufferToBase64(buffer);
    });

  const cover_src = post.image
    ? await fetch(`${protocol}://${host}/${post.image}`)
        .then((res) => res.arrayBuffer())
        .then((buffer) => {
          const base64Flag = "data:image/jpeg;base64,";
          return base64Flag + arrayBufferToBase64(buffer);
        })
    : "";

  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          width: "100%",
        }}
      >
        <img
          src={cover_src}
          alt=""
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        />
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            width: "100%",
            height: "100%",
            padding: "16px",
            backgroundColor: "rgba(0, 0, 0, 0.75)",
          }}
        >
          <img
            src={logo_src}
            alt=""
            style={{
              width: "256px",
              height: "256px",
              marginRight: "12px",
              borderRadius: "9999px",
            }}
          />
          <div
            style={{
              width: "1px",
              height: "100%",
              backgroundColor: "white",
            }}
          />
          <div
            style={{
              paddingLeft: "24px",
              fontSize: post.title.length > 20 ? "64px" : "72px",
              color: "white",
            }}
          >
            {post.title}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
