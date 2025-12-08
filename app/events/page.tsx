import { db } from '@/db'
import { events } from '@/db/schema'
import { asc, desc, eq } from 'drizzle-orm'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Calendar, MapPin, ArrowRight } from 'lucide-react'

export const metadata = {
  title: 'Events | HiiiWAV',
  description: 'Join us for HiiiWAV Fest, Demo Days, workshops, and community gatherings throughout the year.',
}

export const dynamic = 'force-dynamic'

// Helper to group events by time period
function groupUpcomingEvents(events: typeof import('@/db/schema').events.$inferSelect[]) {
  const now = new Date()
  const endOfWeek = new Date(now)
  endOfWeek.setDate(now.getDate() + (7 - now.getDay()))
  
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0)
  const endOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 2, 0)

  const groups: { label: string; events: typeof events }[] = []
  
  const thisWeek = events.filter(e => new Date(e.eventDate) <= endOfWeek)
  const thisMonth = events.filter(e => {
    const d = new Date(e.eventDate)
    return d > endOfWeek && d <= endOfMonth
  })
  const nextMonth = events.filter(e => {
    const d = new Date(e.eventDate)
    return d > endOfMonth && d <= endOfNextMonth
  })
  const later = events.filter(e => new Date(e.eventDate) > endOfNextMonth)

  if (thisWeek.length > 0) groups.push({ label: 'This Week', events: thisWeek })
  if (thisMonth.length > 0) groups.push({ label: 'This Month', events: thisMonth })
  if (nextMonth.length > 0) {
    const monthName = new Date(now.getFullYear(), now.getMonth() + 1, 1).toLocaleDateString('en-US', { month: 'long' })
    groups.push({ label: monthName, events: nextMonth })
  }
  if (later.length > 0) groups.push({ label: 'Coming Up', events: later })

  return groups
}

// Helper to group past events by month
function groupPastEvents(events: typeof import('@/db/schema').events.$inferSelect[]) {
  const groups: { label: string; events: typeof events }[] = []
  const groupMap = new Map<string, typeof events>()

  for (const event of events) {
    const date = new Date(event.eventDate)
    const key = `${date.getFullYear()}-${date.getMonth()}`
    const label = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    
    if (!groupMap.has(key)) {
      groupMap.set(key, [])
    }
    groupMap.get(key)!.push(event)
  }

  // Convert map to array, sorted by date (most recent first)
  const sortedKeys = Array.from(groupMap.keys()).sort((a, b) => b.localeCompare(a))
  for (const key of sortedKeys) {
    const date = new Date(parseInt(key.split('-')[0]), parseInt(key.split('-')[1]), 1)
    const label = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    groups.push({ label, events: groupMap.get(key)! })
  }

  return groups
}

export default async function EventsPage() {
  const allEvents = await db
    .select()
    .from(events)
    .where(eq(events.published, true))
    .orderBy(asc(events.eventDate))

  const now = new Date()
  const upcomingEvents = allEvents.filter(e => new Date(e.eventDate) >= now)
  const pastEvents = allEvents
    .filter(e => new Date(e.eventDate) < now)
    .sort((a, b) => new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime())

  const upcomingGroups = groupUpcomingEvents(upcomingEvents)
  const pastGroups = groupPastEvents(pastEvents)

  return (
    <div className="bg-black text-white min-h-screen">
      <SiteHeader />
      
      <div className="container py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-[#99FF69]">Events</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Join us for HiiiWAV Fest, Demo Days, workshops, and community gatherings throughout the year.
            </p>
          </div>

          {/* Filter Links */}
          <div className="flex justify-center gap-4 mb-12">
            <Link
              href="/events"
              className="px-6 py-2 bg-[#99FF69] text-black font-medium rounded-full"
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
              className="px-6 py-2 border border-gray-700 text-gray-300 hover:border-[#99FF69] hover:text-[#99FF69] rounded-full transition-colors"
            >
              Past Events
            </Link>
          </div>

          {/* Upcoming Events Section */}
          {upcomingGroups.length > 0 && (
            <section className="mb-16">
              <h2 className="text-2xl font-bold mb-8 text-[#99FF69]">Upcoming Events</h2>
              {upcomingGroups.map((group) => (
                <div key={group.label} className="mb-10">
                  <h3 className="text-lg font-semibold text-gray-300 mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#99FF69]" />
                    {group.label}
                  </h3>
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {group.events.map((event) => (
                      <EventCard key={event.id} event={event} isUpcoming />
                    ))}
                  </div>
                </div>
              ))}
            </section>
          )}

          {/* Past Events Section */}
          {pastGroups.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-8 text-gray-400">Past Events</h2>
              {pastGroups.map((group) => (
                <div key={group.label} className="mb-10">
                  <h3 className="text-lg font-semibold text-gray-500 mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-gray-600" />
                    {group.label}
                  </h3>
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {group.events.map((event) => (
                      <EventCard key={event.id} event={event} />
                    ))}
                  </div>
                </div>
              ))}
            </section>
          )}

          {/* Empty State */}
          {allEvents.length === 0 && (
            <div className="text-center py-20">
              <Calendar className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No events yet</h3>
              <p className="text-gray-400">Check back soon for upcoming events!</p>
            </div>
          )}
        </div>
      </div>

      <SiteFooter />
    </div>
  )
}

function EventCard({ event, isUpcoming = false }: { event: typeof events.$inferSelect; isUpcoming?: boolean }) {
  return (
    <Link
      href={`/events/${event.slug}`}
      className={`group bg-black border rounded-xl overflow-hidden transition-all hover:scale-[1.02] ${
        isUpcoming ? 'border-[#99FF69]/50 hover:border-[#99FF69]' : 'border-gray-800 hover:border-gray-600'
      }`}
    >
      {event.coverImage && (
        <div className="aspect-video overflow-hidden">
          <img
            src={event.coverImage}
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}
      <div className="p-5">
        {/* Event Type Badge */}
        {event.eventType && (
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${
            isUpcoming ? 'bg-[#99FF69]/20 text-[#99FF69]' : 'bg-gray-800 text-gray-400'
          }`}>
            {event.eventType.replace('_', ' ').toUpperCase()}
          </span>
        )}
        
        <h3 className={`text-xl font-bold mt-3 mb-2 transition-colors line-clamp-2 ${
          isUpcoming ? 'group-hover:text-[#99FF69]' : 'group-hover:text-gray-200'
        }`}>
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
        
        <div className={`flex items-center gap-1 mt-4 text-sm font-medium ${
          isUpcoming ? 'text-[#99FF69]' : 'text-gray-500'
        }`}>
          {isUpcoming ? 'Get Tickets' : 'View Details'}
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  )
}
