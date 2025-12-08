// Load env FIRST
import { config } from 'dotenv'
import { resolve } from 'path'
config({ path: resolve(process.cwd(), '.env.local') })

import postgres from 'postgres'
import { drizzle } from 'drizzle-orm/postgres-js'
import { sql } from 'drizzle-orm'
import * as schema from '../db/schema'

if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL not found')
  process.exit(1)
}

console.log('✅ Environment loaded')
console.log('🔗 Connecting to database...')

// Create postgres client with shorter timeout
const client = postgres(process.env.DATABASE_URL, {
  connect_timeout: 30,
  idle_timeout: 20,
  max_lifetime: 60 * 30,
})

const db = drizzle(client, { schema })

async function main() {
  // Test connection
  console.log('   Testing connection...')
  const test = await db.execute(sql`SELECT 1 as test`)
  console.log('✅ Connected!', test)

  // Check if table exists
  console.log('📋 Checking newsletters table...')
  const tableCheck = await db.execute(sql`
    SELECT EXISTS (
      SELECT FROM information_schema.tables 
      WHERE table_name = 'newsletters'
    ) as exists
  `)
  
  const tableExists = tableCheck[0]?.exists
  console.log(`   Table exists: ${tableExists}`)
  
  if (!tableExists) {
    console.log('📋 Creating newsletters table...')
    await db.execute(sql`
      CREATE TABLE newsletters (
        id SERIAL PRIMARY KEY,
        slug TEXT NOT NULL UNIQUE,
        title TEXT NOT NULL,
        subtitle TEXT,
        excerpt TEXT,
        content TEXT NOT NULL,
        cover_image TEXT,
        issue_number INTEGER,
        published_at TIMESTAMP NOT NULL,
        published BOOLEAN DEFAULT true,
        seo_title TEXT,
        seo_description TEXT,
        created_at TIMESTAMP DEFAULT now() NOT NULL,
        updated_at TIMESTAMP DEFAULT now() NOT NULL
      )
    `)
    console.log('✅ Table created!')
  }

  // Insert newsletter
  console.log('📰 Inserting newsletter...')
  
  const newsletterData = {
    slug: 'the-winners-of-afro-ai-mvp',
    title: 'The Winners of AFRO AI MVP is...',
    subtitle: 'Announcing our top projects',
    excerpt: 'Celebrating the standout projects from our AFRO AI MVP program.',
    issueNumber: 7,
    publishedAt: new Date('2024-08-01'),
    content: `# The Winners of AFRO AI MVP is... 🏆

Dear HiiiWAV Family,

We're excited to announce the winners of our AFRO AI MVP program! After weeks of hard work, learning, and building, our cohort members presented their projects at Demo Day.

## The Winners

We were blown away by the creativity and innovation of all our participants.

### First Place 🥇
*Project details coming soon*

### Second Place 🥈
*Project details coming soon*

### Third Place 🥉
*Project details coming soon*

## Community Choice Award 🌟
Voted by attendees at Demo Day

## Congratulations to All Participants

Every member of our AFRO AI cohort should be proud. You all took on the challenge of learning new skills and building something from scratch.

Let's keep building together! 🚀

– The HiiiWAV Team`,
  }

  // Upsert
  await db.execute(sql`
    INSERT INTO newsletters (slug, title, subtitle, excerpt, content, issue_number, published_at, published)
    VALUES (
      ${newsletterData.slug},
      ${newsletterData.title},
      ${newsletterData.subtitle},
      ${newsletterData.excerpt},
      ${newsletterData.content},
      ${newsletterData.issueNumber},
      ${newsletterData.publishedAt},
      true
    )
    ON CONFLICT (slug) DO UPDATE SET
      title = EXCLUDED.title,
      content = EXCLUDED.content,
      updated_at = now()
  `)
  console.log('✅ Newsletter inserted!')

  // Verify
  const result = await db.execute(sql`SELECT id, slug, title FROM newsletters`)
  console.log(`\n📊 Newsletters: ${result.length}`)
  for (const n of result) {
    console.log(`   - ${n.title}`)
  }

  await client.end()
}

main()
  .then(() => {
    console.log('\n✨ Done!')
    process.exit(0)
  })
  .catch((err) => {
    console.error('❌ Error:', err)
    process.exit(1)
  })
