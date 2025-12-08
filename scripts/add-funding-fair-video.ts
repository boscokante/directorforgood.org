// Run with: node --env-file=.env.local --import tsx scripts/add-funding-fair-video.ts
import { db } from '../db'
import { posts } from '../db/schema'
import { eq } from 'drizzle-orm'

const VIDEO_URL = 'https://hiiiwav.org/wp-content/uploads/2023/11/final.mp4'

async function main() {
  const post = await db.select().from(posts).where(eq(posts.slug, 'funding-fair')).limit(1).then(r => r[0])
  
  if (!post) {
    console.log('Post not found')
    return
  }

  let content = post.content || ''
  
  // Check if video already exists
  if (content.includes(VIDEO_URL)) {
    console.log('Video already exists in content')
    return
  }

  // Add video after the image, before the date
  const videoTag = `\n\n<video src="${VIDEO_URL}" autoplay muted loop controls playsinline controlsList="nodownload"></video>\n\n`
  
  // Insert after the image
  content = content.replace(
    /(!\[Funding Fair\]\(https:\/\/hiiiwav\.org\/wp-content\/uploads\/2023\/07\/IMG_0712-scaled\.jpg\))\n\n/,
    `$1${videoTag}`
  )

  await db
    .update(posts)
    .set({ content })
    .where(eq(posts.id, post.id))

  console.log('✅ Added video to funding-fair')
  console.log('\nContent preview:')
  console.log(content.substring(0, 400))
}

main().then(() => process.exit(0)).catch(err => {
  console.error(err)
  process.exit(1)
})
