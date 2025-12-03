import { config } from 'dotenv'
import { resolve } from 'path'
config({ path: resolve(process.cwd(), '.env.local') })

import { db } from '../db'
import { pages } from '../db/schema'

async function main() {
  const allPages = await db.select({ slug: pages.slug, title: pages.title }).from(pages)
  console.log('All pages in DB:')
  allPages.forEach(p => console.log(`- /${p.slug}: ${p.title}`))
}

main().then(() => process.exit(0))
