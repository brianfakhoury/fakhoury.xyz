import { getPosts } from "../../lib";
import ClientWritingPosts from "./ClientWritingPosts";

export default async function WritingPage() {
  const posts = await getPosts();

  return (
    <div>
      <ClientWritingPosts posts={posts} />
    </div>
  );
}
