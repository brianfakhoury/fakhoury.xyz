import { getPost } from "@/lib/get-posts";
import { notFound } from "next/navigation";
import { type PropsWithChildren } from "react";

interface MetadataProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: MetadataProps) {
  const post = await getPost(params.slug);

  if (!post) notFound();

  const getOgDescription = (body: string, description?: string) => {
    return description || body.split(" ").slice(0, 10).join(" ") + "...";
  };

  return {
    title: post.title.trim(),
    description: getOgDescription(post.body, post.description),
    openGraph: {
      url: `/${post.slug}`,
      type: "article",
      publishedTime: post.date.toISOString(),
      authors: ["Brian Fakhoury"],
      siteName: "Brian Fakhoury's website",
      locale: "en_US",
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
