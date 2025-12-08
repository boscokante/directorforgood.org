// Run with: node --env-file=.env.local --import tsx scripts/fix-hiiifriends-video.ts
import { db } from '../db'
import { posts } from '../db/schema'
import { eq } from 'drizzle-orm'

const VIDEO_URL = 'https://hiiiwav.org/wp-content/uploads/2023/12/10000000_822591176221712_4081260489693408561_n.mp4'
const VIDEO_TAG = `<video src="${VIDEO_URL}" autoplay muted loop controls playsinline controlsList="nodownload"></video>`

async function main() {
  const post = await db.select().from(posts).where(eq(posts.slug, 'hiiifriends')).limit(1).then(r => r[0])
  
  if (!post) {
    console.log('Post not found')
    return
  }
  
  let content = post.content || ''
  
  // Remove all existing video tags
  content = content.replace(/<video[^>]*>.*?<\/video>/gis, '')
  
  // Clean up extra blank lines
  content = content.replace(/\n{3,}/g, '\n\n')
  
  // Insert video after the date link
  const dateLinkPattern = /(\*   \[December 13, 2023\]\(https:\/\/hiiiwav\.org\/2023\/12\/13\/\)\n)/
  if (dateLinkPattern.test(content)) {
    content = content.replace(dateLinkPattern, `$1\n${VIDEO_TAG}\n\n`)
  } else {
    // Fallback: add after heading
    content = content.replace(/(# HiiiFriends\n)/, `$1\n${VIDEO_TAG}\n\n`)
  }
  
  console.log('Updating post content...')
  await db
    .update(posts)
    .set({ content })
    .where(eq(posts.id, post.id))
  
  console.log('✅ Updated!')
  console.log('\nContent preview:')
  console.log(content.substring(0, 400))
}

main().then(() => process.exit(0)).catch(err => {
  console.error(err)
  process.exit(1)
})
