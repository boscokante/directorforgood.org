/**
 * Automatically set up Supabase Storage bucket for WordPress image migration
 * 
 * Prerequisites:
 * - NEXT_PUBLIC_SUPABASE_URL in .env.local
 * - SUPABASE_SERVICE_ROLE_KEY in .env.local (from Supabase dashboard → Settings → API)
 * 
 * Usage: npx tsx scripts/setup-supabase-storage.ts
 */

import { config } from 'dotenv'
import { resolve } from 'path'
config({ path: resolve(process.cwd(), '.env.local') })

import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
const BUCKET_NAME = 'uploads'

async function main() {
  console.log('🚀 Setting up Supabase Storage\n')

  // Validate environment
  if (!SUPABASE_URL) {
    console.error('❌ Missing NEXT_PUBLIC_SUPABASE_URL in .env.local')
    console.log('\nGet it from: https://supabase.com/dashboard/project/YOUR_PROJECT/settings/api')
    process.exit(1)
  }

  if (!SUPABASE_SERVICE_KEY) {
    console.error('❌ Missing SUPABASE_SERVICE_ROLE_KEY in .env.local')
    console.log('\nGet it from: https://supabase.com/dashboard/project/YOUR_PROJECT/settings/api')
    console.log('(Look for "service_role" key - keep this secret!)\n')
    
    // Provide the exact URL for their project
    const projectId = SUPABASE_URL.match(/https:\/\/([^.]+)/)?.[1]
    if (projectId) {
      console.log(`Direct link: https://supabase.com/dashboard/project/${projectId}/settings/api`)
    }
    process.exit(1)
  }

  // Create admin client with service role key
  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
    auth: { persistSession: false }
  })

  console.log(`📍 Supabase URL: ${SUPABASE_URL}`)
  console.log(`🪣 Bucket name: ${BUCKET_NAME}\n`)

  // Check existing buckets
  console.log('🔍 Checking existing buckets...')
  const { data: buckets, error: listError } = await supabase.storage.listBuckets()

  if (listError) {
    console.error('❌ Failed to list buckets:', listError.message)
    process.exit(1)
  }

  const existingBucket = buckets?.find(b => b.name === BUCKET_NAME)

  if (existingBucket) {
    console.log(`✅ Bucket "${BUCKET_NAME}" already exists`)
    console.log(`   Public: ${existingBucket.public}`)
    console.log(`   Created: ${existingBucket.created_at}`)
    
    if (!existingBucket.public) {
      console.log('\n⚠️  Bucket is not public. Making it public...')
      const { error: updateError } = await supabase.storage.updateBucket(BUCKET_NAME, {
        public: true
      })
      if (updateError) {
        console.error('❌ Failed to make bucket public:', updateError.message)
      } else {
        console.log('✅ Bucket is now public')
      }
    }
  } else {
    // Create the bucket
    console.log(`📦 Creating bucket "${BUCKET_NAME}"...`)
    
    const { data, error: createError } = await supabase.storage.createBucket(BUCKET_NAME, {
      public: true,
      fileSizeLimit: 52428800, // 50MB max file size
      allowedMimeTypes: [
        'image/jpeg',
        'image/png',
        'image/gif',
        'image/webp',
        'image/svg+xml',
        'video/mp4',
        'video/webm',
        'application/pdf'
      ]
    })

    if (createError) {
      console.error('❌ Failed to create bucket:', createError.message)
      process.exit(1)
    }

    console.log('✅ Bucket created successfully!')
  }

  // Print helpful info
  console.log('\n' + '='.repeat(60))
  console.log('📋 Storage Configuration')
  console.log('='.repeat(60))
  console.log(`\nBucket URL: ${SUPABASE_URL}/storage/v1/object/public/${BUCKET_NAME}/`)
  console.log(`\nExample image URL after migration:`)
  console.log(`  ${SUPABASE_URL}/storage/v1/object/public/${BUCKET_NAME}/2024/02/image.jpg`)
  
  console.log('\n✨ Storage is ready! You can now run:')
  console.log('   npm run wp:migrate-images')
  
  process.exit(0)
}

main().catch(err => {
  console.error('❌ Setup failed:', err)
  process.exit(1)
})

