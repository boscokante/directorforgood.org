# HIIIWAV Website - Next.js Migration

Modern, AI-powered website migrated from WordPress to Next.js 15.

## Tech Stack

- **Next.js 15** (App Router, React Server Components)
- **TypeScript**
- **Tailwind CSS** + shadcn/ui
- **Drizzle ORM** + **Postgres** (Neon/Vercel)
- **NextAuth.js v5** for authentication
- **Vercel AI SDK** (OpenAI/Anthropic)
- **TipTap** rich text editor

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Database

Create a Neon or Vercel Postgres database, then:

```bash
# Copy env example
cp .env.local.example .env.local

# Edit .env.local and add your DATABASE_URL
# Then push the schema
npm run db:push
```

### 3. Import WordPress Content

```bash
# Set WP_BASE if different from default
WP_BASE=https://hiiiwav.org/wp-json/wp/v2 npm run wp:import
```

### 4. Create Admin User

You'll need to manually insert a user or create a signup script. Quick SQL:

```sql
INSERT INTO users (email, name, role, password_hash)
VALUES (
  'admin@hiiiwav.org',
  'Admin',
  'admin',
  -- Run: node -e "console.log(require('bcryptjs').hashSync('your-password', 10))"
  '$2a$10$...'
);
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── (public)/          # Public pages
│   ├── admin/             # Admin dashboard
│   ├── api/               # API routes
│   └── blog/              # Blog pages
├── components/            # React components
│   ├── ui/               # shadcn components
│   ├── admin/            # Admin components
│   └── ai/               # AI components
├── db/                    # Database
│   ├── schema.ts         # Drizzle schema
│   └── index.ts          # DB client
├── lib/                   # Utilities
├── scripts/               # Migration scripts
└── docs/                  # Documentation
```

## Key Features

- ✅ Modern Next.js 15 with App Router
- ✅ Type-safe database with Drizzle ORM
- ✅ Rich text editor (TipTap)
- ✅ AI chat widget (Vercel AI SDK)
- ✅ SEO-optimized (next-seo, sitemap)
- ✅ Admin dashboard for content management
- ✅ One-time WordPress import script

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run db:push` - Push schema to database
- `npm run db:studio` - Open Drizzle Studio
- `npm run wp:import` - Import WordPress content

## Environment Variables

See `.env.local.example` for required variables:

- `DATABASE_URL` - Postgres connection string
- `NEXTAUTH_SECRET` - Auth secret (generate with `openssl rand -base64 32`)
- `OPENAI_API_KEY` - For AI features
- `NEXTAUTH_URL` - Site URL (http://localhost:3000 in dev)

## Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

Vercel will auto-detect Next.js and configure everything.

## Documentation

See `docs/wordpress_to_next.js_migration_plan.md` for the full migration plan.

## License

Private
