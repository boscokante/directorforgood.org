// Run with: node --env-file=.env.local --import tsx scripts/find-missing-youtube-embeds.ts
import { db } from '../db'
import { posts } from '../db/schema'
import { desc, eq } from 'drizzle-orm'

async function getWordPressYouTubeUrl(slug: string): Promise<string | null> {
  try {
    const response = await fetch(`https://hiiiwav.org/${slug}/`, {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    })
    const html = await response.text()
    
    // Look for YouTube URLs in Elementor video widgets
    const youtubeMatch = html.match(/youtube_url["']:\s*["']([^"']+)["']/i) || 
                        html.match(/youtu\.be\/([a-zA-Z0-9_-]+)/i) ||
                        html.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]+)/i) ||
                        html.match(/youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/i)
    
    if (youtubeMatch) {
      // Extract the video ID or full URL
      const url = youtubeMatch[1] || youtubeMatch[0]
      // If it's just an ID, construct the embed URL
      if (url.length < 20 && !url.includes('http')) {
        return `https://www.youtube.com/embed/${url}`
      }
      // Convert youtu.be to embed format
      if (url.includes('youtu.be/')) {
        const videoId = url.split('youtu.be/')[1].split('?')[0]
        return `https://www.youtube.com/embed/${videoId}`
      }
      // Convert watch URL to embed format
      if (url.includes('youtube.com/watch')) {
        const videoId = url.split('v=')[1]?.split('&')[0]
        if (videoId) {
          return `https://www.youtube.com/embed/${videoId}`
        }
      }
      return url.includes('http') ? url : `https://www.youtube.com/embed/${url}`
    }
    
    return null
  } catch (err) {
    console.error(`Error fetching WordPress for ${slug}:`, err)
    return null
  }
}

function hasYouTubeEmbed(content: string): boolean {
  return /youtube|youtu\.be/i.test(content) || /<iframe[^>]*youtube/i.test(content)
}

async function main() {
  const allPosts = await db
    .select()
    .from(posts)
    .orderBy(desc(posts.createdAt))

  console.log(`\n=== Checking ${allPosts.length} posts for missing YouTube embeds ===\n`)

  const missing: Array<{ slug: string; title: string; youtubeUrl: string }> = []

  for (const post of allPosts) {
    const content = post.content || ''
    const hasYouTube = hasYouTubeEmbed(content)
    
    if (!hasYouTube) {
      console.log(`Checking ${post.slug}...`)
      const youtubeUrl = await getWordPressYouTubeUrl(post.slug)
      
      if (youtubeUrl) {
        console.log(`  ✓ Found YouTube: ${youtubeUrl}`)
        missing.push({ slug: post.slug, title: post.title, youtubeUrl })
      } else {
        console.log(`  - No YouTube found`)
      }
    } else {
      console.log(`✓ ${post.slug}: Already has YouTube embed`)
    }
  }

  if (missing.length > 0) {
    console.log(`\n=== Found ${missing.length} posts with missing YouTube embeds ===\n`)
    for (const { slug, title, youtubeUrl } of missing) {
      console.log(`${slug} (${title}):`)
      console.log(`  ${youtubeUrl}\n`)
    }
  } else {
    console.log('\n✅ All posts checked!')
  }
}

main().then(() => process.exit(0)).catch(err => {
  console.error(err)
  process.exit(1)
})
