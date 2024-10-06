import { getPost } from "@/lib/get-posts";

interface MetadataProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: MetadataProps) {
  const post = await getPost(params.slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  const { title, description, body } = post;

  const getOgDescription = (body: string, description?: string) => {
    return description || body.split(" ").slice(0, 10).join(" ") + "...";
  };

  return {
    title: title.trim(),
    openGraph: {
      title: title.trim(),
      description: getOgDescription(body, description),
    },
  };
}