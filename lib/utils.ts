// Format date for use in blog post heading
export function formatDateForBlogPost(date: Date): string {
  return new Date(date).toLocaleDateString("en", {
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
