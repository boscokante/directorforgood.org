import { config } from 'dotenv'
import { resolve } from 'path'
config({ path: resolve(process.cwd(), '.env.local') })

import { db } from '../db'
import { posts, pages } from '../db/schema'
import { desc } from 'drizzle-orm'

async function main() {
  const allPosts = await db.select().from(posts).orderBy(desc(posts.createdAt))
  const allPages = await db.select().from(pages).orderBy(desc(pages.createdAt))

  console.log('=== POSTS (' + allPosts.length + ') ===')
  allPosts.forEach(p => 
    console.log('  - ' + p.slug + (p.coverImage ? ' [has image]' : ' [NO IMAGE]'))
  )

  console.log('\n=== PAGES (' + allPages.length + ') ===')
  allPages.forEach(p => console.log('  - ' + p.slug))

  process.exit(0)
}

main()

