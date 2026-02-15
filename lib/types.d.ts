import dynamicIconImports from "lucide-react/dynamicIconImports";
import { type LucideProps } from "lucide-react";

/**
 * Props interface for dynamic icon components
 * @interface IconProps
 * @extends {LucideProps}
 * @property {keyof typeof dynamicIconImports} name - The name of the icon from lucide-react's dynamic imports
 */
export interface IconProps extends LucideProps {
  name: keyof typeof dynamicIconImports;
}

/**
 * Represents a blog post with its metadata and content
 * @interface Post
 * @property {string[]} tags - Array of tags associated with the post
 * @property {Date} date - Publication date of the post
 * @property {Date} [modified] - Last modification date of the post (optional)
 * @property {string} slug - URL-friendly identifier for the post
 * @property {URL} [origin] - Original source URL of the post (optional)
 * @property {string} [image] - Featured image path (optional)
 * @property {string} description - Brief description or excerpt of the post
 * @property {string} title - Title of the post
 * @property {string} body - Main content of the post
 * @property {string} [series] - Name of the series this post belongs to (optional)
 * @property {string} [location] - Location associated with the post (optional)
 * @property {string} [duration] - Reading time or duration (optional)
 * @property {Post[]} [related_posts] - Array of related posts (optional)
 * @property {string[]} [category] - Categories the post belongs to (optional)
 */
export type Post = {
  tags: string[];
  date: Date;
  modified?: Date;
  slug: string;
  origin?: string;
  image?: string;
  description: string;
  title: string;
  body: string;
  series?: string;
  location?: string;
  duration?: string;
  related_posts?: Post[];
  category?: string[];
};

/**
 * Represents a collection of link groups with titles and items
 * @type {Array<{title: string, emoji: IconProps["name"], items: Array<{link: string, content: string}>}>}
 */
export type Links = [
  {
    title: string;
    emoji: IconProps["name"];
    items: [
      {
        link: string;
        content: string;
      }
    ];
  }
];
