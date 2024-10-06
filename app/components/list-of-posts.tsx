// components/ListOfPosts.jsx
import { Badge, Divider, Link } from "@nextui-org/react";
import { Post } from "@/lib/types";

interface ListOfPostsProps {
  posts: Post[];
}

export default function ListOfPosts({ posts }: ListOfPostsProps) {
  return (
    <ul className="max-w-screen-lg mx-auto">
      {posts
        .sort(
          (a: Post, b: Post) =>
            new Date(b.date).getTime() - new Date(a.date).getTime()
        )
        .map((post: Post, i: number) => (
          <li key={i}>
            <Divider />
            <div className="flex justify-between py-2">
              <div className="w-9/12">
                <Link href={`/${post.slug}`} size="lg">
                  {post.title}
                </Link>
              </div>
              <div className="w-3/12 flex justify-end items-start">
                <Badge color="primary" variant="flat">
                  {new Date(post.date).toLocaleString("en", {
                    month: "short",
                    year: "numeric",
                  })}
                </Badge>
              </div>
            </div>
          </li>
        ))}
    </ul>
  );
}
