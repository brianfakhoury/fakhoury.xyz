import { getPost } from "@/lib/get-posts";
import { notFound } from "next/navigation";
import { type PropsWithChildren } from "react";

export const dynamicParams = false;

interface MetadataProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: MetadataProps) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) notFound();

  return {
    title: post.title.trim(),
    description: post.description,
    openGraph: {
      url: `/${post.slug}`,
      type: "article",
      publishedTime: post.date.toISOString(),
      authors: ["Brian Fakhoury"],
      siteName: "Brian Fakhoury",
      locale: "en_US",
      images: [
        {
          url: `/${slug}/og.png`,
          width: 1200,
          height: 630,
          alt: `Brian Fakhoury's headshot alongside the title of the post: "${post.title}"`,
        },
      ],
    },
    other: {
      "og:updated_time": post.modified?.toISOString(),
      "article:modified_time": post.modified?.toISOString(),
      "fc:frame": "vNext",
      "fc:frame:image": `https://fakhoury.xyz/${slug}/og.png`,
      "fc:frame:button:1": "Read on fakhoury.xyz",
      "fc:frame:button:1:action": "link",
      "fc:frame:button:1:target": `https://fakhoury.xyz/${slug}`,
      ...(post.origin && {
        "fc:frame:button:2": `Read on ${post.origin.host}`,
        "fc:frame:button:2:action": "link",
        "fc:frame:button:2:target": post.origin.href,
      }),
    },
    alternates: {
      canonical: post.origin?.href || `https://fakhoury.xyz/${slug}`,
      types: {
        "application/atom+xml": "/atom.xml",
        "application/rss+xml": "/feed.xml",
        "application/json": "/feed.json",
      },
    },
  };
}

export default function Page({ children }: PropsWithChildren) {
  return children;
}
