# HIIIWAV Infrastructure & Accounts

> Quick reference for all services and accounts needed to manage hiiiwav.org

## Services Overview

| Service | Purpose | Account | Dashboard |
|---------|---------|---------|-----------|
| **Supabase** | Database & Storage | GitHub: `boscokante` | [Dashboard](https://supabase.com/dashboard/project/pzoyeigicwgmmlngxowj) |
| **Vercel** | Hosting & Deployment | _TBD_ | [Dashboard](https://vercel.com/dashboard) |
| **GitHub** | Code Repository | `boscokante` | [Repo](https://github.com/boscokante/hiiiwav-website) |
| **Domain Registrar** | DNS for hiiiwav.org | _TBD_ | _TBD_ |
| **Kinsta** | OLD WordPress (to be decommissioned) | _TBD_ | [Dashboard](https://my.kinsta.com/) |

---

## Supabase

- **Project ID:** `pzoyeigicwgmmlngxowj`
- **Region:** `us-west-2` (Oregon)
- **Login:** GitHub OAuth (`boscokante`)
- **Dashboard:** https://supabase.com/dashboard/project/pzoyeigicwgmmlngxowj

### Resources Used
- [x] PostgreSQL Database
- [ ] Storage (for migrated WordPress images)
- [ ] Auth (if needed later)

### Key URLs
- Database: `aws-0-us-west-2.pooler.supabase.com`
- Storage: `https://pzoyeigicwgmmlngxowj.supabase.co/storage/v1/`

---

## Vercel (Hosting)

- **Account:** `boscokante` (or linked GitHub account)
- **Project Name:** `hiiiwav-website`
- **Preview URL:** https://hiiiwav-website.vercel.app
- **Dashboard:** https://vercel.com/dashboard

### Environment Variables to Set
```
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=...
NEXTAUTH_URL=https://hiiiwav.org
OPENAI_API_KEY=...
NEXT_PUBLIC_SUPABASE_URL=https://pzoyeigicwgmmlngxowj.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

---

## GitHub

- **Account:** `boscokante`
- **Repo:** https://github.com/boscokante/hiiiwav-website
- **Archive Repo:** https://github.com/boscokante/hiiiwav-wordpress-archive

---

## Domain & DNS

- **Domain:** `hiiiwav.org`
- **Registrar:** _TBD (GoDaddy? Namecheap? Cloudflare?)_
- **Current DNS:** Points to Kinsta (WordPress)
- **After Migration:** Will point to Vercel

### DNS Records Needed for Vercel
```
A     @      76.76.21.21
CNAME www    cname.vercel-dns.com
```

---

## Kinsta (WordPress - Legacy)

- **Account:** _TBD_
- **Site Name:** _TBD_
- **Status:** Active (to be decommissioned after Next.js goes live)

### Backup Location
- Static archive: https://github.com/boscokante/hiiiwav-wordpress-archive
- Local WordPress: `/Users/boskombp16/Local Sites/hiiiwav-wordpress-local/`

---

## OpenAI

- **Purpose:** AI chat features on site
- **Account:** _TBD_
- **Dashboard:** https://platform.openai.com/

---

## Other Services (Future)

| Service | Purpose | Status |
|---------|---------|--------|
| Stripe | Donations | _Not set up_ |
| Mailchimp/Resend | Email newsletters | _Not set up_ |
| Google Analytics | Analytics | _Not set up_ |
| Cloudflare | CDN/WAF (optional) | _Not set up_ |

---

## Local Development

### Required Tools
- Node.js 18+
- npm or pnpm
- Local by Flywheel (for WordPress archive)

### Quick Start
```bash
git clone https://github.com/boscokante/hiiiwav-website.git
cd hiiiwav-website
npm install
cp .env.example .env.local  # Then fill in values
npm run dev
```

---

## Migration Checklist

- [x] WordPress content imported to Supabase
- [x] WordPress site archived (static + Local)
- [ ] Images migrated to Supabase Storage
- [ ] Site deployed to Vercel
- [ ] Domain pointed to Vercel
- [ ] 301 redirects tested
- [ ] Kinsta WordPress decommissioned

---

_Last updated: December 2024_

