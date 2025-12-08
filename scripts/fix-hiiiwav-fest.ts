// Run with: node --env-file=.env.local --import tsx scripts/fix-hiiiwav-fest.ts
import { db } from '../db'
import { posts } from '../db/schema'
import { eq } from 'drizzle-orm'

async function main() {
  const post = await db.select().from(posts).where(eq(posts.slug, 'hiiiwav-fest')).limit(1).then(r => r[0])
  
  if (!post) {
    console.log('Post not found')
    return
  }

  let content = post.content || ''
  
  // Replace the malformed `!` with the proper image
  content = content.replace(
    /^# HiiiWAV FEST\n\n!\n\n/,
    `# HiiiWAV FEST

![HiiiWAV FEST](https://hiiiwav.org/wp-content/uploads/2024/02/HiiiWAV-Fest.png)

`
  )

  await db
    .update(posts)
    .set({ content })
    .where(eq(posts.id, post.id))

  console.log('✅ Fixed hiiiwav-fest')
  console.log('\nContent preview:')
  console.log(content.substring(0, 300))
}

main().then(() => process.exit(0)).catch(err => {
  console.error(err)
  process.exit(1)
})
