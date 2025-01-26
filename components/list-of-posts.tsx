// components/ListOfPosts.jsx
import Link from "next/link";
import { Post } from "@/lib/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHead,
  TableRow,
} from "@/components/ui/table";

/**
 * Props interface for the ListOfPosts component
 * @interface ListOfPostsProps
 * @property {Post[]} posts - Array of blog posts to display in the table
 */
interface ListOfPostsProps {
  posts: Post[];
}

/**
 * Renders a table of blog posts sorted by date
 * @param {ListOfPostsProps} props - The component props
 * @returns {JSX.Element} A table displaying blog post titles and dates
 */
export default function ListOfPosts({ posts }: ListOfPostsProps) {
  return (
    <div className="max-w-(--breakpoint-md) mx-auto">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent border-b border-border">
            <TableHead className="w-9/12 text-lg font-semibold">Title</TableHead>
            <TableHead className="w-3/12 text-right text-lg font-semibold">Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts
            .sort((a: Post, b: Post) => b.date.getTime() - a.date.getTime())
            .map((post: Post) => (
              <TableRow 
                key={post.slug}
                className="group transition-colors hover:bg-muted/50"
              >
                <TableCell className="py-4">
                  <Link 
                    href={`/${post.slug}`}
                    className="text-foreground/90 hover:text-foreground font-medium group-hover:underline decoration-1 underline-offset-4 transition-colors"
                  >
                    {post.title}
                  </Link>
                </TableCell>
                <TableCell className="text-right text-muted-foreground py-4">
                  {post.date.toLocaleString("en", {
                    month: "short",
                    year: "numeric",
                  })}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
