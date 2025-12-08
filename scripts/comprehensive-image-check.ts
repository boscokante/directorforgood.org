// Run with: node --env-file=.env.local --import tsx scripts/comprehensive-image-check.ts
import { db } from '../db'
import { posts } from '../db/schema'
import { desc, eq } from 'drizzle-orm'

async function getWordPressImages(slug: string): Promise<string[]> {
  try {
    const response = await fetch(`https://hiiiwav.org/${slug}/`, {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    })
    const html = await response.text()
    
    // Extract image URLs, excluding thumbnails and resized versions
    const matches = html.match(/https:\/\/hiiiwav\.org\/wp-content\/uploads\/[^"'\s]+\.(jpg|jpeg|png|gif|webp)/gi) || []
    const uniqueImages = [...new Set(matches)]
      .filter(url => {
        // Exclude thumbnails and resized versions
        if (url.match(/-\d+x\d+\.(jpg|jpeg|png|gif|webp)/i)) return false
        // Exclude very small images
        if (url.includes('-100x100')) return false
        // Exclude elementor thumbs
        if (url.includes('/elementor/thumbs/')) return false
        return true
      })
      .slice(0, 10) // Limit to first 10 main images
    
    return uniqueImages
  } catch (err) {
    console.error(`Error fetching WordPress for ${slug}:`, err)
    return []
  }
}

function extractImageUrls(content: string): string[] {
  // Extract from markdown images: ![alt](url)
  const markdownImages = (content.match(/!\[[^\]]*\]\(([^)]+)\)/g) || [])
    .map(match => match.match(/\(([^)]+)\)/)?.[1])
    .filter(Boolean) as string[]
  
  // Extract from HTML img tags: <img src="url">
  const htmlImages = (content.match(/<img[^>]+src="([^"]+)"/gi) || [])
    .map(match => match.match(/src="([^"]+)"/i)?.[1])
    .filter(Boolean) as string[]
  
  // Extract from video tags: <video src="url">
  const videoImages = (content.match(/<video[^>]+src="([^"]+)"/gi) || [])
    .map(match => match.match(/src="([^"]+)"/i)?.[1])
    .filter(Boolean) as string[]
  
  return [...new Set([...markdownImages, ...htmlImages, ...videoImages])]
}

async function main() {
  const allPosts = await db
    .select()
    .from(posts)
    .orderBy(desc(posts.createdAt))

  console.log(`\n=== Comprehensive Image Check for ${allPosts.length} Posts ===\n`)

  const issues: Array<{
    slug: string
    title: string
    issue: string
    dbImages: string[]
    wpImages: string[]
    missingImages: string[]
  }> = []

  for (const post of allPosts) {
    const content = post.content || ''
    const dbImages = extractImageUrls(content)
    const wpImages = await getWordPressImages(post.slug)
    
    // Check if post has any images
    const hasImages = dbImages.length > 0 || post.coverImage
    
    // Check if WordPress has images but DB doesn't
    const missingFromDb = wpImages.filter(wpImg => {
      // Check if any DB image matches (could be Supabase URL vs WordPress URL)
      return !dbImages.some(dbImg => {
        // Extract filename from URLs for comparison
        const wpFilename = wpImg.split('/').pop()?.split('?')[0] || ''
        const dbFilename = dbImg.split('/').pop()?.split('?')[0] || ''
        return wpFilename === dbFilename || dbImg.includes(wpFilename) || wpImg.includes(dbFilename)
      })
    })

    let issueDesc: string[] = []
    
    if (!hasImages && wpImages.length > 0) {
      issueDesc.push(`No images in DB (WordPress has ${wpImages.length})`)
    } else if (missingFromDb.length > 0) {
      issueDesc.push(`${missingFromDb.length} image(s) missing from DB`)
    } else if (!hasImages && wpImages.length === 0) {
      // No images on either - might be intentional
      console.log(`✓ ${post.slug}: No images (likely intentional)`)
      continue
    }

    if (issueDesc.length > 0) {
      issues.push({
        slug: post.slug,
        title: post.title,
        issue: issueDesc.join('; '),
        dbImages,
        wpImages,
        missingImages: missingFromDb
      })
      console.log(`❌ ${post.slug}: ${issueDesc.join('; ')}`)
    } else {
      console.log(`✓ ${post.slug}: OK (${dbImages.length} image(s))`)
    }
  }

  console.log(`\n=== Summary ===`)
  console.log(`Total posts: ${allPosts.length}`)
  console.log(`Posts with issues: ${issues.length}`)
  
  if (issues.length > 0) {
    console.log(`\n=== Detailed Issues ===\n`)
    for (const issue of issues) {
      console.log(`${issue.slug} (${issue.title}):`)
      console.log(`  Issue: ${issue.issue}`)
      if (issue.dbImages.length > 0) {
        console.log(`  DB Images (${issue.dbImages.length}):`)
        issue.dbImages.slice(0, 3).forEach(img => console.log(`    - ${img.substring(0, 80)}...`))
      }
      if (issue.missingImages.length > 0) {
        console.log(`  Missing Images (${issue.missingImages.length}):`)
        issue.missingImages.slice(0, 5).forEach(img => console.log(`    - ${img}`))
      }
      console.log('')
    }
  } else {
    console.log('\n✅ All posts have images!')
  }
}

main().then(() => process.exit(0)).catch(err => {
  console.error(err)
  process.exit(1)
})
