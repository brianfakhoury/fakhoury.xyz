import { getPosts } from "@/lib";
import Image from "next/image";
import { Link } from "@nextui-org/react";
import { getCoverColorFromImage, formatDate } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import React from "react";

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

  const { tags, date, origin, image, title, body } = post;

  // Correct the image path
  const imagePath = image ? (image.startsWith("/") ? image : `/${image}`) : "";

  // Compute coverColor using utility function
  const coverColor = image
    ? await getCoverColorFromImage(imagePath)
    : "#FFFFFF";

  return (
    <article className="container prose dark:prose-invert text-pretty break-words mx-auto">
      <p className="text-sm">{formatDate(date)}</p>
      <h1 className="first-letter:font-greatVibes">{title}</h1>
      <div className="absolute inset-0 w-full h-[550px] z-[-3] overflow-hidden	">
        {image ? (
          <>
            <Image
              src={imagePath}
              alt={title}
              fill
              className="rounded-lg m-0 absolute z-[-2]"
              priority
            />
          </>
        ) : (
          <div className="w-full h-full" />
        )}
        <div
          className={`absolute inset-0 z-10 bg-gradient-to-b from-background from-30%`}
        />
      </div>

      <div className="relative">
        {image && (
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-screen max-w-3xl h-96 rounded-lg bg-gradient-to-b from-background/40 to-background to-50% z-[-2]" />
        )}
        <ReactMarkdown
          className="first-letter:text-5xl first-letter:font-bold first-letter:mr-2 first-letter:float-left"
          components={{
            img: ({ node, ...props }) => (
              <figure>
                <img {...props} className="rounded-lg"/>
                {props.alt && <figcaption>{props.alt}</figcaption>}
              </figure>
            ),
          }}
        >
          {body}
        </ReactMarkdown>
      </div>

      <div className="space-y-8">
        <hr className="my-8 border-t border-gray-300" />

        {origin && (
          <p className="text-xs text-gray-600 break-words mt-4">
            Originally published at:{" "}
            <a
              className="underline"
              target="_blank"
              rel="noopener noreferrer"
              href={origin}
            >
              {origin}
            </a>
          </p>
        )}

        <div className="flex flex-wrap gap-2 mt-4">
          {tags.map((tag: string, i: number) => (
            <Link href={`/writing/${tag}`} key={i}>
              #{tag}
            </Link>
          ))}
        </div>

        <Link href="/writing">← All writing</Link>
      </div>
    </article>
  );
}
