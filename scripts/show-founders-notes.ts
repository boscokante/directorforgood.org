/**
 * Show Founder's Notes Report
 * 
 * Displays all newsletters with their founder's notes content
 * to help identify missing or incorrect migrations.
 */

import { config } from 'dotenv'
import { resolve } from 'path'
config({ path: resolve(process.cwd(), '.env.local') })

import postgres from 'postgres'
import { drizzle } from 'drizzle-orm/postgres-js'
import { desc } from 'drizzle-orm'
import * as schema from '../db/schema'

const client = postgres(process.env.DATABASE_URL!)
const db = drizzle(client, { schema })

async function main() {
  const all = await db.select({
    issueNumber: schema.newsletters.issueNumber,
    title: schema.newsletters.title,
    slug: schema.newsletters.slug,
    publishedAt: schema.newsletters.publishedAt,
    foundersNote: schema.newsletters.foundersNote
  }).from(schema.newsletters).orderBy(desc(schema.newsletters.issueNumber))

  console.log('=' .repeat(80))
  console.log('FOUNDER\'S NOTES REPORT')
  console.log('=' .repeat(80))
  console.log()

  let withNotes = 0
  let withoutNotes = 0

  for (const n of all) {
    const date = n.publishedAt.toISOString().split('T')[0]
    const hasNote = !!n.foundersNote
    
    console.log('-'.repeat(80))
    console.log(`ISSUE #${n.issueNumber}: ${n.title}`)
    console.log(`Date: ${date} | Slug: ${n.slug}`)
    console.log(`Status: ${hasNote ? '✅ HAS FOUNDER\'S NOTE' : '❌ NO FOUNDER\'S NOTE'}`)
    console.log('-'.repeat(80))
    
    if (n.foundersNote) {
      withNotes++
      console.log()
      console.log(n.foundersNote)
      console.log()
    } else {
      withoutNotes++
      console.log()
      console.log('(No founder\'s note in database)')
      console.log()
    }
    
    console.log()
  }

  console.log('=' .repeat(80))
  console.log('SUMMARY')
  console.log('=' .repeat(80))
  console.log(`Total newsletters: ${all.length}`)
  console.log(`With founder's notes: ${withNotes}`)
  console.log(`Without founder's notes: ${withoutNotes}`)
  console.log()
  
  console.log('WordPress URLs for manual checking:')
  console.log('-'.repeat(40))
  
  const wpUrls: Record<number, string> = {
    11: 'https://hiiiwav.org/hiiiwav-2024/',  // Check if this has a different founder's note
    10: 'https://hiiiwav.org/hiiiwav-2024/',
    9: 'https://hiiiwav.org/hiiiwav-fest-24-recap/',
    8: 'https://hiiiwav.org/march-magic-afro-ai-mvp-hiiiwav-fest/',
    7: 'https://hiiiwav.org/a-heartfelt-thanks-to-everyone/',
    6: 'https://hiiiwav.org/hiiiwavs-2024-blast-off/',
    5: 'https://hiiiwav.org/afro-ai-champs-epic-recap/',
    4: 'https://hiiiwav.org/get-ready-for-afro-ai-demo-day-23/',
    3: 'https://hiiiwav.org/hiiiwav-2023-hiiilights/',
    2: 'https://hiiiwav.org/hiiiwav-studio-secured/',
    1: '(no WordPress URL mapped)',
  }
  
  for (const n of all) {
    const url = wpUrls[n.issueNumber] || '(unknown)'
    const status = n.foundersNote ? '✅' : '❌'
    console.log(`#${n.issueNumber} ${status}: ${url}`)
  }

  await client.end()
}

main().catch(console.error)
