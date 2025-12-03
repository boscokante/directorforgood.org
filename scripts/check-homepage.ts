import { config } from 'dotenv'
import { resolve } from 'path'
config({ path: resolve(process.cwd(), '.env.local') })

import { db } from '../db'
import { pages } from '../db/schema'
import { eq } from 'drizzle-orm'

async function main() {
  // Check for home page
  const homePage = await db.select().from(pages).where(eq(pages.slug, 'home')).limit(1).then(r => r[0])
  
  if (homePage) {
    console.log('=== HOME PAGE FOUND ===')
    console.log('Title:', homePage.title)
    console.log('Slug:', homePage.slug)
    console.log('Content preview (first 2000 chars):\n')
    console.log(homePage.content?.substring(0, 2000))
  } else {
    console.log('No home page found with slug "home"')
    
    // List all pages
    const allPages = await db.select({ slug: pages.slug, title: pages.title }).from(pages)
    console.log('\nAll available pages:')
    allPages.forEach(p => console.log(`- ${p.slug}: ${p.title}`))
  }
}

main().then(() => process.exit(0))
