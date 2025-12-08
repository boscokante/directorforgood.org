// Run with: node --env-file=.env.local --import tsx scripts/add-video-to-hiiifriends.ts
import { db } from '../db'
import { posts } from '../db/schema'
import { eq } from 'drizzle-orm'

const VIDEO_URL = 'https://hiiiwav.org/wp-content/uploads/2023/12/10000000_822591176221712_4081260489693408561_n.mp4'

async function main() {
  const post = await db.select().from(posts).where(eq(posts.slug, 'hiiifriends')).limit(1).then(r => r[0])
  
  if (!post) {
    console.log('Post not found')
    return
  }
  
  console.log('Current content length:', post.content?.length)
  
  let newContent = post.content || ''
  
  // Check if video already exists
  if (newContent.includes(VIDEO_URL)) {
    // Update existing video tag to include muted
    newContent = newContent.replace(
      /<video([^>]*?)src="https:\/\/hiiiwav\.org\/wp-content\/uploads\/2023\/12\/10000000_822591176221712_4081260489693408561_n\.mp4"([^>]*?)>/g,
      (match, before, after) => {
        // Remove any existing muted attribute and add it properly
        const cleaned = (before + after).replace(/\s*muted\s*/g, '')
        return `<video${cleaned} src="${VIDEO_URL}" autoplay muted loop controls playsinline controlsList="nodownload">`
      }
    )
    // Remove duplicate video tags
    const videoMatches = newContent.match(/<video[^>]*>.*?<\/video>/g)
    if (videoMatches && videoMatches.length > 1) {
      // Keep only the first one
      const firstVideo = videoMatches[0]
      newContent = newContent.replace(/<video[^>]*>.*?<\/video>/g, '')
      const dateLinkPattern = /(\*   \[December 13, 2023\]\(https:\/\/hiiiwav\.org\/2023\/12\/13\/\)\n)/
      newContent = newContent.replace(dateLinkPattern, `$1\n\n${firstVideo}\n\n`)
    }
  } else {
    // Add video tag after the date link, before the paragraph
    const videoTag = `\n\n<video src="${VIDEO_URL}" autoplay muted loop controls playsinline controlsList="nodownload"></video>\n\n`
    
    // Find where to insert the video (after the date link line)
    const dateLinkPattern = /(\*   \[December 13, 2023\]\(https:\/\/hiiiwav\.org\/2023\/12\/13\/\)\n)/
    
    if (dateLinkPattern.test(newContent)) {
      // Insert video after the date link
      newContent = newContent.replace(dateLinkPattern, `$1${videoTag}`)
    } else {
      // If pattern not found, add video after the first heading
      newContent = newContent.replace(/(# HiiiFriends\n)/, `$1${videoTag}`)
    }
  }
  
  console.log('Updating post content...')
  await db
    .update(posts)
    .set({ content: newContent })
    .where(eq(posts.id, post.id))
  
  console.log('✅ Updated! New content length:', newContent.length)
  console.log('\nFirst 500 chars of new content:')
  console.log(newContent.substring(0, 500))
}

main().then(() => process.exit(0)).catch(err => {
  console.error(err)
  process.exit(1)
})
