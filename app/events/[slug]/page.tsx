import { db } from '@/db'
import { events } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { MarkdownContent } from '@/components/markdown-content'
import { Calendar, MapPin, ArrowLeft, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const event = await db
    .select()
    .from(events)
    .where(eq(events.slug, slug))
    .limit(1)
    .then((rows) => rows[0])

  if (!event) {
    return { title: 'Event Not Found | HiiiWAV' }
  }

  return {
    title: `${event.title} | HiiiWAV Events`,
    description: event.description || `Join us for ${event.title}`,
  }
}

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const event = await db
    .select()
    .from(events)
    .where(eq(events.slug, slug))
    .limit(1)
    .then((rows) => rows[0])

  if (!event || !event.published) {
    notFound()
  }

  const isPast = new Date(event.eventDate) < new Date()

  return (
    <div className="bg-black text-white min-h-screen">
      <SiteHeader />
      
      {/* Hero Section */}
      <div className="relative">
        {event.coverImage && (
          <div className="absolute inset-0 h-[50vh]">
            <img
              src={event.coverImage}
              alt={event.title}
              className={`w-full h-full object-cover ${isPast ? 'opacity-40' : 'opacity-60'}`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
          </div>
        )}
        
        <div className="relative container py-12 px-4 min-h-[50vh] flex flex-col justify-end">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-[#99FF69] mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Events
          </Link>
          
          <div className="max-w-4xl">
            {event.eventType && (
              <span className={`text-xs font-medium px-3 py-1 rounded-full ${
                isPast ? 'bg-gray-800 text-gray-400' : 'bg-[#99FF69]/20 text-[#99FF69]'
              }`}>
                {isPast ? 'PAST EVENT' : event.eventType.replace('_', ' ').toUpperCase()}
              </span>
            )}
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-4 mb-6">
              {event.title}
            </h1>
            
            <div className="flex flex-wrap gap-6 text-lg">
              <div className="flex items-center gap-2 text-gray-300">
                <Calendar className="w-5 h-5 text-[#99FF69]" />
                <span>{formatDate(event.eventDate)}</span>
                {event.endDate && (
                  <span> - {formatDate(event.endDate)}</span>
                )}
              </div>
              
              {event.location && (
                <div className="flex items-center gap-2 text-gray-300">
                  <MapPin className="w-5 h-5 text-[#99FF69]" />
                  <span>{event.location}</span>
                </div>
              )}
            </div>
            
            {!isPast && event.registrationUrl && (
              <div className="mt-8">
                <Button
                  asChild
                  size="lg"
                  className="bg-[#99FF69] text-black hover:bg-[#7ACC54] font-bold text-lg px-8"
                >
                  <a href={event.registrationUrl} target="_blank" rel="noopener noreferrer">
                    Register Now
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {event.description && !event.content && (
            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              {event.description}
            </p>
          )}
          
          {event.content && (
            <div className="prose prose-invert prose-lg max-w-none">
              <MarkdownContent content={event.content} />
            </div>
          )}
          
          {event.address && (
            <div className="mt-12 p-6 bg-gray-900 rounded-xl">
              <h3 className="text-lg font-semibold mb-2">Location</h3>
              <p className="text-gray-400">{event.location}</p>
              <p className="text-gray-500 text-sm">{event.address}</p>
            </div>
          )}
        </div>
      </div>

      <SiteFooter />
    </div>
  )
}
