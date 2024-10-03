// app/[post]/page.tsx
import { getPosts } from "../../lib";
import ClientPost from "./ClientPost";

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({
    post: post.slug,
  }));
}

export default async function PostPage({ params }) {
  const posts = await getPosts();
  const post = posts.find((post) => post.slug === params.post);

  if (!post) {
    return <div>Post not found</div>;
  }

  const { tags, date, slug, origin, image, description, title, body } = post;

  return (
    <div>
      <ClientPost
        title={title}
        body={body}
        tags={tags}
        date={date}
        origin={origin}
        image={image}
      />
    </div>
  );
}
