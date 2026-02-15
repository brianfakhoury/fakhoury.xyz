import Link from "next/link";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const REPO_OWNER = "brianfakhoury";
const REPO_NAME = "fakhoury.xyz";
const CATEGORY = "General";

const SEARCH_QUERY = `
  query($search: String!) {
    search(query: $search, type: DISCUSSION, first: 5) {
      nodes {
        ... on Discussion {
          title
          number
          url
          comments(first: 100) {
            nodes {
              id
              bodyHTML
              createdAt
              author {
                login
                avatarUrl
                url
              }
            }
          }
        }
      }
    }
  }
`;

interface DiscussionComment {
  id: string;
  bodyHTML: string;
  createdAt: string;
  author: { login: string; avatarUrl: string; url: string } | null;
}

interface DiscussionNode {
  title: string;
  number: number;
  url: string;
  comments: { nodes: DiscussionComment[] };
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

async function fetchComments(pathname: string) {
  const empty = { discussion: null as { url: string } | null, comments: [] as DiscussionComment[] };
  if (!GITHUB_TOKEN) return empty;

  try {
    const search = `repo:${REPO_OWNER}/${REPO_NAME} category:${JSON.stringify(CATEGORY)} in:title ${JSON.stringify(pathname)}`;

    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: SEARCH_QUERY,
        variables: { search },
      }),
      next: { revalidate: 60 },
    });

    if (!res.ok) return empty;

    const { data } = await res.json();
    const nodes: DiscussionNode[] = data?.search?.nodes ?? [];
    const discussion = nodes.find((d) => d.title === pathname);

    if (!discussion) return empty;

    return {
      discussion: { url: discussion.url },
      comments: discussion.comments.nodes,
    };
  } catch {
    return empty;
  }
}

interface CommentsProps {
  slug: string;
}

export default async function Comments({ slug }: CommentsProps) {
  const pathname = `/${slug}`;
  const { discussion, comments } = await fetchComments(pathname);

  const newDiscussionUrl = `https://github.com/${REPO_OWNER}/${REPO_NAME}/discussions/new?category=general&title=${encodeURIComponent(pathname)}&body=${encodeURIComponent(`Comments for [${pathname}](https://fakhoury.xyz${pathname})`)}`;
  const commentUrl = discussion?.url ?? newDiscussionUrl;

  return (
    <section className="mt-12 max-w-prose mx-auto">
      {comments.length > 0 && (
        <>
          <h2 className="text-sm font-medium text-muted-foreground mb-6">
            Comments
          </h2>
          <div className="space-y-6 mb-8">
            {comments.map((c) => (
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

      <Link
        href={commentUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        {comments.length > 0
          ? "Leave a comment on GitHub \u2192"
          : "No comments yet \u2014 start a discussion on GitHub \u2192"}
      </Link>
    </section>
  );
}
