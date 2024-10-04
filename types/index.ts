import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type Post = {
  tags: string[];
  date: Date;
  slug: string;
  origin: string[];
  image: string;
  description: string;
  title: string;
  body: string;
};

export type Links = [
  {
    title: string;
    emoji?: string;
    items: [
      {
        link: string;
        content: string;
      }
    ];
  }
];