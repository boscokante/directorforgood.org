import { db } from '@/db'
import { posts, pages } from '@/db/schema'
import { eq, count } from 'drizzle-orm'

export const dynamic = 'force-dynamic'

export default async function AdminDashboard() {
  const [postCount, pageCount, publishedCount] = await Promise.all([
    db.select({ count: count() }).from(posts).then(r => r[0]?.count ?? 0),
    db.select({ count: count() }).from(pages).then(r => r[0]?.count ?? 0),
    db.select({ count: count() }).from(posts).where(eq(posts.published, true)).then(r => r[0]?.count ?? 0),
  ])

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      
      <div className="grid gap-6 md:grid-cols-3">
        <div className="border rounded-lg p-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Total Posts</h3>
          <p className="text-3xl font-bold">{postCount}</p>
        </div>
        
        <div className="border rounded-lg p-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Published Posts</h3>
          <p className="text-3xl font-bold">{publishedCount}</p>
        </div>
        
        <div className="border rounded-lg p-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Total Pages</h3>
          <p className="text-3xl font-bold">{pageCount}</p>
        </div>
      </div>
      
      <div className="mt-8 border rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
        <div className="space-y-2">
          <a href="/admin/posts/new" className="block text-primary hover:underline">
            Create New Post
          </a>
          <a href="/admin/pages/new" className="block text-primary hover:underline">
            Create New Page
          </a>
          <a href="/blog" className="block text-primary hover:underline">
            View Blog
          </a>
        </div>
      </div>
    </div>
  )
}

