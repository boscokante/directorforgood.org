// Run with: node --env-file=.env.local --import tsx scripts/fix-revibes.ts
import { db } from '../db'
import { posts } from '../db/schema'
import { eq } from 'drizzle-orm'

async function main() {
  const post = await db.select().from(posts).where(eq(posts.slug, 'revibes')).limit(1).then(r => r[0])
  
  if (!post) {
    console.log('Post not found')
    return
  }

  let content = post.content || ''
  
  // Remove the broken image (404)
  content = content.replace(
    /!\[Re:Vibes\]\(https:\/\/hiiiwav\.org\/wp-content\/uploads\/2024\/02\/ReVibes\.png\)\n\n/,
    ''
  )

  await db
    .update(posts)
    .set({ content })
    .where(eq(posts.id, post.id))

  console.log('✅ Removed broken image from revibes')
  console.log('\nContent preview:')
  console.log(content.substring(0, 300))
}

main().then(() => process.exit(0)).catch(err => {
  console.error(err)
  process.exit(1)
})
