import { db } from '@/db'
import { newsletters } from '@/db/schema'
import { eq, desc, and, lt, gt } from 'drizzle-orm'
import { notFound } from 'next/navigation'
import { formatDate } from '@/lib/utils'
import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowLeft, ArrowRight, Calendar, Share2, Mail } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'

export const dynamic = 'force-dynamic'

// Simple markdown to HTML for founder's note
function renderFoundersNote(text: string): string {
  let html = text
    // Handle ## headings
    .replace(/^## (.*)$/gm, '<h3 class="text-2xl font-bold mb-4 mt-0">$1</h3>')
    // Handle **bold** 
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    // Handle *italic*
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    // Handle [text](url) links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener" class="text-[#A34DFF] underline hover:text-[#99FF69]">$1</a>')
  
  // Split by &nbsp; markers or double newlines for paragraph breaks
  const paragraphs = html.split(/(?:&nbsp;|\n\n)+/).filter(p => p.trim())
  
  return paragraphs.map(p => {
    const trimmed = p.trim()
    if (trimmed.startsWith('<h3')) return trimmed
    return `<p class="mb-6">${trimmed}</p>`
  }).join('\n')
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const newsletter = await db.select().from(newsletters).where(eq(newsletters.slug, slug)).limit(1).then(r => r[0])
  
  if (!newsletter) {
    return {}
  }
  
  return {
    title: newsletter.seoTitle ?? `${newsletter.title} | HiiiLIGHTS | HiiiWAV`,
    description: newsletter.seoDescription ?? newsletter.excerpt ?? undefined,
    openGraph: {
      title: newsletter.title,
      description: newsletter.excerpt ?? undefined,
      type: 'article',
      publishedTime: newsletter.publishedAt.toISOString(),
      images: newsletter.coverImage ? [{ url: newsletter.coverImage }] : [],
    },
  }
}

export default async function NewsletterPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const newsletter = await db.select().from(newsletters).where(eq(newsletters.slug, slug)).limit(1).then(r => r[0])
  
  if (!newsletter || !newsletter.published) {
    notFound()
  }

  // Get previous and next newsletters for navigation
  const [prevNewsletter] = await db
    .select({ slug: newsletters.slug, title: newsletters.title })
    .from(newsletters)
    .where(and(
      eq(newsletters.published, true),
      lt(newsletters.publishedAt, newsletter.publishedAt)
    ))
    .orderBy(desc(newsletters.publishedAt))
    .limit(1)

  const [nextNewsletter] = await db
    .select({ slug: newsletters.slug, title: newsletters.title })
    .from(newsletters)
    .where(and(
      eq(newsletters.published, true),
      gt(newsletters.publishedAt, newsletter.publishedAt)
    ))
    .orderBy(newsletters.publishedAt)
    .limit(1)
  
  return (
    <div className="min-h-screen bg-black">
      <SiteHeader />
      
      {/* Back Link */}
      <div className="bg-gray-900 py-4 border-b border-gray-800">
        <div className="container px-4">
          <Link 
            href="/hiiilights" 
            className="inline-flex items-center gap-2 text-gray-400 hover:text-[#99FF69] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to HiiiLIGHTS Archive
          </Link>
        </div>
      </div>

      {/* Newsletter Content */}
      <div className="container px-4 py-12">
        <article className="max-w-4xl mx-auto">
          {/* Newsletter Header */}
          <header className="mb-12 text-center">
            {newsletter.issueNumber && (
              <div className="inline-block bg-[#A34DFF]/20 text-[#A34DFF] px-4 py-1 rounded-full text-sm font-medium mb-4">
                Issue #{newsletter.issueNumber}
              </div>
            )}
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {newsletter.title}
            </h1>
            {newsletter.subtitle && (
              <p className="text-xl text-[#99FF69] mb-6">
                {newsletter.subtitle}
              </p>
            )}
            <div className="flex items-center justify-center gap-4 text-gray-400">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {formatDate(newsletter.publishedAt)}
              </div>
            </div>
          </header>

          {/* Newsletter Header Image */}
          <div className="mb-8">
            <img 
              src="https://pzoyeigicwgmmlngxowj.supabase.co/storage/v1/object/public/uploads/newsletters/hiiiwav-newsletter-header-hiiilights.png"
              alt="HiiiWAV HiiiLIGHTS Newsletter"
              className="w-full rounded-lg"
            />
          </div>

          {/* Founder's Note Section */}
          {newsletter.foundersNote && (
            <div className="mb-12 p-6 md:p-8 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-gray-700">
              <div className="flex flex-col md:flex-row gap-6 items-start mb-6">
                <div className="flex-shrink-0">
                  <img 
                    src="https://pzoyeigicwgmmlngxowj.supabase.co/storage/v1/object/public/uploads/newsletters/bosko-kante-founder.jpg"
                    alt="Bosko Kante, Founder of HiiiWAV"
                    className="w-28 h-28 md:w-36 md:h-36 rounded-full object-cover border-4 border-[#99FF69]"
                  />
                </div>
                <div className="flex-1">
                  <h2 className="text-[#99FF69] text-sm font-bold uppercase tracking-wider mb-2">
                    Letter from the Founder
                  </h2>
                  <p className="text-white text-xl md:text-2xl font-semibold mb-1">
                    Bosko Kante
                  </p>
                  <p className="text-gray-400 text-sm">
                    Founder & Executive Director, HiiiWAV
                  </p>
                </div>
              </div>
              <div 
                className="prose prose-invert prose-lg max-w-none text-gray-200 prose-p:text-gray-200 prose-headings:text-[#99FF69] prose-a:text-[#A34DFF] prose-a:no-underline hover:prose-a:underline prose-strong:text-white prose-em:text-gray-300"
                dangerouslySetInnerHTML={{ __html: renderFoundersNote(newsletter.foundersNote) }}
              />
              
              {/* Donate Button */}
              <div className="mt-8 pt-6 border-t border-gray-700 text-center">
                <p className="text-gray-300 mb-4">
                  Join us in shaping a music industry that empowers creators—your contribution makes a difference.
                </p>
                <Link 
                  href="/donate"
                  className="inline-flex items-center gap-2 bg-[#99FF69] text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-[#7ACC54] transition-colors shadow-lg hover:shadow-[#99FF69]/25"
                >
                  💚 Donate to HiiiWAV
                </Link>
              </div>
            </div>
          )}

          {/* Newsletter Body - Render HTML content */}
          <div 
            className="newsletter-content prose prose-invert prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: newsletter.content }}
          />

          {/* Share Section */}
          <div className="mt-12 pt-8 border-t border-gray-800">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <span className="text-gray-400">Share this newsletter:</span>
                <div className="flex gap-2">
                  <a 
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(newsletter.title)}&url=${encodeURIComponent(`https://hiiiwav.org/hiiilights/${newsletter.slug}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-gray-800 rounded-lg hover:bg-[#A34DFF] transition-colors"
                  >
                    <Share2 className="w-5 h-5 text-white" />
                  </a>
                  <a 
                    href={`mailto:?subject=${encodeURIComponent(newsletter.title)}&body=${encodeURIComponent(`Check out this newsletter from HiiiWAV: https://hiiiwav.org/hiiilights/${newsletter.slug}`)}`}
                    className="p-2 bg-gray-800 rounded-lg hover:bg-[#99FF69] transition-colors"
                  >
                    <Mail className="w-5 h-5 text-white" />
                  </a>
                </div>
              </div>
              <Link 
                href="/donate"
                className="inline-flex items-center gap-2 bg-[#99FF69] text-black px-6 py-3 rounded-full font-bold hover:bg-[#7ACC54] transition-colors"
              >
                Support HiiiWAV
              </Link>
            </div>
          </div>
        </article>
      </div>

      {/* Newsletter Navigation */}
      <div className="bg-gray-900 border-t border-gray-800">
        <div className="container px-4 py-8">
          <nav className="max-w-4xl mx-auto">
            <div className="flex justify-between gap-4">
              {prevNewsletter ? (
                <Link 
                  href={`/hiiilights/${prevNewsletter.slug}`}
                  className="flex-1 group p-4 bg-black rounded-lg border border-gray-800 hover:border-[#99FF69]/50 transition-colors"
                >
                  <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
                    <ArrowLeft className="w-4 h-4" />
                    Previous Issue
                  </div>
                  <div className="text-white font-medium group-hover:text-[#99FF69] transition-colors line-clamp-1">
                    {prevNewsletter.title}
                  </div>
                </Link>
              ) : (
                <div className="flex-1" />
              )}
              
              {nextNewsletter ? (
                <Link 
                  href={`/hiiilights/${nextNewsletter.slug}`}
                  className="flex-1 group p-4 bg-black rounded-lg border border-gray-800 hover:border-[#99FF69]/50 transition-colors text-right"
                >
                  <div className="flex items-center justify-end gap-2 text-gray-400 text-sm mb-2">
                    Next Issue
                    <ArrowRight className="w-4 h-4" />
                  </div>
                  <div className="text-white font-medium group-hover:text-[#99FF69] transition-colors line-clamp-1">
                    {nextNewsletter.title}
                  </div>
                </Link>
              ) : (
                <div className="flex-1" />
              )}
            </div>
          </nav>
        </div>
      </div>
      
      <SiteFooter />
    </div>
  )
}
