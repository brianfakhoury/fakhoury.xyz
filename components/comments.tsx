"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";

const REPO = "brianfakhoury/fakhoury.xyz";
const LABEL = "blog-comment";

interface Comment {
  id: number;
  user: { login: string; avatar_url: string; html_url: string };
  body_html: string;
  created_at: string;
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
  const [issueNumber, setIssueNumber] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!mounted) return;

    const controller = new AbortController();

    async function load() {
      try {
        // List issues tagged with the blog-comment label
        const res = await fetch(
          `https://api.github.com/repos/${REPO}/issues?labels=${LABEL}&state=open&per_page=100`,
          {
            signal: controller.signal,
            headers: { Accept: "application/vnd.github+json" },
          },
        );
        if (!res.ok) return;

        const issues: { number: number; title: string; comments: number }[] =
          await res.json();
        const issue = issues.find((i) => i.title === pathname);

        if (issue) {
          setIssueNumber(issue.number);

          if (issue.comments > 0) {
            const commentsRes = await fetch(
              `https://api.github.com/repos/${REPO}/issues/${issue.number}/comments?per_page=100`,
              {
                signal: controller.signal,
                headers: { Accept: "application/vnd.github.full+json" },
              },
            );
            if (commentsRes.ok) setComments(await commentsRes.json());
          }
        }
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

  const issueUrl = issueNumber
    ? `https://github.com/${REPO}/issues/${issueNumber}`
    : `https://github.com/${REPO}/issues/new?title=${encodeURIComponent(pathname)}&labels=${encodeURIComponent(LABEL)}&body=${encodeURIComponent(`Comments for [${pathname}](https://fakhoury.xyz${pathname})`)}`;

  return (
    <section className="mt-12 max-w-prose mx-auto">
      <h2 className="text-sm font-medium text-muted-foreground mb-6">
        Comments
      </h2>

      {loading ? (
        <p className="text-sm text-muted-foreground animate-pulse">
          Loading...
        </p>
      ) : (
        <>
          {comments.length > 0 ? (
            <div className="space-y-6 mb-8">
              {comments.map((c) => (
                <div key={c.id} className="flex gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`${c.user.avatar_url}&s=64`}
                    alt=""
                    width={32}
                    height={32}
                    className="rounded-full w-8 h-8 mt-0.5 shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="flex items-baseline gap-2 text-sm">
                      <a
                        href={c.user.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-foreground hover:underline"
                      >
                        {c.user.login}
                      </a>
                      <time className="text-xs text-muted-foreground">
                        {relativeTime(c.created_at)}
                      </time>
                    </div>
                    <div
                      className="prose prose-sm prose-stone dark:prose-invert mt-1 break-words [&>*:first-child]:mt-0 [&>*:last-child]:mb-0"
                      dangerouslySetInnerHTML={{ __html: c.body_html }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground mb-4">
              No comments yet.
            </p>
          )}

          <a
            href={issueUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Leave a comment on GitHub &rarr;
          </a>
        </>
      )}
    </section>
  );
}
