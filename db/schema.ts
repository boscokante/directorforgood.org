import { pgTable, text, timestamp, boolean, serial, jsonb, integer, date } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: text('email').notNull().unique(),
  name: text('name'),
  role: text('role').default('user'),
  image: text('image'),
  passwordHash: text('password_hash'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const media = pgTable('media', {
  id: serial('id').primaryKey(),
  filename: text('filename').notNull(),
  url: text('url').notNull(),
  mimeType: text('mime_type'),
  size: integer('size'),
  altText: text('alt_text'),
  uploadedBy: integer('uploaded_by').references(() => users.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

// Entities: HiiiWAV org, participant artists, and staff members
export const entities = pgTable('entities', {
  id: serial('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  name: text('name').notNull(),
  type: text('type').notNull(), // 'organization', 'participant', 'staff'
  bio: text('bio'),
  shortBio: text('short_bio'),
  image: text('image'),
  website: text('website'),
  socialLinks: jsonb('social_links').$type<{
    instagram?: string
    twitter?: string
    spotify?: string
    youtube?: string
    facebook?: string
    tiktok?: string
    soundcloud?: string
    bandcamp?: string
    linkedin?: string
  }>(),
  genre: text('genre'), // For artists
  role: text('role'), // For staff (e.g., "Executive Director")
  active: boolean('active').default(true),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// Awards, grants, and recognitions
export const awards = pgTable('awards', {
  id: serial('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  name: text('name').notNull(),
  awardingEntity: text('awarding_entity').notNull(), // Organization that gave the award
  awardDate: date('award_date'),
  year: integer('year'), // Fallback when exact date unknown
  category: text('category'), // 'grant', 'award', 'fellowship', 'recognition', 'nomination'
  status: text('status').default('won'), // 'won', 'nominated', 'finalist', 'honorable_mention'
  prizeAmount: integer('prize_amount'), // In cents for precision
  prizeDescription: text('prize_description'), // Non-monetary prize details
  description: text('description'),
  notableFacts: text('notable_facts'),
  awardingOrgUrl: text('awarding_org_url'),
  awardPageUrl: text('award_page_url'),
  pressUrl: text('press_url'),
  image: text('image'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// Junction table: links awards to entities (many-to-many)
export const awardRecipients = pgTable('award_recipients', {
  id: serial('id').primaryKey(),
  awardId: integer('award_id').notNull().references(() => awards.id, { onDelete: 'cascade' }),
  entityId: integer('entity_id').notNull().references(() => entities.id, { onDelete: 'cascade' }),
  recipientRole: text('recipient_role'), // 'primary', 'collaborator', 'featured'
})

export type User = typeof users.$inferSelect
export type Media = typeof media.$inferSelect
export type Entity = typeof entities.$inferSelect
export type NewEntity = typeof entities.$inferInsert
export type Award = typeof awards.$inferSelect
export type NewAward = typeof awards.$inferInsert
export type AwardRecipient = typeof awardRecipients.$inferSelect
export type NewAwardRecipient = typeof awardRecipients.$inferInsert

// Redirects for SEO preservation
export const redirects = pgTable('redirects', {
  id: serial('id').primaryKey(),
  sourceUrl: text('source_url').notNull().unique(), // The old URL path (e.g., /old-page)
  destinationUrl: text('destination_url').notNull(), // Where to redirect to (e.g., /new-page)
  statusCode: integer('status_code').default(301), // 301 permanent, 302 temporary, 307, 308
  enabled: boolean('enabled').default(true),
  hitCount: integer('hit_count').default(0), // Track how often this redirect is used
  lastHitAt: timestamp('last_hit_at'),
  notes: text('notes'), // Admin notes about this redirect
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export type Redirect = typeof redirects.$inferSelect
export type NewRedirect = typeof redirects.$inferInsert

// Oakland Tech Week Venue Host Applications
export const venueHosts = pgTable('venue_hosts', {
  id: serial('id').primaryKey(),
  // Contact info
  contactName: text('contact_name').notNull(),
  email: text('email').notNull(),
  phone: text('phone'),
  // Venue info
  venueName: text('venue_name').notNull(),
  address: text('address').notNull(),
  city: text('city').default('Oakland'),
  neighborhood: text('neighborhood'), // e.g., "Downtown", "Temescal", "West Oakland"
  capacity: integer('capacity'), // Max number of people
  spaceType: text('space_type'), // 'gallery', 'office', 'warehouse', 'restaurant', 'outdoor', 'studio', 'other'
  // Availability & amenities
  availability: text('availability'), // Free-form text about when space is available
  amenities: jsonb('amenities').$type<string[]>().default([]), // ['wifi', 'av_equipment', 'parking', 'accessible', 'kitchen', 'outdoor_space']
  // Additional info
  website: text('website'),
  instagramHandle: text('instagram_handle'),
  notes: text('notes'), // Any additional info from the host
  // Admin fields
  status: text('status').default('pending'), // 'pending', 'approved', 'rejected', 'contacted'
  adminNotes: text('admin_notes'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export type VenueHost = typeof venueHosts.$inferSelect
export type NewVenueHost = typeof venueHosts.$inferInsert

// Events (HiiiWAV Fest, Demo Days, community gatherings, etc.)
export const events = pgTable('events', {
  id: serial('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  description: text('description'),
  content: text('content'), // Full markdown content for event page
  coverImage: text('cover_image'),
  eventDate: timestamp('event_date').notNull(), // When the event takes place
  endDate: timestamp('end_date'), // Optional end date for multi-day events
  location: text('location'), // Venue name
  address: text('address'), // Full address
  eventType: text('event_type'), // 'fest', 'demo_day', 'workshop', 'community', 'panel', 'networking'
  registrationUrl: text('registration_url'), // External registration link
  featured: boolean('featured').default(false), // Highlight on homepage
  published: boolean('published').default(false),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export type Event = typeof events.$inferSelect
export type NewEvent = typeof events.$inferInsert

// HiiiLIGHTS Newsletter Archive
export const newsletters = pgTable('newsletters', {
  id: serial('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  subtitle: text('subtitle'), // Optional subtitle/tagline
  excerpt: text('excerpt'), // Short preview text
  foundersNote: text('founders_note'), // Letter from the founder at the top of each issue
  content: text('content').notNull(), // Full HTML/markdown content
  coverImage: text('cover_image'),
  issueNumber: integer('issue_number'), // e.g., Issue #1, #2
  publishedAt: timestamp('published_at').notNull(), // When the newsletter was originally sent
  published: boolean('published').default(true),
  seoTitle: text('seo_title'),
  seoDescription: text('seo_description'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export type Newsletter = typeof newsletters.$inferSelect
export type NewNewsletter = typeof newsletters.$inferInsert

// Deck content version history
export const deckVersions = pgTable('deck_versions', {
  id: serial('id').primaryKey(),
  content: jsonb('content').notNull(), // Full deck content snapshot
  description: text('description'), // "Added foundation slide" or auto-generated
  createdBy: integer('created_by').references(() => users.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export type DeckVersion = typeof deckVersions.$inferSelect
export type NewDeckVersion = typeof deckVersions.$inferInsert




