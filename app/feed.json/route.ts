import { NextResponse } from "next/server";
import getFeed from "@/lib/get-feed";

export const dynamic = "force-static";

export async function GET() {
  try {
    const feed = await getFeed();

    const xml = feed.json1();

    return new NextResponse(xml, {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    });
  } catch (error) {
    console.error("Error generating JSON feed:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
