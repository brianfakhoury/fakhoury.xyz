// app/[post]/metadata.ts
import { getPosts } from "@/lib";

export async function generateMetadata({ params }) {
  const posts = await getPosts();
  const post = posts.find((post) => post.slug === params.post);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  const { title, description, body } = post;

  const getOgDescription = (body: String, description?: String) => {
    return (
      description ||
      body.split(" ").slice(0, 10).join(" ") + "..."
    );
  };

  return {
    title: title.trim(),
    openGraph: {
      title: title.trim(),
      description: getOgDescription(body, description),
    },
  };
}
