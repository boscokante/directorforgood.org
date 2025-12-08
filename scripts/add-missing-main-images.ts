// Run with: node --env-file=.env.local --import tsx scripts/add-missing-main-images.ts
import { db } from '../db'
import { posts } from '../db/schema'
import { eq } from 'drizzle-orm'

const MISSING_IMAGES: Record<string, string> = {
  'hiiitop-fundraiser': 'https://hiiiwav.org/wp-content/uploads/2023/07/038HiWav2023-1-scaled.jpg',
  'vc-on-7th-street': 'https://hiiiwav.org/wp-content/uploads/2023/07/Screenshot-2023-07-11-at-6.31.20-AM.png',
  'funding-fair': 'https://hiiiwav.org/wp-content/uploads/2023/07/IMG_0712-scaled.jpg',
}

async function main() {
  console.log('\n=== Adding missing main images ===\n')

  for (const [slug, imageUrl] of Object.entries(MISSING_IMAGES)) {
    const post = await db.select().from(posts).where(eq(posts.slug, slug)).limit(1).then(r => r[0])
    
    if (!post) {
      console.log(`❌ ${slug}: Not found`)
      continue
    }

    let content = post.content || ''
    
    // Check if image already exists
    if (content.includes(imageUrl)) {
      console.log(`- ${slug}: Image already present`)
      continue
    }

    // Add image after the first heading
    const headingMatch = content.match(/^(#[^\n]+\n)/)
    if (headingMatch) {
      content = content.replace(
        headingMatch[0],
        `${headingMatch[0]}\n![${post.title}](${imageUrl})\n\n`
      )
    } else {
      // Prepend if no heading
      content = `![${post.title}](${imageUrl})\n\n${content}`
    }

    await db
      .update(posts)
      .set({ content })
      .where(eq(posts.id, post.id))

    console.log(`✅ Added image to: ${slug}`)
  }

  console.log('\n=== Done! ===')
}

main().then(() => process.exit(0)).catch(err => {
  console.error(err)
  process.exit(1)
})
