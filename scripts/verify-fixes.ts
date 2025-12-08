// Run with: node --env-file=.env.local --import tsx scripts/verify-fixes.ts
import { db } from '../db'
import { posts } from '../db/schema'
import { eq } from 'drizzle-orm'

const POSTS_WITH_VIDEOS = ['hiiifriends', 'funding-fair']

async function main() {
  console.log('\n=== Verifying video fixes ===\n')
  
  for (const slug of POSTS_WITH_VIDEOS) {
    const post = await db.select().from(posts).where(eq(posts.slug, slug)).limit(1).then(r => r[0])
    
    if (!post) {
      console.log(`❌ ${slug}: Not found`)
      continue
    }
    
    const hasVideo = /<video[^>]*>/i.test(post.content || '')
    const videoUrl = (post.content || '').match(/src="([^"]+)"/i)?.[1]
    
    if (hasVideo && videoUrl) {
      console.log(`✅ ${slug}: Has video`)
      console.log(`   URL: ${videoUrl}`)
      console.log(`   Has autoplay: ${/autoplay/i.test(post.content || '')}`)
      console.log(`   Has muted: ${/muted/i.test(post.content || '')}`)
    } else {
      console.log(`❌ ${slug}: Missing video`)
    }
  }
}

main().then(() => process.exit(0)).catch(err => {
  console.error(err)
  process.exit(1)
})
