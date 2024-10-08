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

  // Determine the file extension to set the correct MIME type
  const ext = path.extname(filePath).toLowerCase();
  const mimeType =
    ext === ".jpg" || ext === ".jpeg" ? "image/jpeg" : "image/png";

  // Return the image as a base64-encoded string
  return `data:${mimeType};base64,${imageBuffer.toString("base64")}`;
}

export async function GET(req: NextRequest, { params }: RouteProps) {
  const size = { width: 1200, height: 630 };

  const post = await getPost(params.slug);

  if (!post) return new NextResponse("Not found", { status: 404 });

  const cover_path = post.image
    ? path.join("content", "posts", post.image)
    : "";
  const logo_path = path.join("app", "icon.png");

  const cover_src = cover_path ? getBase64Image(cover_path) : "";
  const logo_src = getBase64Image(logo_path);

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