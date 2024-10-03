import { getPosts } from "../../../lib";
import ClientTagPosts from "./ClientTagPosts";

export async function generateStaticParams() {
  const posts = await getPosts();
  const paths = new Set();
  posts.map((post) => post.tags.forEach((tag) => paths.add(tag)));

  return Array.from(paths).map((tag) => ({
    tag: tag,
  }));
}

export default async function TagPage({ params }) {
  const posts = await getPosts();
  const tag = params.tag;
  const filteredPosts = posts.filter((post) => post.tags.includes(tag));

  return (
    <div>
      <ClientTagPosts posts={filteredPosts} tag={tag} />
    </div>
  );
}
