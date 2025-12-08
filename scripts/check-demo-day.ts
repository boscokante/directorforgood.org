// Run with: node --env-file=.env.local --import tsx scripts/check-demo-day.ts
import { resolve } from 'path'

import { db } from '../db'
import { posts } from '../db/schema'
import { eq } from 'drizzle-orm'

async function main() {
  const post = await db.select().from(posts).where(eq(posts.slug, 'demo-day')).limit(1).then(r => r[0])
  
  if (!post) {
    console.log('Post not found')
    return
  }
  
  console.log('\n=== DEMO DAY POST ===')
  console.log('Title:', post.title)
  console.log('Slug:', post.slug)
  console.log('Published:', post.published)
  console.log('Created:', post.createdAt)
  console.log('Cover Image:', post.coverImage)
  console.log('\nContent length:', post.content?.length)
  console.log('\nContent (first 1000 chars):')
  console.log(post.content?.substring(0, 1000))
  console.log('\n...')
  console.log('\nContent (last 500 chars):')
  console.log(post.content?.substring(Math.max(0, (post.content?.length || 0) - 500)))
}

main().then(() => process.exit(0)).catch(err => {
  console.error(err)
  process.exit(1)
})
