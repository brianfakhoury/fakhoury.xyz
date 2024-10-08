import type { Post } from "./types";

// Format date for use in blog post heading
export function formatDateForBlogPost(date: Date): string {
  return date.toLocaleDateString("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

// Convert date to relevant distance from time of function call
export function timeAgo(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const units = [
    { name: "day", value: 86400 },
    { name: "hour", value: 3600 },
    { name: "minute", value: 60 },
  ];

  for (const { name, value } of units) {
    const amount = Math.floor(diffInSeconds / value);
    if (amount >= 1) {
      return `${amount} ${name}${amount > 1 ? "s" : ""} ago`;
    }
  }

  return "just now";
}

// helpder function to find when a tag was last posted to
export function getTagsWithLatestModified(
  posts: Post[]
): { tag: string; modified: string }[] {
  const tagDates = posts.reduce((acc, post) => {
    const postDate = new Date(post.modified || post.date)
      .toISOString()
      .split("T")[0];
    post.tags.forEach((tag) => {
      acc[tag] = acc[tag] && acc[tag] > postDate ? acc[tag] : postDate;
    });
    return acc;
  }, {} as Record<string, string>);

  // Convert the tagDates object into a list of { tag, modified } objects
  return Object.entries(tagDates).map(([tag, modified]) => ({ tag, modified }));
}
