'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import type { Redirect } from '@/db/schema'

export default function AdminRedirectsPage() {
  const [redirects, setRedirects] = useState<Redirect[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [showImportForm, setShowImportForm] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)

  // Form state
  const [sourceUrl, setSourceUrl] = useState('')
  const [destinationUrl, setDestinationUrl] = useState('')
  const [statusCode, setStatusCode] = useState(301)
  const [notes, setNotes] = useState('')

  // Import state
  const [importData, setImportData] = useState('')
  const [importFormat, setImportFormat] = useState<'json' | 'csv' | 'wordpress'>('wordpress')
  const [importResult, setImportResult] = useState<{ imported: number; skipped: number } | null>(null)

  const fetchRedirects = async () => {
    try {
      const res = await fetch('/api/redirects')
      const data = await res.json()
      setRedirects(data)
    } catch (error) {
      console.error('Failed to fetch redirects:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRedirects()
  }, [])

  const resetForm = () => {
    setSourceUrl('')
    setDestinationUrl('')
    setStatusCode(301)
    setNotes('')
    setEditingId(null)
    setShowAddForm(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const payload = { sourceUrl, destinationUrl, statusCode, notes }

    try {
      if (editingId) {
        await fetch(`/api/redirects/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
      } else {
        await fetch('/api/redirects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
      }
      resetForm()
      fetchRedirects()
    } catch (error) {
      console.error('Failed to save redirect:', error)
    }
  }

  const handleEdit = (redirect: Redirect) => {
    setSourceUrl(redirect.sourceUrl)
    setDestinationUrl(redirect.destinationUrl)
    setStatusCode(redirect.statusCode || 301)
    setNotes(redirect.notes || '')
    setEditingId(redirect.id)
    setShowAddForm(true)
    setShowImportForm(false)
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this redirect?')) return

    try {
      await fetch(`/api/redirects/${id}`, { method: 'DELETE' })
      fetchRedirects()
    } catch (error) {
      console.error('Failed to delete redirect:', error)
    }
  }

  const handleToggleEnabled = async (redirect: Redirect) => {
    try {
      await fetch(`/api/redirects/${redirect.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...redirect,
          enabled: !redirect.enabled,
        }),
      })
      fetchRedirects()
    } catch (error) {
      console.error('Failed to toggle redirect:', error)
    }
  }

  const handleImport = async (e: React.FormEvent) => {
    e.preventDefault()
    setImportResult(null)

    try {
      const res = await fetch('/api/redirects/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          redirectsList: importData,
          format: importFormat,
        }),
      })

      const result = await res.json()
      if (res.ok) {
        setImportResult(result)
        setImportData('')
        fetchRedirects()
      } else {
        alert(result.error || 'Import failed')
      }
    } catch (error) {
      console.error('Failed to import redirects:', error)
      alert('Import failed')
    }
  }

  if (loading) {
    return <div className="p-8">Loading...</div>
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Redirects</h1>
        <div className="flex gap-2">
          <Button
            variant={showImportForm ? 'default' : 'outline'}
            onClick={() => {
              setShowImportForm(!showImportForm)
              setShowAddForm(false)
              resetForm()
            }}
          >
            Import
          </Button>
          <Button
            onClick={() => {
              setShowAddForm(!showAddForm)
              setShowImportForm(false)
              if (showAddForm) resetForm()
            }}
          >
            {showAddForm ? 'Cancel' : 'Add Redirect'}
          </Button>
        </div>
      </div>

      {/* Import Form */}
      {showImportForm && (
        <div className="mb-8 p-6 border rounded-lg bg-muted/30">
          <h2 className="text-xl font-semibold mb-4">Import Redirects</h2>
          <form onSubmit={handleImport} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Format</label>
              <select
                value={importFormat}
                onChange={(e) => setImportFormat(e.target.value as any)}
                className="w-full p-2 border rounded-md bg-background"
              >
                <option value="wordpress">WordPress Redirection Plugin (JSON)</option>
                <option value="json">Simple JSON Array</option>
                <option value="csv">CSV (source,target,code)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Paste your redirect data
              </label>
              <textarea
                value={importData}
                onChange={(e) => setImportData(e.target.value)}
                className="w-full h-48 p-3 border rounded-md font-mono text-sm bg-background"
                placeholder={
                  importFormat === 'csv'
                    ? '/old-page,/new-page,301\n/another-old,/another-new,302'
                    : importFormat === 'json'
                    ? '[{"source": "/old", "target": "/new"}]'
                    : '{"redirects": [{"url": "/old", "action_data": {"url": "/new"}}]}'
                }
              />
            </div>
            <div className="flex items-center gap-4">
              <Button type="submit">Import Redirects</Button>
              {importResult && (
                <span className="text-sm text-muted-foreground">
                  Imported {importResult.imported}, skipped {importResult.skipped} duplicates
                </span>
              )}
            </div>
          </form>
        </div>
      )}

      {/* Add/Edit Form */}
      {showAddForm && (
        <form onSubmit={handleSubmit} className="mb-8 p-6 border rounded-lg bg-muted/30">
          <h2 className="text-xl font-semibold mb-4">
            {editingId ? 'Edit Redirect' : 'Add New Redirect'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Source URL</label>
              <Input
                value={sourceUrl}
                onChange={(e) => setSourceUrl(e.target.value)}
                placeholder="/old-page"
                required
              />
              <p className="text-xs text-muted-foreground mt-1">The old URL path that should redirect</p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Destination URL</label>
              <Input
                value={destinationUrl}
                onChange={(e) => setDestinationUrl(e.target.value)}
                placeholder="/new-page or https://external.com"
                required
              />
              <p className="text-xs text-muted-foreground mt-1">Where visitors should be sent</p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Status Code</label>
              <select
                value={statusCode}
                onChange={(e) => setStatusCode(parseInt(e.target.value))}
                className="w-full p-2 border rounded-md bg-background"
              >
                <option value={301}>301 - Permanent Redirect</option>
                <option value={302}>302 - Temporary Redirect</option>
                <option value={307}>307 - Temporary (Preserve Method)</option>
                <option value={308}>308 - Permanent (Preserve Method)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Notes</label>
              <Input
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Optional admin notes"
              />
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <Button type="submit">{editingId ? 'Save Changes' : 'Add Redirect'}</Button>
            <Button type="button" variant="outline" onClick={resetForm}>
              Cancel
            </Button>
          </div>
        </form>
      )}

      {/* Redirects Table */}
      <div className="border rounded-lg">
        <table className="w-full">
          <thead className="border-b bg-muted/50">
            <tr>
              <th className="text-left p-4 font-medium">Source</th>
              <th className="text-left p-4 font-medium">Destination</th>
              <th className="text-center p-4 font-medium">Code</th>
              <th className="text-center p-4 font-medium">Hits</th>
              <th className="text-center p-4 font-medium">Status</th>
              <th className="text-right p-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {redirects.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-muted-foreground">
                  No redirects yet. Add one or import from WordPress!
                </td>
              </tr>
            ) : (
              redirects.map((redirect) => (
                <tr
                  key={redirect.id}
                  className={`border-b last:border-0 ${!redirect.enabled ? 'opacity-50' : ''}`}
                >
                  <td className="p-4">
                    <code className="text-sm bg-muted px-2 py-1 rounded">
                      {redirect.sourceUrl}
                    </code>
                    {redirect.notes && (
                      <p className="text-xs text-muted-foreground mt-1">{redirect.notes}</p>
                    )}
                  </td>
                  <td className="p-4">
                    <code className="text-sm bg-muted px-2 py-1 rounded">
                      {redirect.destinationUrl}
                    </code>
                  </td>
                  <td className="p-4 text-center">
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        redirect.statusCode === 301
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {redirect.statusCode}
                    </span>
                  </td>
                  <td className="p-4 text-center text-sm text-muted-foreground">
                    {redirect.hitCount || 0}
                  </td>
                  <td className="p-4 text-center">
                    <button
                      onClick={() => handleToggleEnabled(redirect)}
                      className={`text-xs px-2 py-1 rounded cursor-pointer ${
                        redirect.enabled
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {redirect.enabled ? 'Active' : 'Disabled'}
                    </button>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex gap-2 justify-end">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(redirect)}>
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(redirect.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Stats */}
      {redirects.length > 0 && (
        <div className="mt-4 text-sm text-muted-foreground">
          {redirects.length} redirect{redirects.length !== 1 ? 's' : ''} •{' '}
          {redirects.filter((r) => r.enabled).length} active •{' '}
          {redirects.reduce((sum, r) => sum + (r.hitCount || 0), 0)} total hits
        </div>
      )}
    </div>
  )
}

