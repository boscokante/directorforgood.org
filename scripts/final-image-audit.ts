// Run with: node --env-file=.env.local --import tsx scripts/final-image-audit.ts
import { db } from '../db'
import { posts } from '../db/schema'
import { desc } from 'drizzle-orm'

async function main() {
  const allPosts = await db
    .select()
    .from(posts)
    .orderBy(desc(posts.createdAt))

  console.log(`\n=== Final Image Audit: ${allPosts.length} posts ===\n`)

  const issues: string[] = []

  for (const post of allPosts) {
    const content = post.content || ''
    
    // Count proper images
    const properImages = (content.match(/!\[[^\]]*\]\([^)]+\)/g) || []).length
    
    // Check for orphan `!` (malformed images)
    const orphanBangs = (content.match(/\n!\n|\n\n!\n\n|^!\n/g) || []).length
    
    // Check for videos
    const hasVideo = /<video[^>]*>/i.test(content)
    
    // Check content length
    const contentLength = content.length
    
    // Determine status
    let status = '✅'
    let notes: string[] = []
    
    if (orphanBangs > 0) {
      status = '❌'
      notes.push(`${orphanBangs} orphan "!" found`)
    }
    
    if (properImages === 0 && !hasVideo && contentLength < 500) {
      status = '⚠️'
      notes.push('No images, short content')
    }
    
    if (status !== '✅') {
      issues.push(post.slug)
    }
    
    console.log(`${status} ${post.slug}`)
    console.log(`   Images: ${properImages} | Video: ${hasVideo ? 'Yes' : 'No'} | Length: ${contentLength}`)
    if (notes.length > 0) {
      console.log(`   Issues: ${notes.join(', ')}`)
    }
  }

  console.log(`\n=== Summary ===`)
  console.log(`Total: ${allPosts.length} posts`)
  console.log(`Issues: ${issues.length} posts`)
  
  if (issues.length > 0) {
    console.log(`\nPosts needing attention: ${issues.join(', ')}`)
  } else {
    console.log(`\n✅ All posts look good!`)
  }
}

main().then(() => process.exit(0)).catch(err => {
  console.error(err)
  process.exit(1)
})
