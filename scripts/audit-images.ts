// Run with: node --env-file=.env.local --import tsx scripts/audit-images.ts
import { db } from '../db'
import { posts } from '../db/schema'
import { desc, eq } from 'drizzle-orm'

async function checkImageUrl(url: string): Promise<boolean> {
  try {
    const response = await fetch(url, { method: 'HEAD' })
    return response.ok
  } catch {
    return false
  }
}

async function getWordPressImages(slug: string): Promise<string[]> {
  try {
    const response = await fetch(`https://hiiiwav.org/${slug}/`)
    const html = await response.text()
    const matches = html.match(/https:\/\/hiiiwav\.org\/wp-content\/uploads\/[^"'\s]+\.(jpg|jpeg|png|gif|webp)/gi) || []
    return [...new Set(matches)].filter(url => !url.includes('-300x') && !url.includes('-600x') && !url.includes('-768x') && !url.includes('-1024x'))
  } catch {
    return []
  }
}

async function main() {
  const allPosts = await db
    .select()
    .from(posts)
    .orderBy(desc(posts.createdAt))

  console.log(`\n=== Auditing ${allPosts.length} posts for image issues ===\n`)

  const issues: Array<{ slug: string; title: string; issue: string; wpImages?: string[] }> = []

  for (const post of allPosts) {
    const content = post.content || ''
    
    // Check for malformed image links (link syntax instead of image syntax)
    const malformedImages = content.match(/\[[^\]]*\]\((https:\/\/[^)]+\.(jpg|jpeg|png|gif|webp))\)/gi) || []
    const properImages = content.match(/!\[[^\]]*\]\([^)]+\)/gi) || []
    
    // Check for broken Supabase image URLs
    const supabaseUrls = content.match(/https:\/\/pzoyeigicwgmmlngxowj\.supabase\.co[^)\s"]+/gi) || []
    
    // Check if content is very short (might be missing images)
    const isShort = content.length < 300
    
    let hasIssue = false
    let issueDesc = []
    
    if (malformedImages.length > 0) {
      hasIssue = true
      issueDesc.push(`${malformedImages.length} malformed image link(s)`)
    }
    
    if (isShort && properImages.length === 0 && !content.includes('<video')) {
      hasIssue = true
      issueDesc.push('Very short content, might be missing images')
    }
    
    if (hasIssue) {
      const wpImages = await getWordPressImages(post.slug)
      issues.push({
        slug: post.slug,
        title: post.title,
        issue: issueDesc.join('; '),
        wpImages: wpImages.slice(0, 5)
      })
      console.log(`❌ ${post.slug}: ${issueDesc.join('; ')}`)
      if (wpImages.length > 0) {
        console.log(`   WordPress has ${wpImages.length} images`)
      }
    } else {
      console.log(`✓ ${post.slug}: OK (${properImages.length} images)`)
    }
  }

  console.log(`\n=== Summary ===`)
  console.log(`Total posts: ${allPosts.length}`)
  console.log(`Posts with issues: ${issues.length}`)
  
  if (issues.length > 0) {
    console.log(`\n=== Posts needing fixes ===`)
    for (const issue of issues) {
      console.log(`\n${issue.slug} (${issue.title}):`)
      console.log(`  Issue: ${issue.issue}`)
      if (issue.wpImages && issue.wpImages.length > 0) {
        console.log(`  WordPress images:`)
        issue.wpImages.forEach(url => console.log(`    - ${url}`))
      }
    }
  }
}

main().then(() => process.exit(0)).catch(err => {
  console.error(err)
  process.exit(1)
})
