import { db } from '@/db'
import { posts } from '@/db/schema'
import { desc, eq } from 'drizzle-orm'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'

export const metadata = {
  title: 'Blog | HIIIWAV',
  description: 'Read the latest posts from HIIIWAV',
}

export const dynamic = 'force-dynamic'

export default async function BlogPage() {
  const allPosts = await db
    .select()
    .from(posts)
    .where(eq(posts.published, true))
    .orderBy(desc(posts.createdAt))

  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Blog</h1>
        
        {allPosts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No posts yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {allPosts.map((post) => (
              <article key={post.id} className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                {/* Cover Image */}
                {post.coverImage && (
                  <Link href={`/blog/${post.slug}`}>
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </Link>
                )}
                
                <div className="p-4">
                  <Link href={`/blog/${post.slug}`}>
                    <h2 className="text-xl font-semibold mb-2 hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                  </Link>
                  <div className="text-sm text-muted-foreground mb-3">
                    {formatDate(post.createdAt)}
                  </div>
                  {post.excerpt && (
                    <p className="text-muted-foreground text-sm line-clamp-3 mb-3">{post.excerpt}</p>
                  )}
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs bg-secondary px-2 py-0.5 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

