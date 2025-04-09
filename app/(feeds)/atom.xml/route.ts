import { NextResponse } from "next/server";
import getFeed from "@/lib/get-feed";

export const dynamic = "force-static";

export async function GET() {
  const feed = await getFeed();

  const xml = feed.atom1();

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/atom+xml; charset=utf-8",
    },
  });
}
