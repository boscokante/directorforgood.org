import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
const BUCKET_NAME = 'uploads'

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('Missing Supabase environment variables')
}

const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_KEY!, {
  auth: { persistSession: false }
})

export async function GET() {
  try {
    // List all files in the uploads bucket
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .list('', {
        limit: 1000,
        offset: 0,
        sortBy: { column: 'created_at', order: 'desc' }
      })

    if (error) {
      console.error('Error listing files:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Filter for image files and get their public URLs
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg']
    const images = await Promise.all(
      (data || [])
        .filter(file => {
          const ext = file.name.toLowerCase().substring(file.name.lastIndexOf('.'))
          return imageExtensions.includes(ext) || file.metadata?.mimetype?.startsWith('image/')
        })
        .map(async (file) => {
          const { data: urlData } = supabase.storage
            .from(BUCKET_NAME)
            .getPublicUrl(file.name)
          
          return {
            name: file.name,
            url: urlData.publicUrl,
            size: file.metadata?.size || file.metadata?.size || 0,
            mimeType: file.metadata?.mimetype || 'image/jpeg',
            createdAt: file.created_at || file.updated_at || new Date().toISOString(),
            path: file.name
          }
        })
    )

    // Recursively list files in subdirectories (up to 2 levels deep for WordPress structure)
    const allImages: typeof images = [...images]
    
    // Helper function to list a directory
    async function listDirectory(path: string, depth: number = 0): Promise<void> {
      if (depth > 2) return // Limit depth to avoid too many requests
      
      const { data: dirData, error } = await supabase.storage
        .from(BUCKET_NAME)
        .list(path, {
          limit: 1000,
          sortBy: { column: 'created_at', order: 'desc' }
        })
      
      if (error || !dirData) return
      
      // Separate files and folders
      const files = dirData.filter(item => item.id !== null)
      const folders = dirData.filter(item => item.id === null)
      
      // Process image files in this directory
      const dirImages = await Promise.all(
        files
          .filter(file => {
            const ext = file.name.toLowerCase().substring(file.name.lastIndexOf('.'))
            return imageExtensions.includes(ext) || file.metadata?.mimetype?.startsWith('image/')
          })
          .map(async (file) => {
            const filePath = path ? `${path}/${file.name}` : file.name
            const { data: urlData } = supabase.storage
              .from(BUCKET_NAME)
              .getPublicUrl(filePath)
            
            return {
              name: file.name,
              url: urlData.publicUrl,
              size: file.metadata?.size || 0,
              mimeType: file.metadata?.mimetype || 'image/jpeg',
              createdAt: file.created_at || file.updated_at || new Date().toISOString(),
              path: filePath
            }
          })
      )
      allImages.push(...dirImages)
      
      // Recurse into subdirectories
      for (const folder of folders) {
        const folderPath = path ? `${path}/${folder.name}` : folder.name
        await listDirectory(folderPath, depth + 1)
      }
    }
    
    // Start recursive listing from root subdirectories
    const subdirs = (data || [])
      .filter(item => item.id === null) // Folders have null id
    
    for (const dir of subdirs) {
      await listDirectory(dir.name, 1)
    }

    // Sort by creation date (newest first)
    allImages.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )

    return NextResponse.json({ images: allImages })
  } catch (error) {
    console.error('Error fetching media:', error)
    return NextResponse.json(
      { error: 'Failed to fetch media' },
      { status: 500 }
    )
  }
}
