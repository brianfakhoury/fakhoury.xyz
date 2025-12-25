import type { Post } from "./types";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combines Tailwind CSS classes with proper precedence using clsx and tailwind-merge
 * @param inputs - Array of class values to be merged
 * @returns Merged class string with proper Tailwind CSS precedence
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formats a date into a standardized blog post format (e.g., "Jan 1, 2024")
 * @param date - The date to format
 * @returns Formatted date string in "MMM D, YYYY" format
 */
export function formatDateForBlogPost(date: Date): string {
  return date.toLocaleDateString("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

/**
 * Converts a date into a relative time string (e.g., "5h ago")
 * @param date - The date to convert
 * @returns A string representing the relative time (e.g., "5d ago", "2h ago", "3m ago", or "just now")
 */
export function timeAgo(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const units = [
    { name: "d", value: 86400 },
    { name: "h", value: 3600 },
    { name: "m", value: 60 },
  ];

  for (const { name, value } of units) {
    const amount = Math.floor(diffInSeconds / value);
    if (amount >= 1) {
      return `${amount}${name} ago`;
    }
  }

  return "just now";
}

/**
 * Gets an array of tags with their most recent post modification dates
 * @param posts - Array of blog posts
 * @returns Array of objects containing tag names and their latest modification dates
 */
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
