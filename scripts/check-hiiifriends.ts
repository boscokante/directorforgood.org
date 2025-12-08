// Run with: node --env-file=.env.local --import tsx scripts/check-hiiifriends.ts
import { resolve } from 'path'

import { db } from '../db'
import { posts } from '../db/schema'
import { eq } from 'drizzle-orm'

async function main() {
  const post = await db.select().from(posts).where(eq(posts.slug, 'hiiifriends')).limit(1).then(r => r[0])
  
  if (!post) {
    console.log('Post not found')
    return
  }
  
  console.log('\n=== HIIIFRIENDS POST ===')
  console.log('Title:', post.title)
  console.log('Slug:', post.slug)
  console.log('Published:', post.published)
  console.log('Created:', post.createdAt)
  console.log('Cover Image:', post.coverImage)
  console.log('\nFull Content:')
  console.log(post.content)
  console.log('\n---')
  console.log('Looking for video tags...')
  const videoMatches = post.content?.match(/<video[^>]*>.*?<\/video>/gis) || []
  const iframeMatches = post.content?.match(/<iframe[^>]*>.*?<\/iframe>/gis) || []
  const videoUrls = post.content?.match(/https?:\/\/[^\s<>"]+\.(mp4|webm|mov|avi)/gi) || []
  
  console.log('Video tags found:', videoMatches.length)
  console.log('Iframe tags found:', iframeMatches.length)
  console.log('Video URLs found:', videoUrls.length)
  
  if (videoMatches.length > 0) {
    console.log('\nVideo tags:')
    videoMatches.forEach((v, i) => console.log(`${i + 1}:`, v.substring(0, 200)))
  }
  if (iframeMatches.length > 0) {
    console.log('\nIframe tags:')
    iframeMatches.forEach((v, i) => console.log(`${i + 1}:`, v.substring(0, 200)))
  }
  if (videoUrls.length > 0) {
    console.log('\nVideo URLs:')
    videoUrls.forEach((v, i) => console.log(`${i + 1}:`, v))
  }
}

main().then(() => process.exit(0)).catch(err => {
  console.error(err)
  process.exit(1)
})
