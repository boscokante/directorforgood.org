'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Image from 'next/image'

interface MarkdownContentProps {
  content: string
}

export function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        img: ({ src, alt }) => {
          if (!src) return null
          return (
            <span className="block my-6">
              <img
                src={src}
                alt={alt || ''}
                className="rounded-lg w-full h-auto"
                loading="lazy"
              />
            </span>
          )
        },
        a: ({ href, children }) => (
          <a href={href} className="text-primary hover:underline" target={href?.startsWith('http') ? '_blank' : undefined}>
            {children}
          </a>
        ),
        h1: ({ children }) => <h1 className="text-3xl font-bold mt-8 mb-4">{children}</h1>,
        h2: ({ children }) => <h2 className="text-2xl font-bold mt-6 mb-3">{children}</h2>,
        h3: ({ children }) => <h3 className="text-xl font-bold mt-4 mb-2">{children}</h3>,
        p: ({ children }) => <p className="my-4 leading-relaxed">{children}</p>,
        ul: ({ children }) => <ul className="list-disc list-inside my-4 space-y-2">{children}</ul>,
        ol: ({ children }) => <ol className="list-decimal list-inside my-4 space-y-2">{children}</ol>,
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-primary pl-4 my-4 italic">{children}</blockquote>
        ),
        code: ({ children }) => (
          <code className="bg-muted px-1.5 py-0.5 rounded text-sm">{children}</code>
        ),
        pre: ({ children }) => (
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto my-4">{children}</pre>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  )
}




