import { db } from '@/db'
import { posts } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { notFound } from 'next/navigation'
import { formatDate } from '@/lib/utils'
import { MarkdownContent } from '@/components/markdown-content'
import Image from 'next/image'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = await db.select().from(posts).where(eq(posts.slug, slug)).limit(1).then(r => r[0])
  
  if (!post) {
    return {}
  }
  
  return {
    title: post.seoTitle ?? `${post.title} | HIIIWAV`,
    description: post.seoDescription ?? post.excerpt ?? undefined,
    alternates: {
      canonical: post.canonical ?? `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt ?? undefined,
      type: 'article',
      publishedTime: post.createdAt.toISOString(),
      images: post.coverImage ? [{ url: post.coverImage }] : [],
    },
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await db.select().from(posts).where(eq(posts.slug, slug)).limit(1).then(r => r[0])
  
  if (!post || !post.published) {
    notFound()
  }
  
  return (
    <div className="container py-12">
      <article className="max-w-3xl mx-auto">
        {/* Cover Image */}
        {post.coverImage && (
          <div className="mb-8 rounded-lg overflow-hidden">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-auto object-cover"
            />
          </div>
        )}
        
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <div className="text-sm text-muted-foreground mb-4">
            {formatDate(post.createdAt)}
          </div>
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-secondary px-2 py-1 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>
        
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <MarkdownContent content={post.content} />
        </div>
      </article>
    </div>
  )
}

