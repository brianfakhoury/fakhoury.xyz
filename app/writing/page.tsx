import { getPosts } from "@/lib/get-posts";
import ListOfPosts from "@/app/components/list-of-posts";

export default async function WritingPage() {
  const posts = await getPosts();

  return (
    <div>
      <h2 className="text-3xl text-center font-bold my-4">Written Words</h2>
      <ListOfPosts posts={posts} />
    </div>
  );
}
