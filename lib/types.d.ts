import dynamicIconImports from "lucide-react/dynamicIconImports";
import { type LucideProps } from "lucide-react";

export interface IconProps extends LucideProps {
  name: keyof typeof dynamicIconImports;
}

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
