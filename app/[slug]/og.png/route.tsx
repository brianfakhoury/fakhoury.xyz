import getPosts, { getPost } from "@/lib/get-posts";
import { ImageResponse } from "next/og";
import { NextResponse, type NextRequest } from "next/server";

export const dynamicParams = false;

interface RouteProps {
  params: { slug: string; id: string };
}

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function GET(req: NextRequest, { params }: RouteProps) {
  const size = { width: 1200, height: 630 };

  const post = await getPost(params.slug);

  if (!post) return new NextResponse("Not found", { status: 404 });

  const host = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : `http://localhost:${process.env.PORT || 3000}`;

  const cover_src = post.image ? `${host}/${post.image}` : "";
  const logo_src = `${host}/icon.png`;
  const text_size = post.title.length > 20 ? "text-8xl" : "text-9xl";

  return new ImageResponse(
    (
      <div tw="relative flex items-center justify-center h-full w-full">
        {cover_src && (
          <img
            src={cover_src}
            width={1200} // Explicit width
            height={630} // Explicit height
            alt=""
            tw="absolute top-0 left-0 w-full h-full"
          />
        )}
        <div tw="relative flex items-center w-full h-full p-16 bg-black/75">
          <img
            src={logo_src}
            width={256}
            height={256}
            alt=""
            tw="w-64 h-64 mr-12 rounded-full"
          />
          <div tw="w-1 h-full bg-white" />
          <div tw={`${text_size} text-white pl-24`}>
            {post.title.split(":")[0]}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
