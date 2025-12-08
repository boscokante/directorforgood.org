// Run with: node --env-file=.env.local --import tsx scripts/final-image-report.ts
import { db } from '../db'
import { posts } from '../db/schema'
import { desc } from 'drizzle-orm'

function extractImageUrls(content: string): string[] {
  const markdownImages = (content.match(/!\[[^\]]*\]\(([^)]+)\)/g) || [])
    .map(match => match.match(/\(([^)]+)\)/)?.[1])
    .filter(Boolean) as string[]
  
  const htmlImages = (content.match(/<img[^>]+src="([^"]+)"/gi) || [])
    .map(match => match.match(/src="([^"]+)"/i)?.[1])
    .filter(Boolean) as string[]
  
  const videoImages = (content.match(/<video[^>]+src="([^"]+)"/gi) || [])
    .map(match => match.match(/src="([^"]+)"/i)?.[1])
    .filter(Boolean) as string[]
  
  return [...new Set([...markdownImages, ...htmlImages, ...videoImages])]
}

async function main() {
  const allPosts = await db
    .select()
    .from(posts)
    .orderBy(desc(posts.createdAt))

  console.log(`\n=== Final Image Status Report ===\n`)

  let totalImages = 0
  let postsWithImages = 0
  let postsWithCoverImages = 0

  for (const post of allPosts) {
    const content = post.content || ''
    const images = extractImageUrls(content)
    const hasCoverImage = !!post.coverImage
    const hasContentImages = images.length > 0
    
    totalImages += images.length
    if (hasContentImages) postsWithImages++
    if (hasCoverImage) postsWithCoverImages++

    const status = hasCoverImage || hasContentImages ? '✓' : '⚠'
    console.log(`${status} ${post.slug}: ${hasCoverImage ? 'Cover' : 'No cover'}, ${images.length} content image(s)`)
  }

  console.log(`\n=== Summary ===`)
  console.log(`Total posts: ${allPosts.length}`)
  console.log(`Posts with cover images: ${postsWithCoverImages}`)
  console.log(`Posts with content images: ${postsWithImages}`)
  console.log(`Total content images: ${totalImages}`)
  console.log(`\n✅ All posts have been checked!`)
}

main().then(() => process.exit(0)).catch(err => {
  console.error(err)
  process.exit(1)
})
