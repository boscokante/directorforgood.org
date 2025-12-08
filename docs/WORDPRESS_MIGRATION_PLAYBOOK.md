# WordPress to Next.js Migration Playbook

> Step-by-step guide for migrating WordPress sites to Next.js with Supabase  
> **Status:** In Progress | **Last Updated:** December 7, 2024

---

## Overview

This playbook documents the complete process of migrating a WordPress site to a modern Next.js stack. It's designed to be repeatable for future WordPress → Next.js migrations.

### Tech Stack
- **Frontend:** Next.js 15 (App Router)
- **Database:** Supabase (PostgreSQL)
- **Storage:** Supabase Storage
- **Hosting:** Vercel
- **ORM:** Drizzle

---

## Pre-Migration Checklist

- [x] Access to WordPress admin
- [x] Access to WordPress hosting (Kinsta, WP Engine, etc.)
- [x] Domain registrar access
- [x] Supabase account created
- [x] Vercel account created
- [x] Local development environment set up

---

## Phase 1: Backup & Archive ✅

### 1.1 Create Static Archive
```bash
# Mirror the entire WordPress site as static HTML
wget --mirror --convert-links --adjust-extension --page-requisites \
  --no-parent --reject "xmlrpc.php,wp-login.php,wp-admin/*" \
  -e robots=off https://your-site.com/

# Commit to a separate repo for safekeeping
git init
git add -A
git commit -m "WordPress archive - $(date +%Y-%m-%d)"
git remote add origin https://github.com/you/site-wordpress-archive.git
git push -u origin main
```

**Automation opportunity:** Script that takes a domain and creates the archive repo automatically.

### 1.2 Export URL List for Redirects
```bash
# Extract all URLs from the mirrored site
find site.com -name "*.html" | sed 's|site.com||' | sed 's|/index.html||' | sort -u > url_list.txt
```

### 1.3 Download Full Backup from Host
- Export database (`.sql` file)
- Download `wp-content` folder
- Store in local WordPress environment (Local by Flywheel)

**Completed:** 
- Static archive: `hiiiwav-wordpress-archive` repo
- Local WordPress: `/Users/boskombp16/Local Sites/hiiiwav-wordpress-local/`

---

## Phase 2: Database Setup ✅

### 2.1 Create Supabase Project
1. Go to https://supabase.com/dashboard
2. Create new project
3. Note the project ID and region

**Project details:**
- ID: `pzoyeigicwgmmlngxowj`
- Region: `us-west-2`

### 2.2 Configure Environment
```bash
# .env.local
DATABASE_URL="postgresql://postgres.[project-id]:[password]@aws-0-us-west-2.pooler.supabase.com:5432/postgres"
```

### 2.3 Push Schema
```bash
npm run db:push
```

**Automation opportunity:** CLI tool that creates Supabase project and configures env vars automatically.

---

## Phase 3: Content Migration ✅

### 3.1 Import Posts & Pages
```bash
# Fetches all content via WordPress REST API
WP_BASE=https://your-site.com/wp-json/wp/v2 npm run wp:import
```

**What gets imported:**
- Posts → `posts` table (title, content, excerpt, cover image URL, tags, SEO fields)
- Pages → `pages` table (title, content, SEO fields)

**Content is converted:**
- HTML → Markdown (via Turndown)
- Dates preserved
- Slugs sanitized

**Completed:** 21 posts, 29 pages imported

### 3.2 Verify Import
```bash
npx tsx scripts/check-db-content.ts
```

---

## Phase 4: Image Migration ✅ COMPLETE

### 4.1 Create Storage Bucket
1. Go to Supabase Dashboard → Storage
2. Create bucket named `uploads`
3. Set to **Public**

### 4.2 Add Storage Credentials
```bash
# Add to .env.local
NEXT_PUBLIC_SUPABASE_URL="https://[project-id].supabase.co"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"  # Needed for uploads (bypasses RLS)
```

### 4.3 Run Image Migration
```bash
npm run wp:migrate-images
```

**What this does:**
1. Scans database for all `hiiiwav.org/wp-content/uploads/` URLs
2. Finds corresponding files in local WordPress installation
3. Uploads to Supabase Storage
4. Updates all URLs in database

**Completed: December 7, 2024**
- Images uploaded: 356 ✅
- Failed: 1 (special character in filename)
- Posts updated: 20
- Pages updated: 22
- Storage URL: `https://pzoyeigicwgmmlngxowj.supabase.co/storage/v1/object/public/uploads/`

### 4.4 Automation Opportunity: Auto-Create Storage Bucket

```typescript
// Future: scripts/setup-supabase-storage.ts
import { createClient } from '@supabase/supabase-js'

async function setupStorage() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY! // Need service role for admin ops
  )
  
  // Create uploads bucket if it doesn't exist
  const { data: buckets } = await supabase.storage.listBuckets()
  
  if (!buckets?.find(b => b.name === 'uploads')) {
    await supabase.storage.createBucket('uploads', {
      public: true,
      fileSizeLimit: 52428800, // 50MB
      allowedMimeTypes: ['image/*', 'video/*', 'application/pdf']
    })
    console.log('✓ Created uploads bucket')
  }
}
```

**Full automation would:**
1. Check if bucket exists
2. Create if not
3. Set public access policies
4. Return bucket URL for env config

---

## Phase 5: Redirects ✅

### 5.1 Create Redirect Map
```bash
# Generated: public/_redirects (Netlify format)
# Also works with Vercel via vercel.json or middleware
```

### 5.2 Redirect Strategy

| Old Pattern | New Destination | Status |
|-------------|-----------------|--------|
| `/blog-post-slug` | `/blog` | 301 |
| `/fest`, `/hiiiwav-fest` | `/projects/hiiiwav-fest` | 301 |
| `/afro-ai-*` | `/projects/afro-ai` | 301 |
| `/cart`, `/checkout`, `/shop` | `/` | 410 (Gone) |
| `/wp-admin/*` | `/` | 410 |

### 5.3 Test Redirects
After deployment, verify:
```bash
curl -I https://hiiiwav.org/fest
# Should return: HTTP/2 301, Location: /projects/hiiiwav-fest
```

---

## Phase 6: Deployment ✅ COMPLETE

### 6.1 Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
```

**Completed: December 2024**
- Preview URL: https://hiiiwav-website.vercel.app
- Status: Live on preview, ready for domain

### 6.2 Environment Variables for Production
```
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=...
NEXTAUTH_URL=https://hiiiwav.org
OPENAI_API_KEY=...
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SITE_URL=https://hiiiwav.org
```

### 6.3 Connect Domain
1. In Vercel: Add custom domain `hiiiwav.org`
2. In DNS: Update records to point to Vercel
   ```
   A     @      76.76.21.21
   CNAME www    cname.vercel-dns.com
   ```

---

## Phase 7: Go Live ⏳ PENDING

### 7.1 Pre-Launch Checklist
- [x] All images loading from Supabase ✅ (verified Dec 7, 2024)
- [ ] All pages rendering correctly ← **IN PROGRESS**
- [ ] UI/UX matches design expectations
- [x] Redirects configured (`public/_redirects`)
- [ ] Forms working (contact, newsletter)
- [ ] SEO meta tags correct
- [x] Sitemap generated (`public/sitemap.xml`)
- [ ] Analytics connected

### 7.2 DNS Cutover
1. Lower TTL to 300 (5 min) 24 hours before
2. Update DNS records
3. Monitor for errors
4. Verify SSL certificate

### 7.3 Post-Launch
- [ ] Test all redirects with real traffic
- [ ] Monitor 404 errors in Vercel
- [ ] Check Google Search Console for issues
- [ ] Decommission WordPress hosting (after 30 days)

---

## Automation Roadmap

### Current Scripts
| Script | Purpose | Status |
|--------|---------|--------|
| `npm run wp:import` | Import posts/pages via REST API | ✅ |
| `npm run wp:migrate-images` | Upload images to Supabase | ✅ |
| `scripts/check-db-content.ts` | Verify imported content | ✅ |

### Future Automation
| Script | Purpose | Priority |
|--------|---------|----------|
| `setup-supabase-storage.ts` | Auto-create storage bucket | High |
| `generate-redirects.ts` | Auto-generate redirect map from URL list | High |
| `migrate-all.ts` | Single command for full migration | Medium |
| `verify-migration.ts` | Check all images load, redirects work | Medium |
| `create-project.ts` | Scaffold new Next.js project from WordPress | Low |

### Ideal Future Flow
```bash
# One-command migration
npx wp-to-nextjs migrate https://wordpress-site.com \
  --supabase-project=xxx \
  --vercel-team=xxx \
  --domain=new-domain.com
```

---

## Troubleshooting

### Images Not Loading
1. Check Supabase Storage bucket is public
2. Verify URLs in database point to Supabase, not WordPress
3. Check browser console for CORS errors

### Redirects Not Working
1. Verify `_redirects` file is in `public/` folder
2. For Vercel, may need `vercel.json` or middleware instead
3. Check redirect syntax (spaces, not tabs)

### Database Connection Issues
1. Check `DATABASE_URL` is correct
2. Verify IP is allowed in Supabase (or use pooler URL)
3. Check SSL mode if required

---

## Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Vercel Docs](https://vercel.com/docs)
- [Drizzle ORM](https://orm.drizzle.team/)

---

## Project-Specific Notes

### HIIIWAV Migration
- **Source:** hiiiwav.org (WordPress on Kinsta)
- **Destination:** hiiiwav.org (Next.js on Vercel)
- **Local archive:** `/Users/boskombp16/Local Sites/hiiiwav-wordpress-local/`
- **GitHub archive:** `boscokante/hiiiwav-wordpress-archive`

### Special Considerations
- Elementor page builder content converted to Markdown (some formatting lost)
- WooCommerce pages removed (cart, checkout, shop)
- Newsletter signup needs new implementation
- Donation pages link to external service

---

_This playbook is a living document. Update after each migration to capture lessons learned._

