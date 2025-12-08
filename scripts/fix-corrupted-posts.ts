// Run with: node --env-file=.env.local --import tsx scripts/fix-corrupted-posts.ts
import { db } from '../db'
import { posts } from '../db/schema'
import { eq } from 'drizzle-orm'

// Posts that need to be manually fixed due to severely corrupted content
const CORRUPTED_POSTS: Record<string, string> = {
  'afrofilterism-demo-day': `# AfroFilterism Demo Day

![Demo Day Banner](https://hiiiwav.org/wp-content/uploads/2022/11/Screen-Shot-2022-11-08-at-10.05.27-AM.png)

The amazing teams from Demo Day!

![Demo Day Photo 1](https://hiiiwav.org/wp-content/uploads/2022/11/136DemoDay102022-scaled.jpg)

![Demo Day Photo 2](https://hiiiwav.org/wp-content/uploads/2022/11/037DemoDay102022-scaled.jpg)
`,

  'demo-day': `# Demo Day

![Demo Day 2024](https://pzoyeigicwgmmlngxowj.supabase.co/storage/v1/object/public/uploads/2024/02/Demo-Day-2024-1.jpg)
`,

  'afro-ai-residency': `# AFRO AI Residency

![AFRO AI Residency](https://pzoyeigicwgmmlngxowj.supabase.co/storage/v1/object/public/uploads/2024/02/Screenshot-2024-02-22-160750.png)
`,
}

async function main() {
  console.log('\n=== Fixing corrupted posts ===\n')

  for (const [slug, newContent] of Object.entries(CORRUPTED_POSTS)) {
    const post = await db.select().from(posts).where(eq(posts.slug, slug)).limit(1).then(r => r[0])
    
    if (!post) {
      console.log(`❌ ${slug}: Post not found`)
      continue
    }

    await db
      .update(posts)
      .set({ content: newContent })
      .where(eq(posts.id, post.id))

    console.log(`✅ Fixed: ${slug}`)
  }

  console.log('\n=== Done! ===')
}

main().then(() => process.exit(0)).catch(err => {
  console.error(err)
  process.exit(1)
})
