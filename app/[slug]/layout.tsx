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
      "fc:frame": JSON.stringify({
        version: "next",
        imageUrl: `https://fakhoury.xyz/${slug}/og.png`,
        button: {
          title: "Read Post",
          action: {
            type: "launch_frame",
            name: "Brian Fakhoury",
            url: `https://fakhoury.xyz/${slug}`
          }
        }
      })
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
