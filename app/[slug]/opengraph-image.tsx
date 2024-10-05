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
  params: {slug: string};
}

export default async function Image({ params }: ImageParams) {
  const title = params.slug ? params.slug.replace(/-/g, " ") : "Brian Fakhoury";
  const headersList = headers();
  const host =
    headersList.get("host") ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.VERCEL_URL;
  const protocol = host?.includes("localhost") ? "http" : "https";
  const azukiUrl = `${protocol}://${host}/azuki.png`;

  return new ImageResponse(
    (
      <div tw="flex items-center justify-center h-full w-full">
        <div tw="flex w-full h-full p-24">
          <img src={azukiUrl} tw="w-48 h-48 rounded-full" />
          <div tw="text-9xl text-white pr-20 pl-6 leading-[11rem]">{"//"}</div>
          <div tw="text-9xl uppercase text-white">{title}</div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
