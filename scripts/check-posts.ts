import { config } from 'dotenv'
import { resolve } from 'path'
config({ path: resolve(process.cwd(), '.env.local') })

import { db } from '../db'
import { posts } from '../db/schema'
import { desc } from 'drizzle-orm'

async function main() {
  const allPosts = await db.select().from(posts).orderBy(desc(posts.createdAt)).limit(3)
  
  for (const post of allPosts) {
    console.log('\n=== POST:', post.title, '===')
    console.log('Slug:', post.slug)
    console.log('Cover Image:', post.coverImage)
    console.log('Content preview:', post.content?.substring(0, 500))
    console.log('---')
  }
}

main().then(() => process.exit(0))
