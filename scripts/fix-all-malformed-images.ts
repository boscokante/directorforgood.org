// Run with: node --env-file=.env.local --import tsx scripts/fix-all-malformed-images.ts
import { db } from '../db'
import { posts } from '../db/schema'
import { desc, eq } from 'drizzle-orm'

// Map of posts with malformed `!` to their correct image URLs
const IMAGE_FIXES: Record<string, string> = {
  'hiiiwav-fest': 'https://hiiiwav.org/wp-content/uploads/2024/02/HiiiWAV-Fest.png',
  'hiiifrequency': 'https://hiiiwav.org/wp-content/uploads/2024/02/HiiiFrequency.png',
  'revibes': 'https://hiiiwav.org/wp-content/uploads/2024/02/ReVibes.png',
}

async function main() {
  const allPosts = await db
    .select()
    .from(posts)
    .orderBy(desc(posts.createdAt))

  console.log(`\n=== Checking ${allPosts.length} posts for malformed images ===\n`)

  let fixedCount = 0

  for (const post of allPosts) {
    let content = post.content || ''
    const originalContent = content

    // Check for standalone `!` that should be an image
    if (/^#[^\n]+\n\n!\n\n/.test(content) || /\n\n!\n\n/.test(content)) {
      const imageUrl = IMAGE_FIXES[post.slug]
      
      if (imageUrl) {
        // Replace malformed `!` after heading with proper image
        content = content.replace(
          /^(#[^\n]+\n\n)!\n\n/,
          `$1![${post.title}](${imageUrl})\n\n`
        )
        // Also replace any other standalone `!`
        content = content.replace(/\n\n!\n\n/g, '\n\n')
      } else {
        // Just remove orphan `!` if no image URL known
        content = content.replace(/\n\n!\n\n/g, '\n\n')
        content = content.replace(/^(#[^\n]+\n\n)!\n\n/, '$1')
      }
    }

    if (content !== originalContent) {
      await db
        .update(posts)
        .set({ content })
        .where(eq(posts.id, post.id))

      console.log(`✅ Fixed: ${post.slug}`)
      fixedCount++
    }
  }

  console.log(`\n=== Done! Fixed ${fixedCount} posts ===`)
}

main().then(() => process.exit(0)).catch(err => {
  console.error(err)
  process.exit(1)
})
