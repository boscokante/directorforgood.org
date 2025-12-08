# Dev Studio

A centralized development environment for managing multiple projects using a single **Supabase** instance and **Vercel** account. This eliminates redundant setup and consolidates billing across all your apps.

---

## Why Dev Studio?

Instead of creating separate Supabase projects and Vercel deployments for every app idea:

- **One Supabase project** → Multiple apps share the same database, separated by **schemas**
- **One Vercel account** → All apps deploy under the same billing, with automatic preview URLs
- **Shared infrastructure** → Auth, storage, and edge functions can be reused across projects
- **No per-project fees** → Supabase free tier limits apply to the whole project, not per-schema

---

## Architecture

```
dev-studio (Supabase Project)
├── core/              # Shared tables (users, settings, etc.)
├── chatbot_app/       # Chatbot-specific tables
├── crm_agent/         # CRM/Agent tables
├── sites/             # Website projects (subscribers, pages, etc.)
└── experiments/       # Quick experiments and prototypes
```

Each app is a **separate GitHub repo** that connects to the same Supabase project but uses its own schema.

---

## Quick Reference

### Supabase Connection

All apps use these environment variables (values stored in `.env.local`, never committed):

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...  # Server-only, never expose to browser
```

### Schema-Qualified Queries

Apps access their data using schema-prefixed table names:

```ts
// Chatbot app
const { data } = await supabase.from('chatbot_app.sessions').select('*');

// CRM app
const { data } = await supabase.from('crm_agent.contacts').select('*');

// Website project
const { data } = await supabase.from('sites.subscribers').select('*');
```

---

## Creating a New Project

### For AI Assistants

When starting a new project that uses Dev Studio infrastructure:

1. **Create a new GitHub repo** for the project (don't add to this repo)
2. **Use Next.js** with App Router as the framework
3. **Connect to the existing Supabase project** using the env vars above
4. **Create a new schema** for the project's tables:
   ```sql
   CREATE SCHEMA IF NOT EXISTS new_project_name;
   ```
5. **Deploy to Vercel** under the existing account
6. **Use preview deployments** for collaboration (each branch/PR gets a unique URL)

### Step-by-Step: New Next.js Project

```bash
# 1. Create the project
npx create-next-app@latest my-new-app --typescript --tailwind --app --src-dir

# 2. Install Supabase
cd my-new-app
npm install @supabase/supabase-js @supabase/ssr

# 3. Create .env.local with the dev-studio Supabase credentials
# (copy from dev-studio or password manager)

# 4. Create the Supabase client
mkdir -p src/lib
```

#### `src/lib/supabase.ts`

```ts
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
```

#### For Server Components (App Router)

```ts
// src/lib/supabase-server.ts
import { createClient } from '@supabase/supabase-js';

export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);
```

### Step-by-Step: Database Schema

Run in Supabase SQL Editor:

```sql
-- Create schema for new project
CREATE SCHEMA IF NOT EXISTS my_new_app;

-- Example: Create tables in that schema
CREATE TABLE my_new_app.items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE my_new_app.items ENABLE ROW LEVEL SECURITY;

-- Example policy (adjust for your auth needs)
CREATE POLICY "Public read access" ON my_new_app.items
  FOR SELECT USING (true);
```

### Vercel Deployment

1. Push repo to GitHub
2. Import to Vercel (uses existing account)
3. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
4. Every push to `main` → production deploy
5. Every PR/branch → preview deploy with unique URL

---

## Collaboration Workflow

### Sharing Draft Sites with Collaborators

Vercel preview deployments are perfect for design/dev collaboration:

1. **Create a branch** for the feature/version
2. **Push to GitHub** → Vercel auto-deploys to `your-project-abc123.vercel.app`
3. **Share the preview URL** with designer/developer
4. Each new push updates the same preview URL
5. Different branches = different preview URLs for comparing versions

### Optional: Password Protection

For sensitive drafts, add basic auth middleware:

```ts
// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  
  if (!authHeader) {
    return new NextResponse('Authentication required', {
      status: 401,
      headers: { 'WWW-Authenticate': 'Basic realm="Secure Area"' },
    });
  }

  const [, credentials] = authHeader.split(' ');
  const [user, pass] = atob(credentials).split(':');

  if (user === process.env.PREVIEW_USER && pass === process.env.PREVIEW_PASS) {
    return NextResponse.next();
  }

  return new NextResponse('Invalid credentials', { status: 401 });
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
```

---

## Existing Schemas

| Schema | Purpose | Status |
|--------|---------|--------|
| `core` | Shared users, settings | Planned |
| `chatbot_app` | Chatbot sessions & messages | Planned |
| `crm_agent` | CRM contacts & interactions | Planned |
| `sites` | Website projects | Planned |
| `experiments` | Quick prototypes | Planned |

---

## Project Checklist

When creating a new project using Dev Studio:

- [ ] Create new GitHub repo
- [ ] Initialize Next.js with TypeScript + Tailwind
- [ ] Install `@supabase/supabase-js` and `@supabase/ssr`
- [ ] Copy `.env.local` credentials from dev-studio
- [ ] Create new schema in Supabase: `CREATE SCHEMA IF NOT EXISTS project_name;`
- [ ] Create tables in that schema
- [ ] Set up RLS policies
- [ ] Import to Vercel
- [ ] Add env vars to Vercel
- [ ] Test preview deployments

---

## File Structure for New Projects

```
my-new-app/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── api/
│   ├── components/
│   ├── lib/
│   │   ├── supabase.ts        # Browser client
│   │   └── supabase-server.ts # Server client (service role)
│   └── types/
│       └── database.ts        # Generated types from Supabase
├── .env.local                 # Supabase credentials (never commit)
├── .gitignore
└── package.json
```

---

## Generating TypeScript Types

For type-safe Supabase queries:

```bash
# Install Supabase CLI
npm install -D supabase

# Login and generate types
npx supabase login
npx supabase gen types typescript --project-id YOUR_PROJECT_ID > src/types/database.ts
```

Then use with your client:

```ts
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';

export const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
```

---

## Notes

- **This repo (`dev-studio`)** is for documentation and SQL migrations only
- **Actual apps** live in their own repos
- **Supabase migrations** can be stored in `supabase/migrations/` here for version control
- **Never commit** `.env.local` or any files containing API keys

