import { getPost } from "@/lib/get-posts";
import { notFound } from "next/navigation";
import { type PropsWithChildren } from "react";

export const dynamicParams = false;

interface MetadataProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: MetadataProps) {
  const post = await getPost(params.slug);

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
          url: `/${params.slug}/og.png`,
          width: 1200,
          height: 630,
          alt: `Brian Fakhoury's headshot alongside the title of the post: "${post.title}"`,
        },
      ],
    },
    other: {
      "og:updated_time": (post.modified || post.date).toISOString(),
      "article:modified_time": (post.modified || post.date).toISOString(),
    },
    alternates: {
      canonical: `https://fakhoury.xyz/${post.slug}`,
      types: {
        "application/rss+xml": "/feed.xml",
      },
    },
  };
}

export default function Page({ children }: PropsWithChildren) {
  return children;
}
