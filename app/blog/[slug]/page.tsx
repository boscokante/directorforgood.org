import { db } from '@/db'
import { posts } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { notFound } from 'next/navigation'
import { formatDate } from '@/lib/utils'
import { MarkdownContent } from '@/components/markdown-content'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
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
    <div className="min-h-screen bg-black text-white">
      <SiteHeader />
      <div className="container py-12">
        <article className="max-w-3xl mx-auto">
          <header className="mb-8">
            <h1 className="text-4xl font-bold mb-4 text-white">{post.title}</h1>
            <div className="text-sm text-gray-400 mb-4">
              {formatDate(post.createdAt)}
            </div>
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>
          
          <div className="prose prose-lg max-w-none prose-invert">
            <MarkdownContent content={post.content} />
          </div>
        </article>
      </div>
      <SiteFooter />
    </div>
  )
}

