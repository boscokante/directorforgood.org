// Run with: node --env-file=.env.local --import tsx scripts/fix-art-official-title.ts
import { db } from '../db'
import { posts } from '../db/schema'
import { eq } from 'drizzle-orm'

async function main() {
  const post = await db.select().from(posts).where(eq(posts.slug, 'art-official')).limit(1).then(r => r[0])
  
  if (!post) {
    console.log('Post not found')
    return
  }

  console.log('Current title:', post.title)
  
  // Decode HTML entities
  // &#038; = &
  // &#8217; = '
  const fixedTitle = post.title
    .replace(/&#038;/g, '&')
    .replace(/&#8217;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')

  console.log('Fixed title:', fixedTitle)

  await db
    .update(posts)
    .set({ title: fixedTitle })
    .where(eq(posts.id, post.id))

  console.log('✅ Title fixed!')
}

main().then(() => process.exit(0)).catch(err => {
  console.error(err)
  process.exit(1)
})
