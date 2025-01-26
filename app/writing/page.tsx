import { getPosts } from "@/lib/get-posts";
import ListOfPosts from "@/components/list-of-posts";
import { getTagsWithLatestModified } from "@/lib/utils";
import Link from "next/link";

export const metadata = {
  title: "Writing",
  description: "A collection of written words by Brian Fakhoury.",
  openGraph: {
    url: "/writing",
    siteName: "Brian Fakhoury",
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: "https://fakhoury.xyz/writing",
    types: {
      "application/atom+xml": "/atom.xml",
      "application/rss+xml": "/feed.xml",
      "application/json": "/feed.json",
    },
  },
};

export default async function WritingPage() {
  const posts = await getPosts();
  const tags = getTagsWithLatestModified(posts);

  return (
    <div className="container max-w-(--breakpoint-md) mx-auto py-8">
      <header className="mb-12 space-y-4">
        <div className="flex items-baseline justify-between">
          <h1 className="text-4xl font-bold tracking-tight">Writing</h1>
          <span className="text-sm text-muted-foreground">
            {posts.length} {posts.length === 1 ? 'post' : 'posts'}
          </span>
        </div>
        <p className="text-lg text-muted-foreground">
          A collection of essays and thoughts on technology, philosophy, and life.
          Subscribe via{" "}
          <a 
            href="/feed.xml" 
            className="underline underline-offset-4 hover:text-foreground transition-colors"
          >
            RSS
          </a>
          .
        </p>
        <div className="flex flex-wrap gap-2 pt-2">
          {tags.map(({ tag }) => (
            <Link
              key={tag}
              href={`/writing/${tag}`}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded-md bg-muted/50 hover:bg-muted"
            >
              #{tag}
            </Link>
          ))}
        </div>
      </header>
      <ListOfPosts posts={posts} />
    </div>
  );
}
