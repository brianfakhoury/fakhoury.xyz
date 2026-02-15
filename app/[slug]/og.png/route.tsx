import getPosts, { getPost } from "@/lib/get-posts";
import { ImageResponse } from "next/og";
import { NextResponse, type NextRequest } from "next/server";
import fs from "fs";
import path from "path";

interface RouteProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

function getBase64Image(filePath: string): string {
  const imagePath = path.resolve(process.cwd(), filePath);
  const imageBuffer = fs.readFileSync(imagePath);

  const ext = path.extname(filePath).toLowerCase();
  let mimeType;

  if (ext === ".jpg" || ext === ".jpeg") {
    mimeType = "image/jpeg";
  } else if (ext === ".png") {
    mimeType = "image/png";
  } else if (ext === ".gif") {
    mimeType = "image/gif";
  } else {
    throw new Error("Unsupported image format for OG image generation");
  }

  return `data:${mimeType};base64,${imageBuffer.toString("base64")}`;
}

export async function GET(_req: NextRequest, { params }: RouteProps) {
  const { slug } = await params;
  const size = { width: 1200, height: 630 };

  const post = await getPost(slug);

  if (!post)
    return new NextResponse("There is no post that has this image.", {
      status: 404,
    });

  const cover_src = post.image
    ? getBase64Image(path.join("content", "posts", post.image))
    : "";

  const logo_src = getBase64Image(path.join("app", "icon.png"));

  const text_size = post.title.length > 20 ? "text-8xl" : "text-9xl";

  return new ImageResponse(
    (
      /* eslint-disable @next/next/no-img-element, jsx-a11y/alt-text */
      <div tw="relative flex items-center justify-center h-full w-full bg-black">
        {cover_src && <img src={cover_src} tw="absolute left-0 w-full" />}
        <div tw="relative flex items-center w-full h-full p-16 bg-black/75">
          <img src={logo_src} tw="w-64 h-64 mr-18 rounded-full" />
          <div tw="w-2 h-full bg-white rounded-lg" />
          <div tw={`${text_size} text-white pl-18`}>
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
