import { NextRequest, NextResponse } from "next/server";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const REPO_OWNER = "brianfakhoury";
const REPO_NAME = "fakhoury.xyz";

// "General" discussion category — change this if you create a dedicated one
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

const EMPTY = { discussion: null, comments: [] };

export async function GET(request: NextRequest) {
  const pathname = request.nextUrl.searchParams.get("pathname");
  if (!pathname) {
    return NextResponse.json(
      { error: "pathname query parameter is required" },
      { status: 400 },
    );
  }

  if (!GITHUB_TOKEN) {
    return NextResponse.json(EMPTY);
  }

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

    if (!res.ok) {
      return NextResponse.json(EMPTY, { headers: cacheHeaders(10) });
    }

    const { data } = await res.json();
    const nodes: DiscussionNode[] = data?.search?.nodes ?? [];

    // Exact title match — search returns fuzzy results
    const discussion = nodes.find((d) => d.title === pathname);

    if (!discussion) {
      return NextResponse.json(EMPTY, { headers: cacheHeaders(60) });
    }

    const comments = discussion.comments.nodes.map((c) => ({
      id: c.id,
      bodyHTML: c.bodyHTML,
      createdAt: c.createdAt,
      author: c.author,
    }));

    return NextResponse.json(
      {
        discussion: { number: discussion.number, url: discussion.url },
        comments,
      },
      { headers: cacheHeaders(60) },
    );
  } catch {
    return NextResponse.json(EMPTY, { headers: cacheHeaders(10) });
  }
}

function cacheHeaders(seconds: number) {
  return {
    "Cache-Control": `public, s-maxage=${seconds}, stale-while-revalidate=${seconds * 2}`,
  };
}
