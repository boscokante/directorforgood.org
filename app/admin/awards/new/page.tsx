'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { slugify } from '@/lib/utils'

interface Entity {
  id: number
  name: string
  type: string
}

export default function NewAwardPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [entities, setEntities] = useState<Entity[]>([])
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    awardingEntity: '',
    year: new Date().getFullYear(),
    category: 'award',
    status: 'won',
    prizeAmount: '',
    prizeDescription: '',
    description: '',
    notableFacts: '',
    awardingOrgUrl: '',
    awardPageUrl: '',
    pressUrl: '',
    recipientIds: [] as number[],
  })

  useEffect(() => {
    fetch('/api/entities')
      .then((res) => res.json())
      .then((data) => setEntities(data))
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('/api/awards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          slug: formData.slug || slugify(formData.name),
          year: formData.year || null,
          prizeAmount: formData.prizeAmount ? parseInt(formData.prizeAmount) * 100 : null, // Convert to cents
        }),
      })

      if (res.ok) {
        router.push('/admin/awards')
        router.refresh()
      } else {
        alert('Failed to create award')
      }
    } catch (error) {
      console.error(error)
      alert('An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const toggleRecipient = (id: number) => {
    setFormData((prev) => ({
      ...prev,
      recipientIds: prev.recipientIds.includes(id)
        ? prev.recipientIds.filter((rid) => rid !== id)
        : [...prev.recipientIds, id],
    }))
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">Add Award</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Quick Entry Section */}
        <div className="bg-muted/50 rounded-lg p-4 space-y-4">
          <h2 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Quick Entry</h2>
          
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Award Name *
            </label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              placeholder="e.g., Guthrie Award"
              autoFocus
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="year" className="block text-sm font-medium mb-2">
                Year
              </label>
              <Input
                id="year"
                type="number"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) || 0 })}
                placeholder="2024"
              />
            </div>

            <div>
              <label htmlFor="awardingEntity" className="block text-sm font-medium mb-2">
                Awarding Organization
              </label>
              <Input
                id="awardingEntity"
                value={formData.awardingEntity}
                onChange={(e) => setFormData({ ...formData, awardingEntity: e.target.value })}
                placeholder="e.g., Guthrie Foundation"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Recipient(s) *
            </label>
            <div className="flex flex-wrap gap-2">
              {entities.map((entity) => (
                <button
                  key={entity.id}
                  type="button"
                  onClick={() => toggleRecipient(entity.id)}
                  className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                    formData.recipientIds.includes(entity.id)
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted hover:bg-muted/80'
                  }`}
                >
                  {entity.name}
                </button>
              ))}
            </div>
            {entities.length === 0 && (
              <p className="text-sm text-muted-foreground mt-2">
                No entities yet.{' '}
                <a href="/admin/entities/new" className="text-primary hover:underline">
                  Add one first
                </a>
              </p>
            )}
          </div>
        </div>

        {/* Additional Details (collapsed by default) */}
        <details className="border rounded-lg">
          <summary className="p-4 cursor-pointer font-medium">
            Additional Details (optional)
          </summary>
          <div className="p-4 pt-0 space-y-4">
            <div>
              <label htmlFor="slug" className="block text-sm font-medium mb-2">
                Slug
              </label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                placeholder="auto-generated-from-name"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="category" className="block text-sm font-medium mb-2">
                  Category
                </label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="award">Award</option>
                  <option value="grant">Grant</option>
                  <option value="fellowship">Fellowship</option>
                  <option value="recognition">Recognition</option>
                  <option value="nomination">Nomination</option>
                </select>
              </div>

              <div>
                <label htmlFor="status" className="block text-sm font-medium mb-2">
                  Status
                </label>
                <select
                  id="status"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="won">Won</option>
                  <option value="nominated">Nominated</option>
                  <option value="finalist">Finalist</option>
                  <option value="honorable_mention">Honorable Mention</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="prizeAmount" className="block text-sm font-medium mb-2">
                  Prize Amount ($)
                </label>
                <Input
                  id="prizeAmount"
                  type="number"
                  value={formData.prizeAmount}
                  onChange={(e) => setFormData({ ...formData, prizeAmount: e.target.value })}
                  placeholder="10000"
                />
              </div>

              <div>
                <label htmlFor="prizeDescription" className="block text-sm font-medium mb-2">
                  Prize Description
                </label>
                <Input
                  id="prizeDescription"
                  value={formData.prizeDescription}
                  onChange={(e) => setFormData({ ...formData, prizeDescription: e.target.value })}
                  placeholder="e.g., Trophy, Studio time"
                />
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium mb-2">
                Description
              </label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="What is this award for?"
                rows={3}
              />
            </div>

            <div>
              <label htmlFor="notableFacts" className="block text-sm font-medium mb-2">
                Notable Facts
              </label>
              <Textarea
                id="notableFacts"
                value={formData.notableFacts}
                onChange={(e) => setFormData({ ...formData, notableFacts: e.target.value })}
                placeholder="Any notable information about this award"
                rows={2}
              />
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div>
                <label htmlFor="awardingOrgUrl" className="block text-sm font-medium mb-2">
                  Awarding Org Website
                </label>
                <Input
                  id="awardingOrgUrl"
                  value={formData.awardingOrgUrl}
                  onChange={(e) => setFormData({ ...formData, awardingOrgUrl: e.target.value })}
                  placeholder="https://..."
                />
              </div>

              <div>
                <label htmlFor="awardPageUrl" className="block text-sm font-medium mb-2">
                  Award Page URL
                </label>
                <Input
                  id="awardPageUrl"
                  value={formData.awardPageUrl}
                  onChange={(e) => setFormData({ ...formData, awardPageUrl: e.target.value })}
                  placeholder="https://..."
                />
              </div>

              <div>
                <label htmlFor="pressUrl" className="block text-sm font-medium mb-2">
                  Press Release URL
                </label>
                <Input
                  id="pressUrl"
                  value={formData.pressUrl}
                  onChange={(e) => setFormData({ ...formData, pressUrl: e.target.value })}
                  placeholder="https://..."
                />
              </div>
            </div>
          </div>
        </details>

        <div className="flex gap-4">
          <Button type="submit" disabled={loading || formData.recipientIds.length === 0}>
            {loading ? 'Creating...' : 'Add Award'}
          </Button>
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}

