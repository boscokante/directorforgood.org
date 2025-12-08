// Run with: node --env-file=.env.local --import tsx scripts/delete-post.ts
import { db } from '../db'
import { posts } from '../db/schema'
import { eq } from 'drizzle-orm'

async function main() {
  // Search for the post first
  const all = await db.select({ slug: posts.slug, title: posts.title }).from(posts)
  const match = all.find(p => p.title?.toLowerCase().includes('useful links'))
  
  if (!match) {
    console.log('No post found with "useful links" in title')
    console.log('All posts:', all.map(p => p.title).slice(0, 10))
    return
  }
  
  console.log(`Found post: "${match.title}" with slug: ${match.slug}`)
  
  const result = await db.delete(posts).where(eq(posts.slug, match.slug))
  console.log(`✅ Deleted post: ${match.slug}`)
}

main().then(() => process.exit(0)).catch(err => {
  console.error(err)
  process.exit(1)
})
