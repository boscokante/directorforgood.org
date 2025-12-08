// Run with: node --env-file=.env.local --import tsx scripts/add-youtube-embeds.ts
import { db } from '../db'
import { posts } from '../db/schema'
import { eq } from 'drizzle-orm'

// Posts with missing YouTube embeds
const YOUTUBE_EMBEDS: Record<string, string> = {
  'afrofilterism2022': 'https://youtu.be/VRP7-L5HaVM?si=eAzebCt-bdB1R9Dt',
  'revibes': 'https://www.youtube.com/embed/dURGyXLxbKc',
  'the-crowning': 'https://youtu.be/ya4z71ruJoE?si=dmhUfp-lHaL45EtO',
}

function convertToEmbedUrl(url: string): string {
  // Handle youtu.be short URLs
  if (url.includes('youtu.be/')) {
    const videoId = url.split('youtu.be/')[1].split('?')[0].split('&')[0]
    return `https://www.youtube.com/embed/${videoId}`
  }
  // Handle youtube.com/watch URLs
  if (url.includes('youtube.com/watch')) {
    const videoId = url.split('v=')[1]?.split('&')[0]
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`
    }
  }
  // Already an embed URL
  if (url.includes('youtube.com/embed')) {
    return url
  }
  // Assume it's a video ID
  if (!url.includes('http')) {
    return `https://www.youtube.com/embed/${url}`
  }
  return url
}

async function main() {
  console.log('\n=== Adding YouTube Embeds ===\n')

  for (const [slug, youtubeUrl] of Object.entries(YOUTUBE_EMBEDS)) {
    const post = await db.select().from(posts).where(eq(posts.slug, slug)).limit(1).then(r => r[0])
    
    if (!post) {
      console.log(`❌ ${slug}: Post not found`)
      continue
    }

    let content = post.content || ''
    
    // Check if YouTube already exists
    if (/youtube|youtu\.be/i.test(content) || /<iframe[^>]*youtube/i.test(content)) {
      console.log(`- ${slug}: Already has YouTube embed`)
      continue
    }

    const embedUrl = convertToEmbedUrl(youtubeUrl)
    const iframeTag = `\n\n<iframe width="560" height="315" src="${embedUrl}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>\n\n`
    
    // Add after the heading or first image
    if (content.match(/^### [^\n]+\n\n/)) {
      // After heading
      content = content.replace(/^(### [^\n]+\n\n)/, `$1${iframeTag}`)
    } else if (content.match(/!\[[^\]]+\]\([^)]+\)/)) {
      // After first image
      content = content.replace(/(!\[[^\]]+\]\([^)]+\)\n\n)/, `$1${iframeTag}`)
    } else {
      // Prepend
      content = iframeTag + content
    }

    await db
      .update(posts)
      .set({ content })
      .where(eq(posts.id, post.id))

    console.log(`✅ ${slug}: Added YouTube embed`)
    console.log(`   URL: ${embedUrl}\n`)
  }

  console.log('=== Done! ===')
}

main().then(() => process.exit(0)).catch(err => {
  console.error(err)
  process.exit(1)
})
