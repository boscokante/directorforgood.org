import { config } from 'dotenv'
import { resolve } from 'path'
config({ path: resolve(process.cwd(), '.env.local') })

import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('❌ Missing SUPABASE env vars')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
  auth: { persistSession: false }
})

async function main() {
  const localPath = '/tmp/hiiiwav-images/bosko-kante-founder.jpg'
  const storagePath = 'newsletters/bosko-kante-founder.jpg'
  
  console.log(`Uploading ${localPath} to ${storagePath}...`)
  
  const fileBuffer = readFileSync(localPath)
  
  const { data, error } = await supabase.storage
    .from('uploads')
    .upload(storagePath, fileBuffer, {
      contentType: 'image/jpeg',
      upsert: true
    })
  
  if (error) {
    console.error('❌ Upload failed:', error.message)
    process.exit(1)
  }
  
  console.log('✅ Uploaded successfully!')
  
  const { data: urlData } = supabase.storage
    .from('uploads')
    .getPublicUrl(storagePath)
  
  console.log(`📍 Public URL: ${urlData.publicUrl}`)
}

main().catch(console.error)
