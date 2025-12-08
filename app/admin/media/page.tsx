'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Copy, Search, Loader2, Check } from 'lucide-react'

interface MediaItem {
  name: string
  url: string
  size: number
  mimeType: string
  createdAt: string
  path: string
}

export default function MediaGalleryPage() {
  const [images, setImages] = useState<MediaItem[]>([])
  const [filteredImages, setFilteredImages] = useState<MediaItem[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null)

  useEffect(() => {
    fetchImages()
  }, [])

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredImages(images)
    } else {
      const query = searchQuery.toLowerCase()
      setFilteredImages(
        images.filter(img => 
          img.name.toLowerCase().includes(query) ||
          img.path.toLowerCase().includes(query)
        )
      )
    }
  }, [searchQuery, images])

  async function fetchImages() {
    try {
      setLoading(true)
      const response = await fetch('/api/media')
      if (!response.ok) throw new Error('Failed to fetch images')
      const data = await response.json()
      setImages(data.images || [])
      setFilteredImages(data.images || [])
    } catch (error) {
      console.error('Error fetching images:', error)
    } finally {
      setLoading(false)
    }
  }

  function copyToClipboard(url: string) {
    navigator.clipboard.writeText(url)
    setCopiedUrl(url)
    setTimeout(() => setCopiedUrl(null), 2000)
  }

  function formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Media Gallery</h1>
          <p className="text-muted-foreground mt-1">
            {filteredImages.length} {filteredImages.length === 1 ? 'image' : 'images'}
            {searchQuery && ` matching "${searchQuery}"`}
          </p>
        </div>
        <Button onClick={fetchImages} variant="outline">
          Refresh
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search images by name or path..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {filteredImages.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          {searchQuery ? 'No images found matching your search.' : 'No images found.'}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredImages.map((image) => (
            <div
              key={image.url}
              className="group relative aspect-square border rounded-lg overflow-hidden bg-muted/40 hover:border-primary transition-colors"
            >
              <img
                src={image.url}
                alt={image.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => copyToClipboard(image.url)}
                  className="gap-2"
                >
                  {copiedUrl === image.url ? (
                    <>
                      <Check className="h-4 w-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      Copy URL
                    </>
                  )}
                </Button>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-xs text-white truncate" title={image.name}>
                  {image.name}
                </p>
                <p className="text-xs text-white/70">
                  {formatFileSize(image.size)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Image detail modal on click */}
      {filteredImages.length > 0 && (
        <div className="mt-8 p-4 bg-muted/40 rounded-lg">
          <h2 className="text-sm font-semibold mb-2">Quick Tips</h2>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Hover over an image to copy its URL</li>
            <li>• Use the search bar to find specific images</li>
            <li>• Click "Refresh" to reload images from storage</li>
          </ul>
        </div>
      )}
    </div>
  )
}
