# Setup Guide

## Quick Start (5 minutes)

### 1. Database Setup (Neon - Free Tier)

1. Go to [neon.tech](https://neon.tech)
2. Sign up / Login
3. Create new project: "hiiiwav"
4. Copy the connection string

```bash
# Add to .env.local
DATABASE_URL="postgresql://user:pass@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require"
```

### 2. Push Database Schema

```bash
npm run db:push
```

This creates all tables (posts, pages, users, media).

### 3. Generate Auth Secret

```bash
openssl rand -base64 32
```

Add to `.env.local`:

```bash
NEXTAUTH_SECRET="your-generated-secret"
NEXTAUTH_URL="http://localhost:3000"
```

### 4. Import WordPress Content

```bash
# Default: hiiiwav.org
npm run wp:import

# Or specify custom URL
WP_BASE=https://your-site.com/wp-json/wp/v2 npm run wp:import
```

This will:
- Fetch all posts and pages via WP REST API
- Convert HTML to Markdown
- Download metadata
- Insert into Postgres

### 5. Create Admin User

Generate a password hash:

```bash
node -e "console.log(require('bcryptjs').hashSync('YourPassword123', 10))"
```

Insert user via Drizzle Studio or SQL:

```bash
npm run db:studio
```

Or direct SQL:

```sql
INSERT INTO users (email, name, role, password_hash, created_at)
VALUES (
  'admin@hiiiwav.org',
  'Admin',
  'admin',
  '$2a$10$YOUR_GENERATED_HASH',
  NOW()
);
```

### 6. Start Development Server

```bash
npm run dev
```

Visit:
- **Homepage**: http://localhost:3000
- **Blog**: http://localhost:3000/blog
- **Admin**: http://localhost:3000/admin
- **Login**: http://localhost:3000/login

---

## Optional: AI Features

### OpenAI Setup

1. Get API key from [platform.openai.com](https://platform.openai.com)
2. Add to `.env.local`:

```bash
OPENAI_API_KEY="sk-proj-..."
```

The AI chat widget will now work on all pages.

### Test AI Chat

1. Visit homepage
2. Click floating chat button (bottom-right)
3. Ask: "What is HIIIWAV about?"

---

## Optional: Anthropic (Claude)

```bash
ANTHROPIC_API_KEY="sk-ant-..."
```

Then update `app/api/ai/chat/route.ts`:

```ts
import { anthropic } from '@ai-sdk/anthropic'

const result = await streamText({
  model: anthropic('claude-3-5-sonnet-20241022'),
  // ...
})
```

---

## Deployment (Vercel)

### 1. Push to GitHub

```bash
git add .
git commit -m "Initial migration from WordPress"
git push origin main
```

### 2. Import to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Import GitHub repo
3. Vercel auto-detects Next.js

### 3. Add Environment Variables

In Vercel dashboard → Settings → Environment Variables:

```bash
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=...
NEXTAUTH_URL=https://hiiiwav.org
OPENAI_API_KEY=sk-...
```

### 4. Deploy

Click "Deploy". Done!

---

## Database Migrations

When you change `db/schema.ts`:

```bash
# Generate migration
npm run db:generate

# Apply migration
npm run db:migrate

# Or push directly (dev only)
npm run db:push
```

---

## Troubleshooting

### Error: "DATABASE_URL is not set"

Make sure `.env.local` exists and contains `DATABASE_URL`.

### Error: "Invalid credentials" on login

1. Check password hash is correct
2. Check user role is 'admin'
3. Check middleware.ts is not blocking

### Posts not showing

1. Run import script
2. Check `published = true` in database
3. Visit http://localhost:3000/blog

### AI chat not working

1. Check `OPENAI_API_KEY` is set
2. Check you have API credits
3. Check browser console for errors

---

## Next Steps

1. ✅ Customize homepage content
2. ✅ Update site header/footer
3. ✅ Add more pages (About, Contact)
4. ✅ Customize AI chat personality
5. ✅ Add 301 redirects from old WP URLs
6. ✅ Set up analytics (Vercel Analytics)
7. ✅ Test thoroughly
8. ✅ Deploy to production
9. ✅ Update DNS (point to Vercel)
10. ✅ Delete WordPress instance

---

## Support

See the full migration plan in `docs/wordpress_to_next.js_migration_plan.md`.




