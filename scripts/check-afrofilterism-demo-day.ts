// Run with: node --env-file=.env.local --import tsx scripts/check-afrofilterism-demo-day.ts
import { db } from '../db'
import { posts } from '../db/schema'
import { eq } from 'drizzle-orm'

async function main() {
  const post = await db.select().from(posts).where(eq(posts.slug, 'afrofilterism-demo-day')).limit(1).then(r => r[0])
  
  if (!post) {
    console.log('Post not found')
    return
  }
  
  console.log('\n=== AFROFILTERISM DEMO DAY ===')
  console.log('Title:', post.title)
  console.log('Cover Image:', post.coverImage)
  console.log('\nFull Content:')
  console.log(post.content)
}

main().then(() => process.exit(0)).catch(err => {
  console.error(err)
  process.exit(1)
})
