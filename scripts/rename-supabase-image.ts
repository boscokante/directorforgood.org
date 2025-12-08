import { config } from 'dotenv'
import { resolve } from 'path'
config({ path: resolve(process.cwd(), '.env.local') })

import { createClient } from '@supabase/supabase-js'

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
  const oldPath = '2024/09/unnamed.png'
  const newPath = '2024/09/afro-ai-mvp-group-shot-at-kapor-center.png'
  
  console.log(`Copying ${oldPath} to ${newPath}...`)
  
  // Download the file
  const { data: fileData, error: downloadError } = await supabase.storage
    .from('uploads')
    .download(oldPath)
  
  if (downloadError) {
    console.error('❌ Download failed:', downloadError.message)
    process.exit(1)
  }
  
  console.log('✅ Downloaded original file')
  
  // Upload with new name
  const { error: uploadError } = await supabase.storage
    .from('uploads')
    .upload(newPath, fileData, {
      contentType: 'image/png',
      upsert: true
    })
  
  if (uploadError) {
    console.error('❌ Upload failed:', uploadError.message)
    process.exit(1)
  }
  
  console.log('✅ Uploaded with new name')
  
  const { data: urlData } = supabase.storage
    .from('uploads')
    .getPublicUrl(newPath)
  
  console.log(`📍 New URL: ${urlData.publicUrl}`)
}

main().catch(console.error)
