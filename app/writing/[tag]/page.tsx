import { getPosts } from "@/lib/get-posts";
import ListOfPosts from "@/app/components/list-of-posts";
import { Link } from "@nextui-org/react";

interface TagPageProps {
  params: { tag: string };
}

interface MetadataProps {
  params: { tag: string };
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
  return {
    title: `Writing - #${params.tag}`,
    description: `Essays tagged with #${params.tag}`,
    openGraph: {
      url: `/writing/${params.tag}`,
      siteName: "Brian Fakhoury's website",
      locale: "en_US",
      type: "website",
    },
    alternates: {
      canonical: `https://fakhoury.xyz/writing/${params.tag}`,
      types: {
        "application/rss+xml": "/feed.xml",
      },
    },
  };
}

export default async function TagPage({ params }: TagPageProps) {
  const posts = await getPosts();
  const tag = params.tag;
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
