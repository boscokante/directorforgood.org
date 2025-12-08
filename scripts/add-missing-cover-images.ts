// Run with: node --env-file=.env.local --import tsx scripts/add-missing-cover-images.ts
import { db } from '../db'
import { posts } from '../db/schema'
import { eq } from 'drizzle-orm'

// Posts missing their main cover image
const MISSING_COVERS: Record<string, string> = {
  'hiiifriends': 'https://hiiiwav.org/wp-content/uploads/2023/12/HiiiFRIENDS.png',
  'afro-ai-demo-day-2023': 'https://hiiiwav.org/wp-content/uploads/2024/03/AFRO-AI-MVP-ORIENTATION-2000-x-768-px.jpeg',
  'afro-ai-is-transforming-local-artists-to-tech-founders': 'https://hiiiwav.org/wp-content/uploads/2023/11/055HiiiWAV0923-1-scaled-e1699326367848.jpg',
  'art-official': 'https://hiiiwav.org/wp-content/uploads/2023/07/073BoskoBday0723-scaled.jpg',
  'founders-dinner': 'https://hiiiwav.org/wp-content/uploads/2023/01/016HiiWav0423-scaled.jpg',
  'bosko-bday-versus-battle': 'https://hiiiwav.org/wp-content/uploads/2023/08/IMG_9033-scaled-e1691614607561.jpg',
  'the-crowning': 'https://hiiiwav.org/wp-content/uploads/2023/08/C4BB5654-D1E9-41DE-92AB-7308961C319B-scaled.jpeg',
}

async function main() {
  console.log('\n=== Adding Missing Cover Images ===\n')

  for (const [slug, coverImage] of Object.entries(MISSING_COVERS)) {
    const post = await db.select().from(posts).where(eq(posts.slug, slug)).limit(1).then(r => r[0])
    
    if (!post) {
      console.log(`❌ ${slug}: Post not found`)
      continue
    }

    if (post.coverImage) {
      console.log(`- ${slug}: Already has cover image`)
      continue
    }

    await db
      .update(posts)
      .set({ coverImage })
      .where(eq(posts.id, post.id))

    console.log(`✅ ${slug}: Added cover image`)
  }

  console.log('\n=== Done! ===')
}

main().then(() => process.exit(0)).catch(err => {
  console.error(err)
  process.exit(1)
})
