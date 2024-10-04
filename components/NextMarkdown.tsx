// components/NextMarkdown.tsx
import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkUnwrapImages from 'remark-unwrap-images'
import { Link, LinkProps } from '@nextui-org/react'

export const NextMarkdown = ({ children }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkUnwrapImages]}
      // components={{
      //   h1: ({ node, ...props }) => <h1  {...props} />,
      //   h2: ({ node, ...props }) => <h2  {...props} />,
      //   h3: ({ node, ...props }) => <h3  {...props} />,
      //   p: ({ node, ...props }) => <p  {...props} />,
      //   a: ({ node, ...props }) => (
      //     <Link
      //       href={props.href}
      //       isExternal
      //       {...(props as LinkProps)}
      //     >
      //       {props.children}
      //     </Link>
      //   ),
      //   code: ({ node, inline, className, children, ...props }) => {
      //     return inline ? (
      //       <code  {...props}>
      //         {children}
      //       </code>
      //     ) : (
      //       <pre  {...props}>
      //         <code >{children}</code>
      //       </pre>
      //     )
      //   },
      //   strong: ({ node, ...props }) => <strong  {...props} />,
      //   blockquote: ({ node, ...props }) => (
      //     <blockquote
      //       {...props}
      //     />
      //   ),
      //   img: ({ node, alt, ...props }) => {
      //     return (
      //       <div>
      //         <img {...props} alt={alt} />
      //         {alt && (
      //           <div>{alt}</div>
      //         )}
      //       </div>
      //     )
      //   },
      // }}
    >
      {children}
    </ReactMarkdown>
  )
}
