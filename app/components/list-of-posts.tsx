// components/ListOfPosts.jsx
import { Divider } from "@nextui-org/react";
import Link from "next/link";
import { Post } from "@/lib/types";

interface ListOfPostsProps {
  posts: Post[];
}

export default function ListOfPosts({ posts }: ListOfPostsProps) {
  return (
    <ul className="max-w-screen-md mx-auto">
      {posts
        .sort((a: Post, b: Post) => b.date.getTime() - a.date.getTime())
        .map((post: Post, i: number) => (
          <li key={i}>
            <Divider />
            <div className="flex justify-between py-2">
              <div className="w-9/12">
                <Link href={`/${post.slug}`}>{post.title}</Link>
              </div>
              <div className="w-3/12 flex justify-end items-start">
                {post.date.toLocaleString("en", {
                  month: "short",
                  year: "numeric",
                })}
              </div>
            </div>
          </li>
        ))}
    </ul>
  );
}
