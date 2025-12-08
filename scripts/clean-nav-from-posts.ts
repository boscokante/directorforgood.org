// Run with: node --env-file=.env.local --import tsx scripts/clean-nav-from-posts.ts
import { db } from '../db'
import { posts } from '../db/schema'
import { desc, eq } from 'drizzle-orm'

async function main() {
  const allPosts = await db
    .select()
    .from(posts)
    .orderBy(desc(posts.createdAt))

  console.log(`\n=== Cleaning WordPress nav from ${allPosts.length} posts ===\n`)

  let cleanedCount = 0

  for (const post of allPosts) {
    let content = post.content || ''
    const originalContent = content

    // Remove WordPress header/nav sections
    // Pattern: From start until the actual content heading (###, ##, or #)
    const navPatterns = [
      // Logo link at start followed by menu items
      /^\[!\[Hiiiwav_white\][\s\S]*?Menu\n[\s\S]*?\n\n(?=###|##|#[^#]|\*\s+\[)/,
      // Just the menu section
      /\*\s+\[Home\]\(https:\/\/hiiiwav\.org\/?\)\n[\s\S]*?Menu\n[\s\S]*?\n\n/g,
      // Footer section
      /######\s*\*?Copyright[\s\S]*$/,
      // Black Music Entrepreneurship footer
      /######\s*Black Music Entrepreneurship[\s\S]*$/,
    ]

    for (const pattern of navPatterns) {
      content = content.replace(pattern, '')
    }

    // Clean up multiple consecutive newlines
    content = content.replace(/\n{4,}/g, '\n\n\n')
    content = content.trim()

    if (content !== originalContent) {
      await db
        .update(posts)
        .set({ content })
        .where(eq(posts.id, post.id))

      const removed = originalContent.length - content.length
      console.log(`✅ Cleaned ${post.slug}: Removed ${removed} chars`)
      cleanedCount++
    } else {
      console.log(`- ${post.slug}: No nav found`)
    }
  }

  console.log(`\n=== Done! Cleaned ${cleanedCount} posts ===`)
}

main().then(() => process.exit(0)).catch(err => {
  console.error(err)
  process.exit(1)
})
