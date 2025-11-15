# WordPress to Next.js Migration Plan
## HIIIWAV.org → Dynamic Next.js App with AI Features

**Last Updated:** November 15, 2025  
**Domain:** hiiiwav.org  
**Goal:** Migrate from WordPress to a modern, AI-powered Next.js application that's easy to iterate on with Cursor/Lovable

---

## Architecture Decision

### ❌ NOT Using (and Why)
- **Static MDX/Contentlayer** - Too limiting for interactive features and AI integration
- **Headless WordPress** - Vendor lock-in, can't easily add custom AI features, monthly costs
- **External CMS (Sanity/Contentful)** - Vendor lock-in, harder to iterate with Cursor, unnecessary complexity

### ✅ USING: Dynamic Next.js + Postgres + Custom Admin
**Why:** Full control, type-safe, Cursor/Lovable can iterate fast, integrate AI anywhere, zero vendor lock-in, cheap to run

---

## Tech Stack

### Core Framework
- **Next.js 15** (App Router, React Server Components)
- **React 19**
- **TypeScript** (strict mode)
- **Tailwind CSS** + **shadcn/ui** (copy-paste components, full control)

### Database & ORM
- **Postgres** (Neon free tier or Vercel Postgres)
- **Drizzle ORM** (type-safe, migrations in code, excellent Cursor autocomplete)

### Authentication
- **NextAuth.js v5 (Auth.js)** for admin login
- Support for email/password + OAuth providers

### Content Management
- **Custom-built admin dashboard** (no external CMS)
- **TipTap** or **Lexical** for rich text editing (React-based, extensible)
- **React Hook Form** + **Zod** for type-safe forms

### AI Features
- **Vercel AI SDK** (streaming, RSC-compatible)
- **OpenAI** (GPT-4o) or **Anthropic** (Claude)
- Use cases:
  - Chat widget (context-aware assistant)
  - Content generation (meta descriptions, summaries)
  - AI-powered search
  - Content suggestions/autocomplete in editor

### Media Storage
- **Uploadthing** or **Vercel Blob** (S3-compatible)
- Direct client uploads
- One-time migration of WordPress media

### Deployment
- **Vercel** (serverless + edge runtime)
- Preview branches for staging
- Environment variables for secrets

### Additional Tools
- **next-seo** - SEO meta tags
- **next-sitemap** - Automatic sitemap generation
- **Vercel Analytics** + **GA4** - Traffic tracking
- **Sentry** - Error monitoring (optional)

---

## Database Schema (Drizzle)

```typescript
// db/schema.ts
import { pgTable, text, timestamp, boolean, serial, jsonb } from 'drizzle-orm/pg-core'

export const posts = pgTable('posts', {
  id: serial('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  excerpt: text('excerpt'),
  content: text('content').notNull(),       // HTML or Markdown
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
  role: text('role').default('user'),  // 'admin' | 'user'
  image: text('image'),
  passwordHash: text('password_hash'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const media = pgTable('media', {
  id: serial('id').primaryKey(),
  filename: text('filename').notNull(),
  url: text('url').notNull(),
  mimeType: text('mime_type'),
  size: serial('size'),
  altText: text('alt_text'),
  uploadedBy: serial('uploaded_by').references(() => users.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})
```

---

## Project Structure

```
hiiiwav-website/
├── app/
│   ├── (public)/              # Public-facing routes
│   │   ├── page.tsx           # Homepage
│   │   ├── about/page.tsx
│   │   └── [slug]/page.tsx    # Dynamic pages
│   ├── blog/
│   │   ├── page.tsx           # Blog index
│   │   └── [slug]/page.tsx    # Blog post
│   ├── admin/                 # Protected admin routes
│   │   ├── layout.tsx         # Admin layout + auth check
│   │   ├── dashboard/page.tsx
│   │   ├── posts/
│   │   │   ├── page.tsx       # Posts list
│   │   │   ├── new/page.tsx   # Create post
│   │   │   └── [id]/page.tsx  # Edit post
│   │   └── pages/
│   │       ├── page.tsx
│   │       ├── new/page.tsx
│   │       └── [id]/page.tsx
│   ├── api/
│   │   ├── ai/
│   │   │   ├── chat/route.ts      # AI chat endpoint
│   │   │   ├── generate/route.ts  # Content generation
│   │   │   └── summarize/route.ts
│   │   ├── auth/[...nextauth]/route.ts
│   │   └── upload/route.ts
│   ├── login/page.tsx
│   └── layout.tsx             # Root layout
├── components/
│   ├── ui/                    # shadcn components
│   ├── admin/
│   │   ├── post-editor.tsx    # TipTap editor
│   │   ├── post-form.tsx
│   │   └── media-picker.tsx
│   ├── blog/
│   │   ├── post-card.tsx
│   │   └── post-list.tsx
│   ├── ai/
│   │   └── chat-widget.tsx    # Floating chat bubble
│   ├── site-header.tsx
│   ├── site-footer.tsx
│   └── seo-head.tsx
├── db/
│   ├── index.ts               # Drizzle client
│   ├── schema.ts              # Tables
│   └── migrations/            # SQL migrations
├── lib/
│   ├── auth.ts                # NextAuth config
│   ├── seo.ts                 # SEO helpers
│   └── utils.ts
├── scripts/
│   ├── import-wp-to-db.ts     # One-time WP migration
│   └── download-wp-media.ts   # Download all WP uploads
├── public/
│   └── uploads/               # Migrated media (or use Blob)
├── docs/
│   └── wordpress_to_next.js_migration_plan.md  # This file
├── drizzle.config.ts
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## Migration Strategy

### Phase 1: Foundation (Week 1)
**Status:** Pending

1. **Scaffold Next.js project**
   ```bash
   npx create-next-app@latest . --ts --app --tailwind --eslint --src-dir=false --import-alias "@/*"
   ```

2. **Install dependencies**
   ```bash
   pnpm add drizzle-orm postgres @neondatabase/serverless
   pnpm add next-auth@beta zod react-hook-form @hookform/resolvers
   pnpm add @tiptap/react @tiptap/starter-kit
   pnpm add ai @ai-sdk/openai @ai-sdk/anthropic
   pnpm add uploadthing @uploadthing/react
   pnpm add next-seo next-sitemap
   pnpm add -D drizzle-kit tsx @types/node
   ```

3. **Set up Drizzle + Postgres**
   - Create Neon database
   - Configure `drizzle.config.ts`
   - Create schema in `db/schema.ts`
   - Run migrations: `pnpm drizzle-kit push`

4. **Set up NextAuth**
   - Configure providers (email/password, Google OAuth)
   - Add session middleware
   - Create protected admin routes

5. **Add shadcn/ui components**
   ```bash
   pnpm dlx shadcn-ui@latest init
   pnpm dlx shadcn-ui@latest add button input form table card dialog
   ```

### Phase 2: Content Migration (Week 1-2)
**Status:** Pending

1. **Write WP → Postgres import script**
   - Fetch all posts via WP REST API (`/wp-json/wp/v2/posts`)
   - Fetch all pages
   - Convert HTML to Markdown (use `turndown`)
   - Insert into Postgres via Drizzle

2. **Download WordPress media**
   - Scrape `/wp-content/uploads/**`
   - Upload to Uploadthing or Vercel Blob
   - Update image URLs in content

3. **Generate 301 redirects**
   - Map old WP URLs to new Next.js routes
   - Add to `next.config.ts` redirects array

### Phase 3: Admin UI (Week 2)
**Status:** Pending

1. **Build admin dashboard**
   - `/admin/dashboard` - Overview stats
   - `/admin/posts` - Posts table with edit/delete
   - `/admin/posts/new` - Create new post
   - `/admin/posts/[id]` - Edit post

2. **Implement TipTap editor**
   - Rich text editing
   - Image uploads
   - Markdown shortcuts
   - AI autocomplete (future enhancement)

3. **Add forms**
   - React Hook Form + Zod validation
   - Server Actions for mutations
   - Toast notifications

### Phase 4: Public Frontend (Week 2-3)
**Status:** Pending

1. **Build public pages**
   - Homepage (`/`)
   - About, Contact, etc. (`/[slug]`)
   - Blog index (`/blog`)
   - Blog posts (`/blog/[slug]`)

2. **Implement SEO**
   - Dynamic meta tags
   - OpenGraph images
   - Sitemap generation
   - Robots.txt

3. **Add site chrome**
   - Header with navigation
   - Footer
   - Mobile menu
   - Theme toggle (dark mode)

### Phase 5: AI Features (Week 3-4)
**Status:** Pending

1. **Chat widget**
   - Floating bubble (bottom-right)
   - Context-aware (current page content)
   - Streaming responses
   - Chat history

2. **Content AI tools**
   - Generate SEO meta descriptions
   - Summarize posts
   - Suggest tags
   - Autocomplete in editor

3. **AI-powered search**
   - Vector embeddings (OpenAI)
   - Semantic search over content

### Phase 6: Testing & Launch (Week 4)
**Status:** Pending

1. **QA checklist**
   - [ ] All WP content migrated
   - [ ] URLs redirect correctly
   - [ ] SEO meta tags correct
   - [ ] Images load (no broken links)
   - [ ] Forms work (contact, newsletter)
   - [ ] Admin CRUD works
   - [ ] Mobile responsive
   - [ ] Lighthouse score >90
   - [ ] Security audit (OWASP)

2. **Deploy to Vercel**
   - Connect GitHub repo
   - Set environment variables
   - Preview deployment
   - Custom domain (hiiiwav.org)

3. **DNS cutover**
   - Update A/CNAME records
   - Monitor 404s
   - Set up error tracking (Sentry)

4. **Post-launch**
   - Monitor analytics
   - Fix any issues
   - Delete WordPress instance

---

## Environment Variables

```bash
# .env.local (DO NOT COMMIT)

# Database
DATABASE_URL="postgresql://..."

# NextAuth
NEXTAUTH_SECRET="..."
NEXTAUTH_URL="http://localhost:3000"

# OAuth (optional)
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."

# AI
OPENAI_API_KEY="sk-..."
ANTHROPIC_API_KEY="sk-ant-..."

# Media Upload
UPLOADTHING_SECRET="..."
UPLOADTHING_APP_ID="..."

# Analytics (optional)
NEXT_PUBLIC_GA_ID="G-..."

# Email (optional)
RESEND_API_KEY="..."
```

---

## Key Implementation Examples

### Admin Post Editor

```tsx
// app/admin/posts/[id]/page.tsx
import { db } from '@/db'
import { posts } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { PostEditor } from '@/components/admin/post-editor'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function EditPostPage({ params }: { params: { id: string } }) {
  const session = await auth()
  if (!session || session.user.role !== 'admin') redirect('/login')
  
  const post = await db.select().from(posts).where(eq(posts.id, parseInt(params.id))).get()
  if (!post) notFound()
  
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-4">Edit Post</h1>
      <PostEditor post={post} />
    </div>
  )
}
```

### AI Chat Widget

```tsx
// components/ai/chat-widget.tsx
'use client'
import { useChat } from 'ai/react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { MessageCircle, X } from 'lucide-react'

export function ChatWidget() {
  const [open, setOpen] = useState(false)
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/ai/chat',
  })
  
  return (
    <div className="fixed bottom-4 right-4 z-50">
      {open ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl w-96 h-[600px] flex flex-col">
          <div className="p-4 border-b flex justify-between items-center">
            <h3 className="font-semibold">Chat with HIIIWAV</h3>
            <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map(m => (
              <div key={m.id} className={m.role === 'user' ? 'text-right' : 'text-left'}>
                <div className={`inline-block p-3 rounded-lg ${
                  m.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-gray-700'
                }`}>
                  {m.content}
                </div>
              </div>
            ))}
            {isLoading && <div className="text-gray-500">Thinking...</div>}
          </div>
          
          <form onSubmit={handleSubmit} className="p-4 border-t">
            <input
              value={input}
              onChange={handleInputChange}
              placeholder="Ask me anything..."
              className="w-full p-2 border rounded-lg"
            />
          </form>
        </div>
      ) : (
        <Button
          size="lg"
          className="rounded-full shadow-lg"
          onClick={() => setOpen(true)}
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}
    </div>
  )
}
```

### AI API Route

```typescript
// app/api/ai/chat/route.ts
import { openai } from '@ai-sdk/openai'
import { streamText } from 'ai'

export const runtime = 'edge'

export async function POST(req: Request) {
  const { messages } = await req.json()
  
  const result = await streamText({
    model: openai('gpt-4o'),
    messages,
    system: `You are a helpful assistant for HIIIWAV.org. 
    Answer questions about the site content, help users navigate, 
    and provide thoughtful responses based on context.`,
    temperature: 0.7,
    maxTokens: 500,
  })
  
  return result.toDataStreamResponse()
}
```

### WordPress Import Script

```typescript
// scripts/import-wp-to-db.ts
import { db } from '../db'
import { posts, pages } from '../db/schema'
import TurndownService from 'turndown'
import { gfm } from 'turndown-plugin-gfm'

const WP_BASE = 'https://hiiiwav.org/wp-json/wp/v2'
const td = new TurndownService({ headingStyle: 'atx', codeBlockStyle: 'fenced' })
td.use(gfm)

async function fetchAll(endpoint: string) {
  const items: any[] = []
  let page = 1
  
  for (;;) {
    const res = await fetch(`${WP_BASE}/${endpoint}?per_page=100&page=${page}`)
    if (!res.ok) break
    const data = await res.json()
    if (!Array.isArray(data) || data.length === 0) break
    items.push(...data)
    page++
  }
  
  return items
}

async function importPosts() {
  console.log('Fetching WordPress posts...')
  const wpPosts = await fetchAll('posts')
  console.log(`Found ${wpPosts.length} posts`)
  
  for (const p of wpPosts) {
    const content = td.turndown(p.content?.rendered ?? '')
    const excerpt = p.excerpt?.rendered ? td.turndown(p.excerpt.rendered) : ''
    
    await db.insert(posts).values({
      slug: p.slug,
      title: p.title?.rendered ?? 'Untitled',
      excerpt,
      content,
      coverImage: p.jetpack_featured_media_url || p.featured_media_src_url || null,
      tags: Array.isArray(p.tags) ? p.tags.map(String) : [],
      published: p.status === 'publish',
      canonical: p.link,
      createdAt: new Date(p.date),
      updatedAt: new Date(p.modified),
    }).onConflictDoNothing()
    
    console.log(`✓ Imported: ${p.title?.rendered}`)
  }
}

async function importPages() {
  console.log('Fetching WordPress pages...')
  const wpPages = await fetchAll('pages')
  console.log(`Found ${wpPages.length} pages`)
  
  for (const pg of wpPages) {
    const content = td.turndown(pg.content?.rendered ?? '')
    
    await db.insert(pages).values({
      slug: pg.slug,
      title: pg.title?.rendered ?? 'Untitled',
      content,
      canonical: pg.link,
      createdAt: new Date(pg.date),
      updatedAt: new Date(pg.modified),
    }).onConflictDoNothing()
    
    console.log(`✓ Imported: ${pg.title?.rendered}`)
  }
}

async function main() {
  try {
    await importPosts()
    await importPages()
    console.log('✅ Import complete!')
  } catch (error) {
    console.error('❌ Import failed:', error)
    process.exit(1)
  }
}

main()
```

Run with:
```bash
pnpm tsx scripts/import-wp-to-db.ts
```

---

## SEO Preservation Checklist

- [ ] All old URLs redirect via `next.config.ts` redirects
- [ ] Meta titles match WP (or improve them)
- [ ] Meta descriptions preserved
- [ ] OpenGraph images migrated
- [ ] Canonical URLs set correctly
- [ ] Sitemap generated at `/sitemap.xml`
- [ ] Robots.txt configured
- [ ] Structured data (JSON-LD) for articles
- [ ] Image alt tags preserved
- [ ] Internal links updated to new URLs

---

## Performance Targets

- **Lighthouse Score:** >90 (all metrics)
- **First Contentful Paint:** <1.5s
- **Time to Interactive:** <3s
- **Cumulative Layout Shift:** <0.1
- **Total Blocking Time:** <200ms

### Optimization Strategies
- Use `next/image` for automatic image optimization
- Enable ISR (Incremental Static Regeneration) for blog posts
- Lazy load components below the fold
- Minimize client-side JavaScript
- Use edge runtime for API routes where possible
- Enable Vercel Analytics for real-time monitoring

---

## Security Checklist

- [ ] Environment variables never committed
- [ ] Admin routes protected with middleware
- [ ] SQL injection prevention (Drizzle parameterized queries)
- [ ] XSS prevention (React auto-escapes, sanitize user HTML)
- [ ] CSRF protection (NextAuth built-in)
- [ ] Rate limiting on API routes (Vercel KV)
- [ ] Content Security Policy headers
- [ ] HTTPS only (Vercel enforces)
- [ ] Secure cookies (httpOnly, secure, sameSite)

---

## Cost Estimate (Monthly)

| Service | Tier | Cost |
|---------|------|------|
| Vercel | Hobby | $0 (or Pro $20) |
| Neon Postgres | Free | $0 (0.5GB, 3 branches) |
| Uploadthing | Free | $0 (2GB) |
| OpenAI API | Pay-as-you-go | ~$5-20 |
| Domain | N/A | ~$12/year |
| **Total** | | **~$5-20/month** |

---

## Why This Architecture Wins for Cursor/Lovable

1. **Type Safety Everywhere**
   - Drizzle gives full TypeScript types from DB to UI
   - Zod validates forms + API inputs
   - Cursor autocomplete works perfectly

2. **No Black Boxes**
   - You own all the code (no CMS vendor magic)
   - Easy to trace bugs, add features, customize

3. **AI-Native**
   - Vercel AI SDK integrates seamlessly
   - Can add AI anywhere (editor, search, chat, content gen)
   - Streaming responses out of the box

4. **Component-First**
   - shadcn/ui = copy-paste, not npm packages
   - Modify any component freely
   - Cursor can generate new components easily

5. **Modern DX**
   - Hot reload works great
   - Server Actions for mutations (no API boilerplate)
   - RSCs for performance + SEO

---

## Next Steps

1. ✅ Review this plan
2. [ ] Scaffold project (run `create-next-app`)
3. [ ] Set up Neon database
4. [ ] Run WP import script
5. [ ] Build admin UI
6. [ ] Add public frontend
7. [ ] Implement AI features
8. [ ] Deploy to Vercel
9. [ ] DNS cutover

---

## Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Drizzle ORM](https://orm.drizzle.team)
- [NextAuth.js v5](https://authjs.dev)
- [Vercel AI SDK](https://sdk.vercel.ai/docs)
- [TipTap](https://tiptap.dev)
- [shadcn/ui](https://ui.shadcn.com)
- [Uploadthing](https://uploadthing.com)

---

**Plan Created:** November 15, 2025  
**Author:** Migration Planning Assistant  
**Status:** Ready to Execute

