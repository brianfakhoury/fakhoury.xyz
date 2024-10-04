import { getPosts } from "@/lib";
import ListOfPosts from "@/components/ListOfPosts";

export default async function WritingPage() {
  const posts = await getPosts();

  return (
    <div>
      <h2 className="text-3xl text-center font-bold my-4">
        Written Words
      </h2>
      <ListOfPosts posts={posts} />
    </div>
  );
}
