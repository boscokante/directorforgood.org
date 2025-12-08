// Run with: node --env-file=.env.local --import tsx scripts/fix-all-missing-videos.ts
import { db } from '../db'
import { posts } from '../db/schema'
import { desc, eq } from 'drizzle-orm'

async function checkWordPressForVideo(slug: string): Promise<string | null> {
  try {
    const url = `https://hiiiwav.org/blog/${slug}`
    const response = await fetch(url)
    const html = await response.text()
    
    // Look for video tags
    const videoMatch = html.match(/<video[^>]*src="([^"]+)"[^>]*>/i)
    if (videoMatch) {
      return videoMatch[1]
    }
    
    // Look for Elementor video widgets
    const elementorVideoMatch = html.match(/elementor-widget-video[^>]*>[\s\S]*?<video[^>]*src="([^"]+)"[^>]*>/i)
    if (elementorVideoMatch) {
      return elementorVideoMatch[1]
    }
    
    return null
  } catch (err) {
    console.error(`Error checking ${slug}:`, err)
    return null
  }
}

async function main() {
  const allPosts = await db
    .select()
    .from(posts)
    .orderBy(desc(posts.createdAt))

  console.log(`\n=== Checking ${allPosts.length} posts for missing videos ===\n`)

  const fixes: Array<{ slug: string; title: string; videoUrl: string }> = []

  for (const post of allPosts) {
    const content = post.content || ''
    const hasVideo = /<video[^>]*>/i.test(content)
    
    if (!hasVideo) {
      console.log(`Checking ${post.slug}...`)
      const videoUrl = await checkWordPressForVideo(post.slug)
      
      if (videoUrl) {
        console.log(`  ✓ Found video: ${videoUrl}`)
        fixes.push({ slug: post.slug, title: post.title, videoUrl })
      } else {
        console.log(`  - No video found`)
      }
    } else {
      console.log(`✓ ${post.slug}: Already has video`)
    }
  }

  if (fixes.length > 0) {
    console.log(`\n=== Found ${fixes.length} posts with missing videos ===\n`)
    
    for (const { slug, title, videoUrl } of fixes) {
      const post = await db.select().from(posts).where(eq(posts.slug, slug)).limit(1).then(r => r[0])
      if (!post) continue
      
      let content = post.content || ''
      
      // Add video tag - try to insert after heading or date
      const videoTag = `\n\n<video src="${videoUrl}" autoplay muted loop controls playsinline controlsList="nodownload"></video>\n\n`
      
      // Try to insert after date link pattern (like hiiifriends)
      const dateLinkPattern = /\*   \[([^\]]+)\]\(https:\/\/hiiiwav\.org\/[^\)]+\)\n/
      if (dateLinkPattern.test(content)) {
        content = content.replace(dateLinkPattern, `$&${videoTag}`)
      } else if (content.trim().startsWith('#')) {
        // Insert after first heading
        content = content.replace(/^(# [^\n]+\n)/, `$1${videoTag}`)
      } else {
        // Prepend if no pattern found
        content = videoTag + content
      }
      
      await db
        .update(posts)
        .set({ content })
        .where(eq(posts.id, post.id))
      
      console.log(`✅ Fixed: ${slug} (${title})`)
    }
  } else {
    console.log('\n✅ No missing videos found!')
  }
}

main().then(() => process.exit(0)).catch(err => {
  console.error(err)
  process.exit(1)
})
