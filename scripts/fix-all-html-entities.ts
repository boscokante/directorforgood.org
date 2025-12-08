// Run with: node --env-file=.env.local --import tsx scripts/fix-all-html-entities.ts
import { db } from '../db'
import { posts } from '../db/schema'
import { desc, eq } from 'drizzle-orm'

function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&#038;/g, '&')
    .replace(/&#8217;/g, "'")
    .replace(/&#8211;/g, '–')
    .replace(/&#8212;/g, '—')
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#8216;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
}

async function main() {
  const allPosts = await db
    .select()
    .from(posts)
    .orderBy(desc(posts.createdAt))

  console.log(`\n=== Fixing HTML entities in ${allPosts.length} post titles ===\n`)

  let fixedCount = 0

  for (const post of allPosts) {
    const fixedTitle = decodeHtmlEntities(post.title)
    
    if (fixedTitle !== post.title) {
      await db
        .update(posts)
        .set({ title: fixedTitle })
        .where(eq(posts.id, post.id))

      console.log(`✅ Fixed: ${post.slug}`)
      console.log(`   Before: ${post.title}`)
      console.log(`   After:  ${fixedTitle}\n`)
      fixedCount++
    }
  }

  console.log(`=== Done! Fixed ${fixedCount} posts ===`)
}

main().then(() => process.exit(0)).catch(err => {
  console.error(err)
  process.exit(1)
})
