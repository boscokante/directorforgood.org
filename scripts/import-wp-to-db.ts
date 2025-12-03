/* eslint-disable @typescript-eslint/no-explicit-any */
import { config } from 'dotenv'
import { resolve } from 'path'

// Load .env.local file
config({ path: resolve(process.cwd(), '.env.local') })

import { db } from '../db'
import { posts, pages } from '../db/schema'
import TurndownService from 'turndown'

const WP_BASE = process.env.WP_BASE ?? 'https://hiiiwav.org/wp-json/wp/v2'
const td = new TurndownService({ 
  headingStyle: 'atx', 
  codeBlockStyle: 'fenced',
  emDelimiter: '*',
})

async function fetchAll(endpoint: string) {
  const items: any[] = []
  let page = 1
  
  console.log(`Fetching ${endpoint}...`)
  
  for (;;) {
    try {
      const url = `${WP_BASE}/${endpoint}?per_page=100&page=${page}`
      console.log(`  Fetching page ${page}...`)
      
      const res = await fetch(url)
      if (!res.ok) {
        console.log(`  No more pages (status ${res.status})`)
        break
      }
      
      const data = await res.json()
      if (!Array.isArray(data) || data.length === 0) {
        console.log(`  No more items`)
        break
      }
      
      items.push(...data)
      console.log(`  Got ${data.length} items`)
      page++
    } catch (error) {
      console.error(`  Error fetching page ${page}:`, error)
      break
    }
  }
  
  return items
}

function sanitizeSlug(slug: string): string {
  return slug
    .toLowerCase()
    .replace(/[^a-z0-9-]/gi, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

async function importPosts() {
  console.log('\n🔄 Importing WordPress posts...')
  const wpPosts = await fetchAll('posts')
  console.log(`📊 Found ${wpPosts.length} posts\n`)
  
  for (const p of wpPosts) {
    try {
      const content = td.turndown(p.content?.rendered ?? '')
      const excerpt = p.excerpt?.rendered ? td.turndown(p.excerpt.rendered) : ''
      const slug = sanitizeSlug(p.slug || p.title?.rendered || String(p.id))
      
      await db.insert(posts).values({
        slug,
        title: p.title?.rendered ?? 'Untitled',
        excerpt,
        content,
        coverImage: p.jetpack_featured_media_url || p.featured_media_src_url || null,
        tags: Array.isArray(p.tags) ? p.tags.map(String) : [],
        published: p.status === 'publish',
        seoTitle: p.yoast_head_json?.title || null,
        seoDescription: p.yoast_head_json?.description || null,
        canonical: p.link,
        createdAt: new Date(p.date),
        updatedAt: new Date(p.modified),
      }).onConflictDoNothing()
      
      console.log(`✓ ${slug}`)
    } catch (error) {
      console.error(`✗ Failed to import post ${p.id}:`, error)
    }
  }
  
  console.log(`\n✅ Imported ${wpPosts.length} posts`)
}

async function importPages() {
  console.log('\n🔄 Importing WordPress pages...')
  const wpPages = await fetchAll('pages')
  console.log(`📊 Found ${wpPages.length} pages\n`)
  
  for (const pg of wpPages) {
    try {
      const content = td.turndown(pg.content?.rendered ?? '')
      const slug = sanitizeSlug(pg.slug || pg.title?.rendered || String(pg.id))
      
      await db.insert(pages).values({
        slug,
        title: pg.title?.rendered ?? 'Untitled',
        content,
        seoTitle: pg.yoast_head_json?.title || null,
        seoDescription: pg.yoast_head_json?.description || null,
        canonical: pg.link,
        createdAt: new Date(pg.date),
        updatedAt: new Date(pg.modified),
      }).onConflictDoNothing()
      
      console.log(`✓ ${slug}`)
    } catch (error) {
      console.error(`✗ Failed to import page ${pg.id}:`, error)
    }
  }
  
  console.log(`\n✅ Imported ${wpPages.length} pages`)
}

async function main() {
  console.log('🚀 Starting WordPress import...\n')
  console.log(`📍 WordPress URL: ${WP_BASE}\n`)
  
  try {
    await importPosts()
    await importPages()
    
    console.log('\n🎉 Import complete!')
    process.exit(0)
  } catch (error) {
    console.error('\n❌ Import failed:', error)
    process.exit(1)
  }
}

main()

