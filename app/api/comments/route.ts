import { NextRequest, NextResponse } from "next/server";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN!;
const REPO_OWNER = "brianfakhoury";
const REPO_NAME = "fakhoury.xyz";

// "General" discussion category — change this if you create a dedicated one
const CATEGORY_ID = "DIC_kwDOCPjnKs4C2d0m";

const QUERY = `
  query($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      discussions(categoryId: "${CATEGORY_ID}", first: 100, orderBy: {field: CREATED_AT, direction: DESC}) {
        nodes {
          title
          number
          url
          comments(first: 100) {
            nodes {
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

export async function GET(request: NextRequest) {
  const pathname = request.nextUrl.searchParams.get("pathname");
  if (!pathname) {
    return NextResponse.json(
      { error: "pathname query parameter is required" },
      { status: 400 },
    );
  }

  if (!GITHUB_TOKEN) {
    return NextResponse.json({ discussion: null, comments: [] });
  }

  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: QUERY,
        variables: { owner: REPO_OWNER, name: REPO_NAME },
      }),
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      return NextResponse.json({ discussion: null, comments: [] });
    }

    const { data } = await res.json();
    const discussions = data?.repository?.discussions?.nodes ?? [];
    const discussion = discussions.find(
      (d: { title: string }) => d.title === pathname,
    );

    if (!discussion) {
      return NextResponse.json({ discussion: null, comments: [] });
    }

    const comments = discussion.comments.nodes.map(
      (c: {
        bodyHTML: string;
        createdAt: string;
        author: { login: string; avatarUrl: string; url: string } | null;
      }) => ({
        bodyHTML: c.bodyHTML,
        createdAt: c.createdAt,
        author: c.author
          ? {
              login: c.author.login,
              avatarUrl: c.author.avatarUrl,
              url: c.author.url,
            }
          : null,
      }),
    );

    return NextResponse.json({
      discussion: { number: discussion.number, url: discussion.url },
      comments,
    });
  } catch {
    return NextResponse.json({ discussion: null, comments: [] });
  }
}
