import { NextResponse } from "next/server";
import getFeed from "@/lib/get-feed";

export async function GET() {
  const feed = await getFeed();

  const xml = feed.json1();

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });
}
