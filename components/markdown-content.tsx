'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import Image from 'next/image'
import { ImageCarousel } from './ui/image-carousel'
import { useMemo } from 'react'

interface MarkdownContentProps {
  content: string
}

// Preprocess markdown to group consecutive images into carousel markers
function preprocessMarkdown(content: string): { processed: string; carousels: Map<string, Array<{ src: string; alt: string }>> } {
  const carousels = new Map<string, Array<{ src: string; alt: string }>>()
  
  // Match image markdown patterns: ![alt](url)
  const imagePattern = /!\[([^\]]*)\]\(([^)]+)\)/g
  const lines = content.split('\n')
  const processedLines: string[] = []
  let currentCarousel: Array<{ src: string; alt: string }> | null = null
  let carouselId = 0

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()
    
    // Check if this line contains an image
    imagePattern.lastIndex = 0
    const imageMatch = imagePattern.test(line)
    
    if (imageMatch) {
      // Reset and get all images from this line
      imagePattern.lastIndex = 0
      const matches = Array.from(line.matchAll(imagePattern))
      
      if (matches.length > 0) {
        // Start or continue carousel
        if (!currentCarousel) {
          currentCarousel = []
        }
        
        // Add all images from this line
        for (const match of matches) {
          currentCarousel.push({
            alt: match[1] || '',
            src: match[2] || ''
          })
        }
        
        // Check next non-empty line
        let nextNonEmptyIdx = i + 1
        while (nextNonEmptyIdx < lines.length && lines[nextNonEmptyIdx].trim() === '') {
          nextNonEmptyIdx++
        }
        
        const nextNonEmptyLine = nextNonEmptyIdx < lines.length ? lines[nextNonEmptyIdx].trim() : null
        imagePattern.lastIndex = 0
        const nextIsImage = nextNonEmptyLine && imagePattern.test(nextNonEmptyLine)
        
        if (!nextIsImage) {
          // End of carousel
          if (currentCarousel.length > 1) {
            const id = `[CAROUSEL:${carouselId}]`
            carousels.set(id, currentCarousel)
            processedLines.push(id)
            carouselId++
          } else {
            // Single image, keep original
            processedLines.push(lines[i])
          }
          currentCarousel = null
        }
        // If next line is also image, skip adding this line (it's part of carousel)
      } else {
        processedLines.push(lines[i])
      }
    } else {
      // Not an image line
      // If it's an empty line and we're building a carousel, skip it (don't add to output)
      if (line === '' && currentCarousel && currentCarousel.length > 0) {
        // Skip empty lines between images - they'll be handled by the carousel
        continue
      }
      
      // Non-empty, non-image line - end any current carousel
      if (currentCarousel && currentCarousel.length > 0) {
        if (currentCarousel.length > 1) {
          const id = `[CAROUSEL:${carouselId}]`
          carousels.set(id, currentCarousel)
          processedLines.push(id)
          carouselId++
        } else {
          // Single image, render normally
          const img = currentCarousel[0]
          processedLines.push(`![${img.alt}](${img.src})`)
        }
        currentCarousel = null
      }
      processedLines.push(lines[i])
    }
  }

  // Handle carousel at end of content
  if (currentCarousel && currentCarousel.length > 1) {
    const id = `[CAROUSEL:${carouselId}]`
    carousels.set(id, currentCarousel)
    processedLines.push(id)
  } else if (currentCarousel && currentCarousel.length === 1) {
    const img = currentCarousel[0]
    processedLines.push(`![${img.alt}](${img.src})`)
  }

  return { processed: processedLines.join('\n'), carousels }
}

export function MarkdownContent({ content }: MarkdownContentProps) {
  const { processed, carousels } = useMemo(() => preprocessMarkdown(content), [content])

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={{
        p: ({ children, ...props }) => {
          // Check if this paragraph contains a carousel marker
          const text = String(children)
          const carouselMatch = text.match(/\[CAROUSEL:(\d+)\]/)
          
          if (carouselMatch) {
            const carouselId = `[CAROUSEL:${carouselMatch[1]}]`
            const images = carousels.get(carouselId)
            if (images) {
              return <ImageCarousel images={images} />
            }
          }
          
          return <p className="my-4 leading-relaxed text-white" {...props}>{children}</p>
        },
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
        h1: ({ children }) => <h1 className="text-3xl font-bold mt-8 mb-4 text-white">{children}</h1>,
        h2: ({ children }) => <h2 className="text-2xl font-bold mt-6 mb-3 text-white">{children}</h2>,
        h3: ({ children }) => <h3 className="text-xl font-bold mt-4 mb-2 text-white">{children}</h3>,
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
        video: ({ src, autoPlay, loop, controls, ...props }) => {
          if (!src) return null
          return (
            <div className="my-8 w-full">
              <video
                src={src}
                autoPlay={autoPlay !== undefined}
                muted={autoPlay !== undefined}
                loop={loop !== undefined}
                controls={controls !== undefined}
                playsInline
                className="w-full h-auto rounded-lg"
                {...props}
              />
            </div>
          )
        },
        iframe: ({ src, ...props }) => {
          if (!src) return null
          return (
            <div className="my-8 w-full aspect-video">
              <iframe
                src={src}
                className="w-full h-full rounded-lg"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                {...props}
              />
            </div>
          )
        },
      }}
    >
      {processed}
    </ReactMarkdown>
  )
}




