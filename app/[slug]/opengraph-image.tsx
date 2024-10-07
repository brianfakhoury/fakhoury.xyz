import { ImageResponse } from "next/og";

// TODO: make static, theses images should be cached for each post

export const runtime = "edge";
export const alt = "Brian Fakhoury Blog Header";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

interface ImageParams {
  params: { slug: string };
}

export default async function Image({ params }: ImageParams) {
  const host = process.env.VERCEL_URL
    ? `https://fakhoury.xyz`
    : `http://localhost:${process.env.PORT || 3000}`;

  const post = await fetch(`${host}/api/get-post?slug=${params.slug}`).then(
    (res) => res.json()
  );
  const logo_src = `${host}/icon.png`;
  const cover_src = post.image ? `${host}/${post.image}` : "";

  const text_size = post.title.length > 20 ? "text-8xl" : "text-9xl";

  return new ImageResponse(
    (
      <div tw="relative flex items-center justify-center h-full w-full">
        {cover_src && (
          <img
            src={cover_src}
            alt=""
            tw="absolute top-0 left-0 w-full h-full object-cover"
          />
        )}
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
