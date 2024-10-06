import { getPost } from "@/lib/get-posts";
import { NextResponse, type NextRequest } from "next/server";

// wraps get post in api call with slug as param, returns post
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const slug = searchParams.get("slug");

  if (!slug)
    return NextResponse.json({ message: "No slug included" }, { status: 404 });
  const post = await getPost(slug);
  if (!post) {
    return NextResponse.json({ message: "Post not found" }, { status: 404 });
  }
  return NextResponse.json(post, { status: 200 });
}
