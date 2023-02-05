import ReactMarkdown from "react-markdown";
import remarkUnwrapImages from "remark-unwrap-images";
import { Text, Image, Link } from "@nextui-org/react";

export const NextMarkdown = ({ children }) => (
  <ReactMarkdown
    remarkPlugins={[remarkUnwrapImages]}
    components={{
      h1: ({ node, ...props }) => <Text h1 {...props} />,
      h2: ({ node, ...props }) => <Text h2 {...props} />,
      h3: ({ node, ...props }) => <Text h3 {...props} />,
      p: ({ node, ...props }) => <Text {...props} />,
      a: ({ node, ...props }) => (
        <Link target="_blank" css={{ display: "inline" }} {...props} />
      ),
      strong: ({ node, ...props }) => <Text b {...props} />,
      blockquote: ({ node, ...props }) => <Text blockquote {...props} />,
      code: ({ node, ...props }) => <Text code {...props} />,
      img: ({ node, ...props }) => (
        <Image alt="" css={{ borderRadius: "10px" }} {...props} />
      ),
    }}
  >
    {children}
  </ReactMarkdown>
);
