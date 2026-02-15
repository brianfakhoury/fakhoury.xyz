"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";

const REPO = "brianfakhoury/fakhoury.xyz";
const CATEGORY_SLUG = "general";

interface Comment {
  bodyHTML: string;
  createdAt: string;
  author: { login: string; avatarUrl: string; url: string } | null;
}

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

export default function Comments() {
  const pathname = usePathname();
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const [comments, setComments] = useState<Comment[]>([]);
  const [discussionUrl, setDiscussionUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!mounted) return;

    const controller = new AbortController();

    async function load() {
      try {
        const res = await fetch(
          `/api/comments?pathname=${encodeURIComponent(pathname)}`,
          { signal: controller.signal },
        );
        if (!res.ok) return;

        const data = await res.json();
        if (data.discussion) setDiscussionUrl(data.discussion.url);
        if (data.comments) setComments(data.comments);
      } catch (e) {
        if (e instanceof DOMException && e.name === "AbortError") return;
      } finally {
        setLoading(false);
      }
    }

    load();
    return () => controller.abort();
  }, [mounted, pathname]);

  if (!mounted) return null;

  const newDiscussionUrl = `https://github.com/${REPO}/discussions/new?category=${CATEGORY_SLUG}&title=${encodeURIComponent(pathname)}&body=${encodeURIComponent(`Comments for [${pathname}](https://fakhoury.xyz${pathname})`)}`;
  const commentUrl = discussionUrl ?? newDiscussionUrl;

  if (loading) {
    return (
      <section className="mt-12 max-w-prose mx-auto">
        <p className="text-sm text-muted-foreground animate-pulse">
          Loading comments...
        </p>
      </section>
    );
  }

  return (
    <section className="mt-12 max-w-prose mx-auto">
      {comments.length > 0 && (
        <>
          <h2 className="text-sm font-medium text-muted-foreground mb-6">
            Comments
          </h2>
          <div className="space-y-6 mb-8">
            {comments.map((c, i) => (
              <div key={i} className="flex gap-3">
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
                      <a
                        href={c.author.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-foreground hover:underline"
                      >
                        {c.author.login}
                      </a>
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

      <a
        href={commentUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        {comments.length > 0
          ? "Leave a comment on GitHub \u2192"
          : "No comments yet \u2014 start a discussion on GitHub \u2192"}
      </a>
    </section>
  );
}
