import { getPost } from "@/lib/get-posts";
import { notFound } from "next/navigation";
import { type PropsWithChildren } from "react";

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
      images: `/${params.slug}/og.png`,
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
