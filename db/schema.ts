import { pgTable, text, timestamp, boolean, serial, jsonb, integer, date } from 'drizzle-orm/pg-core'

export const posts = pgTable('posts', {
  id: serial('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  excerpt: text('excerpt'),
  content: text('content').notNull(),
  coverImage: text('cover_image'),
  tags: jsonb('tags').$type<string[]>().default([]),
  published: boolean('published').default(false),
  seoTitle: text('seo_title'),
  seoDescription: text('seo_description'),
  canonical: text('canonical'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export const pages = pgTable('pages', {
  id: serial('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  seoTitle: text('seo_title'),
  seoDescription: text('seo_description'),
  canonical: text('canonical'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

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

export type Post = typeof posts.$inferSelect
export type NewPost = typeof posts.$inferInsert
export type Page = typeof pages.$inferSelect
export type NewPage = typeof pages.$inferInsert
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




