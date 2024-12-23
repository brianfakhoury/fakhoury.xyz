import { getPosts } from "@/lib/get-posts";
import ListOfPosts from "@/components/list-of-posts";
import Link from "next/link";

export const dynamicParams = false;

interface TagPageProps {
  params: Promise<{ tag: string }>;
}

interface MetadataProps {
  params: Promise<{ tag: string }>;
}

export async function generateStaticParams() {
  const posts = await getPosts();
  const paths = new Set();
  posts.map((post) => post.tags.forEach((tag) => paths.add(tag)));

  return Array.from(paths).map((tag) => ({
    tag: tag,
  }));
}

export async function generateMetadata({ params }: MetadataProps) {
  const { tag } = await params;
  return {
    title: `Writing - #${tag}`,
    description: `Essays tagged with #${tag}`,
    openGraph: {
      url: `/writing/${tag}`,
      siteName: "Brian Fakhoury",
      locale: "en_US",
      type: "website",
    },
    alternates: {
      canonical: `https://fakhoury.xyz/writing/${tag}`,
      types: {
        "application/atom+xml": "/atom.xml",
        "application/rss+xml": "/feed.xml",
        "application/json": "/feed.json",
      },
    },
  };
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params;
  const posts = await getPosts();
  const filteredPosts = posts.filter((post) => post.tags.includes(tag));

  return (
    <div>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl text-center font-bold my-4">#{tag}</h2>
        <div className="text-center my-2">
          <Link href="/writing">← Back To All Posts</Link>
        </div>
      </div>
      <ListOfPosts posts={filteredPosts} />
    </div>
  );
}
