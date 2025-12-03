import { db } from '@/db'
import { pages, redirects } from '@/db/schema'
import { eq, and } from 'drizzle-orm'
import { notFound, redirect } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export const dynamic = 'force-dynamic'

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params
  
  // Skip empty slugs (homepage should be handled by app/page.tsx)
  if (!slug || slug.trim() === '') {
    notFound()
  }
  
  const path = `/${slug}`

  // Check for redirect first
  const [redirectRule] = await db
    .select()
    .from(redirects)
    .where(and(eq(redirects.sourceUrl, path), eq(redirects.enabled, true)))
    .limit(1)

  if (redirectRule) {
    // Update hit count (fire and forget)
    db.update(redirects)
      .set({
        hitCount: (redirectRule.hitCount || 0) + 1,
        lastHitAt: new Date(),
      })
      .where(eq(redirects.id, redirectRule.id))
      .catch(() => {})

    redirect(redirectRule.destinationUrl)
  }

  // Check for page
  const page = await db
    .select()
    .from(pages)
    .where(eq(pages.slug, slug))
    .limit(1)
    .then((r) => r[0])

  if (!page) {
    notFound()
  }

  return (
    <div className="bg-black min-h-screen py-16">
      <div className="container max-w-4xl px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">
          {page.title}
        </h1>
        
        <div className="prose prose-invert prose-lg max-w-none prose-headings:text-[#99FF69] prose-a:text-[#99FF69] prose-strong:text-white">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {page.content || ''}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  )
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  
  if (!slug || slug.trim() === '') {
    return { title: 'Page Not Found' }
  }
  
  const page = await db
    .select()
    .from(pages)
    .where(eq(pages.slug, slug))
    .limit(1)
    .then((r) => r[0])

  if (!page) {
    return { title: 'Page Not Found' }
  }

  return {
    title: `${page.title} - HiiiWAV`,
    description: page.seoDescription || `${page.title} - HiiiWAV Creative Tech Incubator`,
  }
}
