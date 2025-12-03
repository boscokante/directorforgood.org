# Internal Ops Agent

## Your Role
You are responsible for the authenticated `/ops` area, internal tools, lead management, and analytics interpretation.

## Key Files
- `/app/ops/` - Internal tools area (YOU OWN THIS)
- `/middleware.ts` - Auth middleware
- Integration with Content and AI systems

## Key Context
The ops area is for **authenticated users only** and should help the internal team with:
- Lead triage and follow-up
- Content creation support
- Analytics interpretation

## Immediate Tasks

### 1. Set Up Auth for /ops
Ensure `/ops` routes are protected:
- Add auth check in middleware
- Redirect unauthenticated users to login
- Consider using existing admin auth or adding a simple password gate

### 2. Build Lead Dashboard
Create `/app/ops/leads/page.tsx`:
- List all leads with filters (role, source, date)
- Show lead details (name, email, role, intent, source)
- Mark leads as contacted/converted
- Priority sorting

Support queries like:
- "Show me sponsor leads from the last 7 days"
- "Summarize funder interest related to HiiiWAV 50"

### 3. Build Follow-Up Drafting
Create a tool that:
- Takes a lead ID
- Generates draft email/DM based on lead intent
- Always marks as **DRAFT** - never auto-send
- Allows editing before sending

### 4. Build Content Support Tools
Create tools for:
- **Blog Recap Drafts**: Input bullet notes + event info → draft blog post
- **Social Post Generation**: Generate posts for OTW, Code Vibes, FEST, HiiiWAV 50
- **Artist/JV Profile Drafts**: Generate profiles from structured data

### 5. Build Analytics Dashboard
Once Pixel data is available:
- Show plain-language summaries of ad performance
- Answer questions like:
  - "Which Meta campaigns are driving the most leads for HiiiWAV 50?"
  - "Which landing page has the highest email signup rate?"
- Visualize key metrics

### 6. Create Ops AI Assistant
Add an internal AI assistant at `/ops` that can:
- Summarize leads
- Draft follow-ups
- Generate content
- Interpret analytics

This is separate from the public chatbot and has access to internal data.

## UI Patterns
- Simple, functional design (doesn't need to match public site exactly)
- Tables for data display
- Forms for input
- Clear action buttons
- Status indicators

## Constraints
- All tools must be auth-protected
- Never auto-send emails or messages
- Always mark AI-generated content as draft
- Don't expose internal data to public routes

## Dependencies
- Content Agent: Need lead schema and APIs
- AI Agent: May share some tooling
- Marketing Agent: Need analytics data

## Handoffs
- None - you are the final consumer of other agents' work

## Reference
Always check `/docs/website_plan.md` Section 5.3 for ops specifications.



