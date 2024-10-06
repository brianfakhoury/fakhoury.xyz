import { getPosts, getPost } from "@/lib/get-posts";
import Image from "next/image";
import { Link } from "@nextui-org/react";
import { formatDateForBlogPost } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import React from "react";
import { notFound } from "next/navigation";
import sizeOf from "image-size";

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

interface PostPageProps {
  params: { slug: string };
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPost(params.slug);

  if (!post) return notFound();

  const { tags, date, origin, image, title, body } = post;
  const image_cover_size = image
    ? sizeOf(`content/posts/${image}`)
    : { width: 500, height: 500 };

  return (
    <article className="container prose dark:prose-invert text-pretty break-words mx-auto">
      <p className="text-sm">{formatDateForBlogPost(date)}</p>
      <h1 className="first-letter:font-greatVibes">{title}</h1>
      {origin && (
        <p className="text-xs text-pretty">
          Originally published at:{" "}
          <Link
            className="inline text-inherit text-xs underline"
            isExternal
            href={origin}
          >
            {origin}
          </Link>
        </p>
      )}
      <div className="absolute inset-0 max-w-screen-xl h-[550px] z-[-3] mx-auto overflow-hidden	">
        {image ? (
          <>
            <Image
              src={image.startsWith("/") ? image : `/${image}`}
              alt={`${title} cover image`}
              height={image_cover_size.height}
              width={image_cover_size.width}
              className="rounded-lg m-0 h-full absolute z-[-2]"
            />
          </>
        ) : (
          <div className="w-full h-full" />
        )}
        <div
          className={`absolute inset-0 z-10 bg-gradient-to-b from-background from-30%`}
        />
      </div>

      <div className="mt-20 sm:mt-5 relative">
        {image && (
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-screen max-w-3xl h-96 rounded-lg bg-gradient-to-b from-background/40 to-background to-50% z-[-2]" />
        )}
        <ReactMarkdown
          className="first-letter:text-5xl first-letter:font-bold first-letter:mr-2 first-letter:float-left pt-3"
          components={{
            img: ({ ...props }) => {
              const image_size = sizeOf(`content/posts/${props.src}`);
              const image_src = props.src?.startsWith("/")
                ? props.src
                : `/${props.src}`;

              return (
                <figure>
                  <Image
                    {...props}
                    src={image_src}
                    alt={props.alt || "blog image"}
                    height={image_size.height || "450"}
                    width={image_size.width || "500"}
                    className="rounded-lg"
                  />
                  {props.alt && <figcaption>{props.alt}</figcaption>}
                </figure>
              );
            },
          }}
        >
          {body}
        </ReactMarkdown>
      </div>

      <div className="space-y-8">
        <hr className="my-8 border-t border-gray-300" />

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
