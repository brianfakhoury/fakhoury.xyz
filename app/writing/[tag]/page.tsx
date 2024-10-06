import { getPosts } from "@/lib/get-posts";
import ListOfPosts from "@/app/components/list-of-posts";
import { Link } from "@nextui-org/react";

export async function generateStaticParams() {
  const posts = await getPosts();
  const paths = new Set();
  posts.map((post) => post.tags.forEach((tag) => paths.add(tag)));

  return Array.from(paths).map((tag) => ({
    tag: tag,
  }));
}

interface TagPageProps {
  params: { tag: string };
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
