# Content Infrastructure Agent

## Your Role
You are responsible for the data layer, content models, and CMS infrastructure for the HiiiWAV website.

## Key Files
- `/lib/types.ts` - TypeScript interfaces (YOU OWN THIS)
- `/db/` - Database schema and migrations
- `/lib/` - Utility functions and data access
- `/app/api/` - API routes for content

## Immediate Tasks

### 1. Set Up Database Schema
Create Drizzle schema matching the TypeScript interfaces in `/lib/types.ts`:
- `funds` table (for HiiiWAV 50)
- `projects` table (OTW, Code Vibes, FEST)
- `joint_ventures` table
- `people` table
- `blog_posts` table
- `events` table
- `leads` table (for AI concierge)

### 2. Create Seed Data
Populate the database with initial data:
- HiiiWAV 50 Fund details
- 3 primary projects (OTW, Code Vibes, FEST)
- 6 Joint Ventures (Choice Scores, Ryan Nicole, Prospect Band, Alphabet Rockers, Sol Affirmations, Soul Slappers)
- Key people/artists

### 3. Build Content API Routes
Create API routes for:
- `GET /api/projects` - List all projects
- `GET /api/projects/[slug]` - Get single project
- `GET /api/joint-ventures` - List all JVs
- `GET /api/joint-ventures/[slug]` - Get single JV
- `GET /api/people` - List people
- `GET /api/blog` - List blog posts

### 4. Set Up MDX Pipeline
Configure MDX for blog posts and rich content:
- Install and configure `@next/mdx` or `contentlayer`
- Create `/content/blog/` directory structure
- Add sample blog posts

## Constraints
- Use Drizzle ORM (already installed)
- Follow interfaces in `/lib/types.ts` exactly
- Don't rename core entities without human approval
- Preserve relationships for RAG and cross-linking

## Dependencies
- None - you can start immediately

## Handoffs
- AI Agent will use your content APIs for RAG
- Ops Agent will use your lead schema
- Pages will fetch from your APIs

## Reference
Always check `/docs/website_plan.md` Section 3.2 for content model specifications.



