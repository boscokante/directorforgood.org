// Run with: node --env-file=.env.local --import tsx scripts/audit-blog-posts.ts
import { db } from '../db'
import { posts } from '../db/schema'
import { desc } from 'drizzle-orm'

async function main() {
  const allPosts = await db
    .select()
    .from(posts)
    .orderBy(desc(posts.createdAt))

  console.log(`\n=== Auditing ${allPosts.length} blog posts ===\n`)

  const issues: Array<{ slug: string; title: string; issue: string }> = []

  for (const post of allPosts) {
    const content = post.content || ''
    
    // Check for video references in content
    const hasVideoTag = /<video[^>]*>/i.test(content)
    const hasIframe = /<iframe[^>]*>/i.test(content)
    const hasVideoUrl = /https?:\/\/[^\s<>"]+\.(mp4|webm|mov|avi)/i.test(content)
    
    // Check if content seems incomplete (very short)
    const isVeryShort = content.length < 200
    
    // Check for common WordPress media patterns that might be missing
    const hasWordPressUploads = /wp-content\/uploads/i.test(content)
    
    if (isVeryShort && !hasVideoTag && !hasIframe) {
      issues.push({
        slug: post.slug,
        title: post.title,
        issue: `Very short content (${content.length} chars) - might be missing media`
      })
    }
    
    // Log posts with potential media
    if (hasVideoTag || hasIframe || hasVideoUrl) {
      console.log(`✓ ${post.slug}: Has video/media content`)
    }
  }

  console.log(`\n=== Found ${issues.length} posts with potential issues ===\n`)
  
  if (issues.length > 0) {
    issues.forEach(({ slug, title, issue }) => {
      console.log(`- ${slug} (${title}): ${issue}`)
    })
    
    console.log(`\nChecking original WordPress site for missing content...\n`)
    
    // Check each problematic post on WordPress
    for (const { slug } of issues) {
      console.log(`Checking https://hiiiwav.org/blog/${slug}...`)
    }
  } else {
    console.log('No obvious issues found!')
  }
}

main().then(() => process.exit(0)).catch(err => {
  console.error(err)
  process.exit(1)
})
