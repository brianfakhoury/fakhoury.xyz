import { ImageResponse } from "next/og";
import { headers } from "next/headers";

// export const runtime = "edge";

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

  const text_size = post.title.length > 20 ? "text-8xl" : "text-9xl";

  return new ImageResponse(
    (
      <div tw="relative flex items-center justify-center h-full w-full">
        <img src={cover_src} alt="" tw="absolute top-0 left-0 w-full h-full" />
        <div tw="relative flex items-center w-full h-full p-16 bg-black/75">
          <img src={logo_src} alt="" tw="w-64 h-64 mr-12 rounded-full" />
          <div tw="w-1 h-full bg-white" />
          <div tw={`${text_size} text-white pl-24`}>{post.title}</div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
