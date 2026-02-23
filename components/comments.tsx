"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const REPO_OWNER = "brianfakhoury";
const REPO_NAME = "fakhoury.xyz";
const CATEGORY_SLUG = "blog-comments";

interface DiscussionComment {
  id: string;
  bodyHTML: string;
  createdAt: string;
  author: { login: string; avatarUrl: string; url: string } | null;
}

interface CommentsResponse {
  discussion: { url: string } | null;
  comments: DiscussionComment[];
}

const EMPTY_COMMENTS: CommentsResponse = {
  discussion: null,
  comments: [],
};

function relativeTime(iso: string) {
  const sec = (Date.now() - new Date(iso).getTime()) / 1000;
  if (sec < 60) return "just now";
  if (sec < 3600) return `${Math.floor(sec / 60)}m ago`;
  if (sec < 86400) return `${Math.floor(sec / 3600)}h ago`;
  if (sec < 2592000) return `${Math.floor(sec / 86400)}d ago`;
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function buildDiscussionBody(title: string, slug: string) {
  const url = `https://fakhoury.xyz/${slug}`;
  return [
    `> This is the comment thread for [**${title}**](${url}).`,
    ">",
    "> Leave a reply below to share your thoughts. Markdown and code blocks are supported.",
  ].join("\n");
}

interface CommentsProps {
  slug: string;
  title: string;
}

export default function Comments({ slug, title }: CommentsProps) {
  const [data, setData] = useState<CommentsResponse>(EMPTY_COMMENTS);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    let cancelled = false;
    setIsLoading(true);
    setData(EMPTY_COMMENTS);

    async function loadComments() {
      try {
        const res = await fetch(
          `/api/comments?title=${encodeURIComponent(title)}`,
          { signal: controller.signal }
        );

        if (!res.ok) throw new Error("Failed to fetch comments");

        const payload = (await res.json()) as CommentsResponse;
        if (cancelled) return;

        setData({
          discussion: payload?.discussion ?? null,
          comments: Array.isArray(payload?.comments) ? payload.comments : [],
        });
      } catch {
        if (cancelled) return;
        setData(EMPTY_COMMENTS);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    loadComments();

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [title]);

  const newDiscussionUrl = useMemo(() => {
    const body = buildDiscussionBody(title, slug);
    return `https://github.com/${REPO_OWNER}/${REPO_NAME}/discussions/new?category=${CATEGORY_SLUG}&title=${encodeURIComponent(title)}&body=${encodeURIComponent(body)}`;
  }, [slug, title]);

  const commentUrl = data.discussion?.url ?? newDiscussionUrl;

  return (
    <section className="mt-12 max-w-prose mx-auto">
      {isLoading && (
        <p className="text-sm text-muted-foreground animate-pulse mb-6">
          Loading comments...
        </p>
      )}

      {data.comments.length > 0 && (
        <>
          <h2 className="text-sm font-medium text-muted-foreground mb-6">
            Comments
          </h2>
          <div className="space-y-6 mb-8">
            {data.comments.map((c) => (
              <div key={c.id} className="flex gap-3">
                {c.author && (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={`${c.author.avatarUrl}&s=64`}
                    alt=""
                    width={32}
                    height={32}
                    className="rounded-full w-8 h-8 mt-0.5 shrink-0"
                  />
                )}
                <div className="min-w-0">
                  <div className="flex items-baseline gap-2 text-sm">
                    {c.author ? (
                      <Link
                        href={c.author.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-foreground hover:underline"
                      >
                        {c.author.login}
                      </Link>
                    ) : (
                      <span className="font-medium text-muted-foreground">
                        deleted user
                      </span>
                    )}
                    <time className="text-xs text-muted-foreground">
                      {relativeTime(c.createdAt)}
                    </time>
                  </div>
                  <div
                    className="prose prose-sm prose-stone dark:prose-invert mt-1 break-words [&>*:first-child]:mt-0 [&>*:last-child]:mb-0"
                    dangerouslySetInnerHTML={{ __html: c.bodyHTML }}
                  />
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {!isLoading && (
        <Link
          href={commentUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          {data.comments.length > 0
            ? "Leave a comment on GitHub \u2192"
            : "No comments yet \u2014 start a discussion on GitHub \u2192"}
        </Link>
      )}
    </section>
  );
}
