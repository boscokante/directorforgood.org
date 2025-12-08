// Run with: node --env-file=.env.local --import tsx scripts/check-posts-content.ts
import { db } from '../db'
import { posts } from '../db/schema'
import { eq, inArray } from 'drizzle-orm'

const POSTS_TO_CHECK = [
  'demo-day',
  'afro-ai-residency',
  'live-from-new-orleans-the-jazz-foundation-of-america-presents-donald-harrison'
]

async function main() {
  for (const slug of POSTS_TO_CHECK) {
    const post = await db.select().from(posts).where(eq(posts.slug, slug)).limit(1).then(r => r[0])
    
    if (!post) {
      console.log(`\n❌ ${slug}: Not found`)
      continue
    }
    
    console.log(`\n=== ${post.title} (${slug}) ===`)
    console.log(`Content length: ${post.content?.length || 0} chars`)
    console.log(`Content preview:`)
    console.log(post.content?.substring(0, 300) || '(empty)')
    console.log(`\nWordPress URL: https://hiiiwav.org/blog/${slug}`)
  }
}

main().then(() => process.exit(0)).catch(err => {
  console.error(err)
  process.exit(1)
})
