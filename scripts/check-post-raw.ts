// Run with: node --env-file=.env.local --import tsx scripts/check-post-raw.ts <slug>
import { db } from '../db'
import { posts } from '../db/schema'
import { eq } from 'drizzle-orm'

async function main() {
  const slug = process.argv[2] || 'afro-ai-kickoff'
  const post = await db.select().from(posts).where(eq(posts.slug, slug)).limit(1).then(r => r[0])
  
  if (!post) {
    console.log('Post not found')
    return
  }
  
  console.log('\n=== RAW CONTENT ===')
  console.log(JSON.stringify(post.content, null, 2))
  console.log('\n=== END ===')
}

main().then(() => process.exit(0)).catch(err => {
  console.error(err)
  process.exit(1)
})
