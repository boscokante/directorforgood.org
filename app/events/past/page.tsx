import { db } from '@/db'
import { events } from '@/db/schema'
import { desc, eq, lt, and } from 'drizzle-orm'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Calendar, MapPin, ArrowRight } from 'lucide-react'

export const metadata = {
  title: 'Past Events | HiiiWAV',
  description: 'Explore our history of events - HiiiWAV Fest, Demo Days, workshops, and community gatherings.',
}

export const dynamic = 'force-dynamic'

export default async function PastEventsPage() {
  const pastEvents = await db
    .select()
    .from(events)
    .where(
      and(
        eq(events.published, true),
        lt(events.eventDate, new Date())
      )
    )
    .orderBy(desc(events.eventDate))

  return (
    <div className="bg-black text-white min-h-screen">
      <SiteHeader />
      
      <div className="container py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Past <span className="text-gray-500">Events</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Explore our history of events and see what we&apos;ve been up to.
            </p>
          </div>

          {/* Filter Links */}
          <div className="flex justify-center gap-4 mb-12">
            <Link
              href="/events"
              className="px-6 py-2 border border-gray-700 text-gray-300 hover:border-[#99FF69] hover:text-[#99FF69] rounded-full transition-colors"
            >
              All Events
            </Link>
            <Link
              href="/events/upcoming"
              className="px-6 py-2 border border-gray-700 text-gray-300 hover:border-[#99FF69] hover:text-[#99FF69] rounded-full transition-colors"
            >
              Upcoming
            </Link>
            <Link
              href="/events/past"
              className="px-6 py-2 bg-gray-700 text-white font-medium rounded-full"
            >
              Past Events
            </Link>
          </div>

          {/* Events Grid */}
          {pastEvents.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {pastEvents.map((event) => (
                <Link
                  key={event.id}
                  href={`/events/${event.slug}`}
                  className="group bg-black border border-gray-800 hover:border-gray-600 rounded-xl overflow-hidden transition-all hover:scale-[1.02]"
                >
                  {event.coverImage && (
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={event.coverImage}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 grayscale-[30%] group-hover:grayscale-0"
                      />
                    </div>
                  )}
                  <div className="p-5">
                    {event.eventType && (
                      <span className="text-xs font-medium px-2 py-1 rounded-full bg-gray-800 text-gray-400">
                        {event.eventType.replace('_', ' ').toUpperCase()}
                      </span>
                    )}
                    
                    <h3 className="text-xl font-bold mt-3 mb-2 group-hover:text-gray-200 transition-colors line-clamp-2">
                      {event.title}
                    </h3>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(event.eventDate)}</span>
                    </div>
                    
                    {event.location && (
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <MapPin className="w-4 h-4" />
                        <span className="line-clamp-1">{event.location}</span>
                      </div>
                    )}
                    
                    {event.description && (
                      <p className="text-gray-400 text-sm mt-3 line-clamp-2">{event.description}</p>
                    )}
                    
                    <div className="flex items-center gap-1 mt-4 text-sm font-medium text-gray-500">
                      View Recap
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <Calendar className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No past events yet</h3>
              <p className="text-gray-400 mb-6">Stay tuned for our first event!</p>
              <Link
                href="/events/upcoming"
                className="inline-flex items-center gap-2 text-[#99FF69] hover:underline"
              >
                View Upcoming Events <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </div>

      <SiteFooter />
    </div>
  )
}
