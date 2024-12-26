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
    <div className="container max-w-screen-md mx-auto py-8">
      <header className="mb-12 space-y-4">
        <div className="flex items-baseline justify-between">
          <h1 className="text-4xl font-bold tracking-tight">#{tag}</h1>
          <span className="text-sm text-muted-foreground">
            {filteredPosts.length} {filteredPosts.length === 1 ? 'post' : 'posts'}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-lg text-muted-foreground">
            Posts tagged with #{tag}
          </p>
          <Link 
            href="/writing" 
            className="text-sm text-muted-foreground hover:text-foreground underline underline-offset-4 transition-colors"
          >
            ← All posts
          </Link>
        </div>
      </header>
      <ListOfPosts posts={filteredPosts} />
    </div>
  );
}
