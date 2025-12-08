// Run with: node --env-file=.env.local --import tsx scripts/test-carousel.ts
import { db } from '../db'
import { posts } from '../db/schema'
import { eq } from 'drizzle-orm'

function preprocessMarkdown(content: string): { processed: string; carousels: Map<string, Array<{ src: string; alt: string }>> } {
  const carousels = new Map<string, Array<{ src: string; alt: string }>>()
  
  const imagePattern = /!\[([^\]]*)\]\(([^)]+)\)/g
  const lines = content.split('\n')
  const processedLines: string[] = []
  let currentCarousel: Array<{ src: string; alt: string }> | null = null
  let carouselId = 0

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()
    
    imagePattern.lastIndex = 0
    const imageMatch = imagePattern.test(line)
    
    if (imageMatch) {
      imagePattern.lastIndex = 0
      const matches = Array.from(line.matchAll(imagePattern))
      
      if (matches.length > 0) {
        if (!currentCarousel) {
          currentCarousel = []
        }
        
        for (const match of matches) {
          currentCarousel.push({
            alt: match[1] || '',
            src: match[2] || ''
          })
        }
        
        let nextNonEmptyIdx = i + 1
        while (nextNonEmptyIdx < lines.length && lines[nextNonEmptyIdx].trim() === '') {
          nextNonEmptyIdx++
        }
        
        const nextNonEmptyLine = nextNonEmptyIdx < lines.length ? lines[nextNonEmptyIdx].trim() : null
        imagePattern.lastIndex = 0
        const nextIsImage = nextNonEmptyLine && imagePattern.test(nextNonEmptyLine)
        
        if (!nextIsImage) {
          if (currentCarousel.length > 1) {
            const id = `__CAROUSEL_${carouselId}__`
            carousels.set(id, currentCarousel)
            processedLines.push(id)
            carouselId++
          } else {
            processedLines.push(lines[i])
          }
          currentCarousel = null
        }
      } else {
        processedLines.push(lines[i])
      }
    } else {
      // If it's an empty line and we're building a carousel, skip it
      if (line === '' && currentCarousel && currentCarousel.length > 0) {
        continue
      }
      
      if (currentCarousel && currentCarousel.length > 0) {
        if (currentCarousel.length > 1) {
          const id = `__CAROUSEL_${carouselId}__`
          carousels.set(id, currentCarousel)
          processedLines.push(id)
          carouselId++
        } else {
          const img = currentCarousel[0]
          processedLines.push(`![${img.alt}](${img.src})`)
        }
        currentCarousel = null
      }
      processedLines.push(lines[i])
    }
  }

  if (currentCarousel && currentCarousel.length > 1) {
    const id = `__CAROUSEL_${carouselId}__`
    carousels.set(id, currentCarousel)
    processedLines.push(id)
  } else if (currentCarousel && currentCarousel.length === 1) {
    const img = currentCarousel[0]
    processedLines.push(`![${img.alt}](${img.src})`)
  }

  return { processed: processedLines.join('\n'), carousels }
}

async function main() {
  const post = await db.select().from(posts).where(eq(posts.slug, 'the-crowning')).limit(1).then(r => r[0])
  
  if (!post) {
    console.log('Post not found')
    return
  }

  const content = post.content || ''
  const lines = content.split('\n')
  
  console.log('=== LINE ANALYSIS ===')
  console.log('Total lines:', lines.length)
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const trimmed = line.trim()
    const isImage = /!\[([^\]]*)\]\(([^)]+)\)/.test(trimmed)
    if (isImage || i < 15) {
      console.log(`[${i}] ${isImage ? 'IMG' : '   '} empty=${trimmed===''} "${trimmed.substring(0, 60)}"`)
    }
  }

  console.log('\n=== PREPROCESSING ===')
  const { processed, carousels } = preprocessMarkdown(content)
  
  console.log('Carousels found:', carousels.size)
  for (const [id, images] of carousels) {
    console.log(`  ${id}: ${images.length} images`)
  }
}

main().then(() => process.exit(0)).catch(console.error)
