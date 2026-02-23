import { NextResponse } from "next/server";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const REPO_OWNER = "brianfakhoury";
const REPO_NAME = "fakhoury.xyz";
const CATEGORY = "Blog Comments";

const COMMENTS_REVALIDATE_SECONDS = 60 * 60 * 24;
const COMMENTS_STALE_SECONDS = 60 * 60 * 24 * 7;

const SEARCH_QUERY = `
  query($search: String!) {
    search(query: $search, type: DISCUSSION, first: 5) {
      nodes {
        ... on Discussion {
          title
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
  url: string;
  comments: { nodes: DiscussionComment[] };
}

interface CommentsResponse {
  discussion: { url: string } | null;
  comments: DiscussionComment[];
}

const EMPTY_COMMENTS: CommentsResponse = {
  discussion: null,
  comments: [],
};

function withCacheHeaders(payload: CommentsResponse) {
  return NextResponse.json(payload, {
    headers: {
      "Cache-Control": `public, s-maxage=${COMMENTS_REVALIDATE_SECONDS}, stale-while-revalidate=${COMMENTS_STALE_SECONDS}`,
    },
  });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title")?.trim();

  if (!title || !GITHUB_TOKEN) {
    return withCacheHeaders(EMPTY_COMMENTS);
  }

  try {
    const search = `repo:${REPO_OWNER}/${REPO_NAME} category:${JSON.stringify(CATEGORY)} in:title ${JSON.stringify(title)}`;

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
      next: { revalidate: COMMENTS_REVALIDATE_SECONDS },
    });

    if (!res.ok) return withCacheHeaders(EMPTY_COMMENTS);

    const { data } = await res.json();
    const nodes: DiscussionNode[] = data?.search?.nodes ?? [];
    const discussion = nodes.find((d) => d.title === title);

    if (!discussion) return withCacheHeaders(EMPTY_COMMENTS);

    return withCacheHeaders({
      discussion: { url: discussion.url },
      comments: discussion.comments.nodes,
    });
  } catch {
    return withCacheHeaders(EMPTY_COMMENTS);
  }
}
