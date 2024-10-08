import getPosts, { getPost } from "@/lib/get-posts";
import { ImageResponse } from "next/og";
import { NextResponse, type NextRequest } from "next/server";
import fs from "fs";
import path from "path";

export const dynamicParams = false;

interface RouteProps {
  params: { slug: string; id: string };
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

export async function GET(req: NextRequest, { params }: RouteProps) {
  const size = { width: 1200, height: 630 };

  const post = await getPost(params.slug);

  if (!post)
    return new NextResponse("There is no post that has this image.", {
      status: 404,
    });

  const cover_path = post.image
    ? path.join("content", "posts", post.image)
    : "";
  const logo_path = path.join("app", "icon.png");

  const cover_src = cover_path ? getBase64Image(cover_path) : "";
  const logo_src = getBase64Image(logo_path);

  const text_size = post.title.length > 20 ? "text-8xl" : "text-9xl";

  return new ImageResponse(
    (
      <div tw="relative flex items-center justify-center h-full w-full bg-black">
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
