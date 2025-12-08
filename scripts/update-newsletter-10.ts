import { config } from 'dotenv'
import { resolve } from 'path'
config({ path: resolve(process.cwd(), '.env.local') })

import postgres from 'postgres'
import { drizzle } from 'drizzle-orm/postgres-js'
import { eq } from 'drizzle-orm'
import * as schema from '../db/schema'

const client = postgres(process.env.DATABASE_URL!)
const db = drizzle(client, { schema })
const { newsletters } = schema

async function main() {
  console.log('Updating newsletter #10 cover image...\n')
  
  // Find the newsletter by issue number
  const [newsletter] = await db
    .select()
    .from(newsletters)
    .where(eq(newsletters.issueNumber, 10))
  
  if (!newsletter) {
    console.log('❌ Newsletter #10 not found in database')
    await client.end()
    return
  }
  
  console.log(`Found: "${newsletter.title}" (slug: ${newsletter.slug})`)
  console.log(`Current cover image: ${newsletter.coverImage || 'none'}`)
  
  // Update with Supabase URL
  const newCoverImage = 'https://pzoyeigicwgmmlngxowj.supabase.co/storage/v1/object/public/uploads/2024/09/afro-ai-mvp-group-shot-at-kapor-center.png'
  
  await db
    .update(newsletters)
    .set({ 
      coverImage: newCoverImage,
      updatedAt: new Date()
    })
    .where(eq(newsletters.issueNumber, 10))
  
  console.log(`\n✅ Updated cover image to: ${newCoverImage}`)
  
  await client.end()
}

main().catch(console.error)
