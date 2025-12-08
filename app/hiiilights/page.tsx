import { db } from '@/db'
import { newsletters } from '@/db/schema'
import { desc, eq } from 'drizzle-orm'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'
import { Mail, Calendar, ArrowRight } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'

export const metadata = {
  title: 'HiiiLIGHTS Newsletter Archive | HiiiWAV',
  description: 'Read past issues of HiiiLIGHTS, the official HiiiWAV newsletter featuring community highlights, artist spotlights, and updates on our programs.',
}

export const dynamic = 'force-dynamic'

export default async function HiiilightsPage() {
  const allNewsletters = await db
    .select()
    .from(newsletters)
    .where(eq(newsletters.published, true))
    .orderBy(desc(newsletters.publishedAt))

  return (
    <div className="min-h-screen bg-black">
      <SiteHeader />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container px-4 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#99FF69]/20 mb-6">
            <Mail className="w-10 h-10 text-[#99FF69]" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Hiiii<span className="text-[#99FF69]">LIGHTS</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            The official HiiiWAV newsletter. Stay connected with community highlights, 
            artist spotlights, program updates, and all things HiiiWAV.
          </p>
          <a 
            href="https://hiiiwav.org/newsletter" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#99FF69] text-black px-6 py-3 rounded-lg font-semibold hover:bg-[#7ACC54] transition-colors"
          >
            Subscribe to HiiiLIGHTS
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* Newsletter Archive */}
      <section className="py-16">
        <div className="container px-4">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Newsletter Archive
          </h2>
          
          {allNewsletters.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400">No newsletters yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
              {allNewsletters.map((newsletter) => (
                <article 
                  key={newsletter.id} 
                  className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden hover:border-[#99FF69]/50 transition-all hover:shadow-lg hover:shadow-[#99FF69]/10 group"
                >
                  {newsletter.coverImage && (
                    <Link href={`/hiiilights/${newsletter.slug}`}>
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={newsletter.coverImage}
                          alt={newsletter.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </Link>
                  )}
                  
                  <div className="p-6">
                    {newsletter.issueNumber && (
                      <span className="text-xs font-semibold text-[#A34DFF] uppercase tracking-wider">
                        Issue #{newsletter.issueNumber}
                      </span>
                    )}
                    <Link href={`/hiiilights/${newsletter.slug}`}>
                      <h3 className="text-xl font-bold text-white mt-2 mb-3 group-hover:text-[#99FF69] transition-colors line-clamp-2">
                        {newsletter.title}
                      </h3>
                    </Link>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
                      <Calendar className="w-4 h-4" />
                      {formatDate(newsletter.publishedAt)}
                    </div>
                    
                    {newsletter.excerpt && (
                      <p className="text-gray-400 text-sm line-clamp-3 mb-4">
                        {newsletter.excerpt}
                      </p>
                    )}
                    
                    <Link 
                      href={`/hiiilights/${newsletter.slug}`}
                      className="inline-flex items-center gap-2 text-[#99FF69] font-medium hover:gap-3 transition-all"
                    >
                      Read Newsletter
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Subscribe CTA */}
      <section className="py-16 bg-gradient-to-r from-[#A34DFF]/20 to-[#99FF69]/20">
        <div className="container px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Never Miss an Issue
          </h2>
          <p className="text-gray-300 max-w-xl mx-auto mb-8">
            Get HiiiLIGHTS delivered straight to your inbox. Join our community of artists, 
            creators, and tech enthusiasts.
          </p>
          <a 
            href="https://hiiiwav.org/newsletter" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#99FF69] text-black px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#7ACC54] transition-colors"
          >
            Subscribe Now
            <Mail className="w-5 h-5" />
          </a>
        </div>
      </section>
      
      <SiteFooter />
    </div>
  )
}
