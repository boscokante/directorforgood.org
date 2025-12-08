/**
 * Migrate WordPress images to Supabase Storage
 * 
 * Prerequisites:
 * 1. Create a public bucket named "uploads" in Supabase Storage
 * 2. Add NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY to .env.local
 * 
 * Usage: npx tsx scripts/migrate-images-to-supabase.ts
 */

// Load env FIRST before any other imports
import { config } from 'dotenv'
import { resolve } from 'path'
config({ path: resolve(process.cwd(), '.env.local') })

// Now import everything else
import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'
import * as path from 'path'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
const WP_UPLOADS_PATH = '/Users/boskombp16/Local Sites/hiiiwav-wordpress-local/app/public/wp-content/uploads'
const BUCKET_NAME = 'uploads'

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('❌ Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local')
  console.log('\nThe service role key is needed to bypass RLS for uploads.')
  console.log('Get it from: https://supabase.com/dashboard/project/pzoyeigicwgmmlngxowj/settings/api')
  process.exit(1)
}

// Use service role key to bypass RLS
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
  auth: { persistSession: false }
})

// Dynamically import db after env is loaded
let db: Awaited<typeof import('../db')>['db']
let posts: typeof import('../db/schema')['posts']
let pages: typeof import('../db/schema')['pages']
let eq: typeof import('drizzle-orm')['eq']

async function extractImageUrls(): Promise<Set<string>> {
  const allPosts = await db.select().from(posts)
  const allPages = await db.select().from(pages)
  
  const urls = new Set<string>()
  
  ;[...allPosts, ...allPages].forEach(item => {
    // Cover images
    if ('coverImage' in item && item.coverImage?.includes('hiiiwav.org/wp-content/uploads')) {
      urls.add(item.coverImage)
    }
    
    // Images in content
    const imgRegex = /https?:\/\/hiiiwav\.org\/wp-content\/uploads\/[^\s\)\"\']+/g
    const matches = item.content.match(imgRegex) || []
    matches.forEach(m => urls.add(m.replace(/[)\]"']$/, ''))) // Clean trailing chars
  })
  
  return urls
}

async function uploadImage(wpUrl: string): Promise<string | null> {
  const relativePath = wpUrl.replace('https://hiiiwav.org/wp-content/uploads/', '')
  const localPath = path.join(WP_UPLOADS_PATH, relativePath)
  
  // Check if file exists locally
  if (!fs.existsSync(localPath)) {
    console.log(`  ⚠️  Not found locally: ${relativePath}`)
    return null
  }
  
  // Read file
  const fileBuffer = fs.readFileSync(localPath)
  const mimeType = getMimeType(localPath)
  
  // Upload to Supabase
  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(relativePath, fileBuffer, {
      contentType: mimeType,
      upsert: true
    })
  
  if (error) {
    console.log(`  ❌ Upload failed: ${relativePath} - ${error.message}`)
    return null
  }
  
  // Return public URL
  const { data: urlData } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(relativePath)
  
  return urlData.publicUrl
}

function getMimeType(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase()
  const mimeTypes: Record<string, string> = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml',
  }
  return mimeTypes[ext] || 'application/octet-stream'
}

async function updateDatabaseUrls(urlMap: Map<string, string>) {
  console.log('\n📝 Updating database URLs...')
  
  // Update posts
  const allPosts = await db.select().from(posts)
  for (const post of allPosts) {
    let updated = false
    let newContent = post.content
    let newCoverImage = post.coverImage
    
    // Update cover image
    if (post.coverImage && urlMap.has(post.coverImage)) {
      newCoverImage = urlMap.get(post.coverImage)!
      updated = true
    }
    
    // Update content
    for (const [oldUrl, newUrl] of urlMap) {
      if (newContent.includes(oldUrl)) {
        newContent = newContent.split(oldUrl).join(newUrl)
        updated = true
      }
    }
    
    if (updated) {
      await db.update(posts)
        .set({ content: newContent, coverImage: newCoverImage })
        .where(eq(posts.id, post.id))
      console.log(`  ✓ Updated post: ${post.slug}`)
    }
  }
  
  // Update pages
  const allPages = await db.select().from(pages)
  for (const page of allPages) {
    let updated = false
    let newContent = page.content
    
    for (const [oldUrl, newUrl] of urlMap) {
      if (newContent.includes(oldUrl)) {
        newContent = newContent.split(oldUrl).join(newUrl)
        updated = true
      }
    }
    
    if (updated) {
      await db.update(pages)
        .set({ content: newContent })
        .where(eq(pages.id, page.id))
      console.log(`  ✓ Updated page: ${page.slug}`)
    }
  }
}

async function main() {
  console.log('🚀 Starting image migration to Supabase Storage\n')
  
  // Dynamically import db modules after env is loaded
  const dbModule = await import('../db')
  const schemaModule = await import('../db/schema')
  const drizzleModule = await import('drizzle-orm')
  db = dbModule.db
  posts = schemaModule.posts
  pages = schemaModule.pages
  eq = drizzleModule.eq
  
  console.log(`📁 Local WordPress uploads: ${WP_UPLOADS_PATH}`)
  console.log(`☁️  Supabase URL: ${SUPABASE_URL}`)
  console.log(`🪣 Bucket: ${BUCKET_NAME}\n`)
  
  // Extract all image URLs from database
  console.log('🔍 Extracting image URLs from database...')
  const wpUrls = await extractImageUrls()
  console.log(`   Found ${wpUrls.size} unique images\n`)
  
  // Upload each image and build URL map
  console.log('📤 Uploading images to Supabase...')
  const urlMap = new Map<string, string>()
  let uploaded = 0
  let failed = 0
  
  for (const wpUrl of wpUrls) {
    const newUrl = await uploadImage(wpUrl)
    if (newUrl) {
      urlMap.set(wpUrl, newUrl)
      uploaded++
      console.log(`  ✓ [${uploaded}/${wpUrls.size}] ${path.basename(wpUrl)}`)
    } else {
      failed++
    }
  }
  
  console.log(`\n✅ Uploaded: ${uploaded}`)
  console.log(`❌ Failed: ${failed}`)
  
  // Update database with new URLs
  if (urlMap.size > 0) {
    await updateDatabaseUrls(urlMap)
  }
  
  console.log('\n🎉 Migration complete!')
  process.exit(0)
}

main().catch(err => {
  console.error('❌ Migration failed:', err)
  process.exit(1)
})

