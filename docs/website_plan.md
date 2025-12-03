````markdown
# HiiiWAV Website 2025 – Product & Agent Spec

_Last updated: 2025-11-27_

## 0. TL;DR FOR AGENTS

- Stack: **Next.js** (App Router), TypeScript, existing HiiiWAV design guide.
- Brand: **Creative tech label / house**, not a traditional “nonprofit website.”

- Core conceptual hierarchy:

  1. **HiiiWAV 50 Creative Collective Fund**
     - Flagship capital + real estate + governance model that makes everything else possible.

  2. **Ecosystem projects powered by HiiiWAV 50**
     - **Oakland Tech Week** (OTW) – has its own site + chatbot.  
     - **Code Vibes** – accelerator for artists building agents.  
     - **HiiiWAV FEST** – signature festival.  
     - **Joint Ventures** – boutique, selective, label-like partnerships (similar to fiscal sponsorship).  
     - **Residencies, events, coworking** – smaller but important context.

  3. **Infrastructure**
     - Bellevue Club / physical hub, AI/agent systems, blog, ops.

- Priority order for UX and build:

  1. **HiiiWAV 50 Creative Collective Fund** (`/fund` or `/hiiiwav-50`)  
  2. **Oakland Tech Week** integration (linking + shared understanding)  
  3. **Code Vibes** (artists’ accelerator focused on agents)  
  4. **HiiiWAV FEST** (festival – spelling matters)  
  5. **Joint Ventures** + roster (boutique, selective partnerships)  
  6. Blog & archive (events, artists, cohorts, JV milestones)  
  7. Residencies, events (lightweight), coworking (lightweight), general support/donors

- Chatbots already exist on:
  - `OaklandTechWeek.com`
  - `hiiiwav.org`

  Goal: **unify knowledge + behavior**, not duplicate random chatbots.

- AI/agents should:
  - Help visitors find the right project/program.
  - Help sponsors/funders understand **HiiiWAV 50** and concrete ways to **GIVE / LEND / INVEST / GUARANTEE**.
  - Help the internal team with content, tagging, lead triage, and analytics interpretation (especially Meta campaigns).
  - **Not** replace artist creativity or flatten the brand.

- Marketing: **$40k Meta ad credits** to use in ~30 days.  
  Website must support:

  - Clear, trackable landing pages for:
    - HiiiWAV 50 Fund  
    - Oakland Tech Week  
    - Code Vibes  
    - HiiiWAV FEST  
    - Select Joint Ventures / support flows
  - Measurement: Meta Pixel + events, UTMs.
  - Fast iteration on copy & creative (AI-assisted, human-approved).


---

## 1. Context & Brand Positioning

### 1.1 What HiiiWAV is

HiiiWAV is a **creative tech label / house for artist-founders and their worlds**.

We sit where:

- Black culture, music, art, and community
- Technology (especially AI and agentic systems)
- Nonprofit + real estate infrastructure (for funding, housing, and impact)

all intersect.

We are:

- A **producer** of projects and experiences:  
  HiiiWAV 50, Oakland Tech Week, Code Vibes, HiiiWAV FEST, residencies, etc.
- A **partner** through **Joint Ventures**:  
  Selective, high-touch, label-like partnerships (similar to fiscal sponsorship) with artists and organizations.
- A **platform** for artists and founders to build sustainable, agentic, tech-enabled futures.

### 1.2 HiiiWAV 50 Creative Collective Fund

HiiiWAV 50 Creative Collective Fund (“HiiiWAV 50”) is:

- A **flagship fund model**:
  - Endowment + real estate + full-spectrum capital.
  - Designed to support a cohort of artists with funding, housing, services, and ownership.

- The **engine** and umbrella narrative:
  - OTW, Code Vibes, FEST, Joint Ventures, and residencies can all be framed as **expressions of HiiiWAV 50**.
  - Funders, donors, and partners should understand everything through this lens.

**Implication:**  
For funders and sponsors, **HiiiWAV 50 is the main story**.  
Projects (OTW, Code Vibes, FEST, JVs) are **how the story shows up in the world**.

### 1.3 Key audiences

Agents should explicitly design flows around:

1. **Artists / creative technologists**
   - Looking for: residencies, Code Vibes accelerator, Joint Ventures, performances at FEST, long-term support (HiiiWAV 50), exposure.

2. **Founders / startups (especially artist-founders, agent builders)**
   - Looking for: Code Vibes, Oakland Tech Week, collaborations, community, access to funding and real-world labs like Bellevue Club.

3. **Funders / donors / corporate sponsors / impact investors**
   - Looking for:
     - HiiiWAV 50 Fund narrative (how capital + real estate + governance work).
     - Ways to **GIVE / LEND / INVEST / GUARANTEE**.
     - Evidence and credibility via OTW, Code Vibes, FEST, and Joint Ventures.
     - Sponsorship decks, partnership models, and case studies.

4. **Community / fans / attendees**
   - Looking for: events, HiiiWAV FEST info, Oakland Tech Week programming, residencies/coworking touchpoints, how to show up IRL at Bellevue Club and beyond.

5. **Internal team**
   - Uses the site as a **content hub, knowledge base, lead capture system, analytics lens, and AI control surface**.


---

## 2. High-Level Goals

### 2.1 Product goals

1. Make **HiiiWAV 50** a prominent, funder-facing section with clear **entry points for capital**:
   - Narrative of the fund.
   - Ways to **GIVE / LEND / INVEST / GUARANTEE**.
   - Connection to Bellevue Club / real estate and artist cohorts.

2. Make **ecosystem projects** (OTW, Code Vibes, FEST, JVs) the primary surface area for **everyone else**:
   - Artists and founders discover HiiiWAV through projects and experiences.
   - Each project is clearly “powered by HiiiWAV 50.”

3. Make it **obvious how to work with HiiiWAV**:
   - “I’m an artist” → options (Code Vibes, residencies, FEST, JVs).
   - “I’m a founder” → options (Code Vibes, OTW, collabs).
   - “I’m a sponsor/funder/investor” → HiiiWAV 50, Joint Ventures, FEST/OTW sponsorship, contact.
   - “I’m community/fan/attendee” → events, FEST, OTW, newsletters.

4. Create a **rich blog + archive** documenting:
   - Events (OTW sessions, FEST lineups, Bellevue programming).
   - Artists and their projects.
   - Cohorts (Code Vibes, residencies).
   - Joint Ventures and milestones.
   - How all of the above ladders up to HiiiWAV 50.

5. Provide **lightweight but functional** support for:
   - Events listing.
   - Coworking.
   - General org info (“About”).
   - “Support” flows for small donors / community support not ready for HiiiWAV 50 scale.

### 2.2 AI/agent goals

1. **Global concierge on hiiiwav.org** that:
   - Understands HiiiWAV 50 and its relationship to OTW, Code Vibes, FEST, JVs, residencies, Bellevue Club.
   - Routes users to the right project, page, or form.
   - Captures high-intent leads (artists, founders, sponsors, investors) with structured data.

2. **Oakland Tech Week integration**:
   - HiiiWAV’s assistant can explain OTW and link to `OaklandTechWeek.com`.
   - OTW’s chatbot can hand off funder/investor interest to HiiiWAV 50 (Fund) page and/or relevant contact flows.

3. **Internal ops agent** (`/ops`):
   - Summarize leads and applications by role, project, and source (including Meta ads).
   - Draft follow-up emails, social posts, and blog outlines.
   - Help the team interpret analytics (site + Meta campaigns) in plain language.

### 2.3 Marketing goals (Meta ads)

1. Spend **$40k Meta ad credits in ~30 days** to:
   - Build awareness of **HiiiWAV 50**, OTW, Code Vibes, and HiiiWAV FEST.
   - Drive high-intent traffic to well-structured landing pages.
   - Capture leads + emails from artists, founders, and funders.

2. Site must support:
   - Meta Pixel + events.
   - UTM tracking on all campaign URLs.
   - Easy iteration on copy + creative (AI-assisted, human-approved) across multiple landing pages and audiences.


---

## 3. Information Architecture

### 3.1 Top-level routes (Next.js)

Agents should **respect and build on this route structure** instead of introducing new top-level patterns without human approval.

- `/` – Home
- `/fund` (or `/hiiiwav-50`) – **HiiiWAV 50 Creative Collective Fund** (flagship, funder-facing)
- `/projects` – Projects index
- `/projects/oakland-tech-week` – OTW explainer + integration (links out to `OaklandTechWeek.com`)
- `/projects/code-vibes` – Code Vibes accelerator (agents + artist-founders)
- `/projects/hiiiwav-fest` – HiiiWAV FEST
- `/joint-ventures` – Joint Ventures overview + roster
- `/joint-ventures/[slug]` – Individual JV project pages
- `/residencies` – Info about residencies (if separate from Code Vibes)
- `/events` – Events index (lightweight; many OTW events may live externally but can be mirrored/selected here)
- `/coworking` – Coworking overview (small; Bellevue Club & other hubs)
- `/blog` – Blog index
- `/blog/[slug]` – Blog post (events, artists, cohorts, stories)
- `/about` – About HiiiWAV
- `/support` or `/donate` – For funders / donors / sponsors (general support; smaller gifts; may overlap with Fund). Navigation label: "Support HiiiWAV" (to avoid confusion with help center)
- `/ops` – Internal tools / ops (auth-only)
- `/api/*` – Internal APIs for agents, chat, data, etc.

### 3.2 Content models

These interfaces are the canonical data models agents should work with.

#### Fund – umbrella for capital + governance

```ts
export interface Fund {
  slug: string;               // "hiiiwav-50"
  name: string;               // "HiiiWAV 50 Creative Collective Fund"
  tagline: string;
  description: string;        // long-form narrative / MDX
  heroImageId?: string;

  focusAreas: string[];       // ["artists", "real estate", "full-spectrum capital", ...]
  targetAmount?: number;      // e.g. 50000000 (USD)
  instruments?: string[];     // ["grants", "low-interest loans", "guarantees", "equity", "PRI"]

  // Optional: encode capital pathways for different partners (GIVE/LEND/INVEST/GUARANTEE)
  capitalPaths?: {
    id: string;
    kind: "give" | "lend" | "invest" | "guarantee" | "other";
    label: string;            // "Multi-year pledge", "Program-related investment", etc.
    minAmount?: number;
    description: string;
    ctaUrl?: string;
  }[];

  // How the fund shows up across the ecosystem
  relatedProjects?: string[]; // Project slugs powered by the fund
  relatedJVs?: string[];      // JV slugs that are fund exemplars
}
````

#### Projects – OTW, Code Vibes, FEST, etc.

```ts
// High-level project (OTW, Code Vibes, FEST, etc.)
export interface Project {
  slug: string;            // e.g. "oakland-tech-week"
  name: string;            // "Oakland Tech Week"
  type: "festival" | "accelerator" | "residency" | "initiative" | "other";
  isPrimary: boolean;      // OTW, Code Vibes, HiiiWAV FEST often true
  shortTagline: string;
  description: string;     // Rich text / MDX
  status: "active" | "upcoming" | "archived";
  primaryUrl?: string;     // e.g. https://OaklandTechWeek.com
  heroImageId?: string;    // media library reference
  startDate?: string;      // ISO
  endDate?: string;        // ISO
  featuredCohorts?: string[];  // references to Cohort IDs (if/when modeled)
}
```

#### Joint Ventures – boutique partnerships

```ts
// Joint Venture (JV) – boutique, selective partnerships
export interface JointVenture {
  slug: string;
  name: string;            // e.g. "Choice Scores"
  partners: string[];      // key people/orgs
  description: string;     // emphasis on partnership, impact, story
  focusAreas: string[];    // e.g. ["music", "youth", "education"]
  heroImageId?: string;
  projectLinks?: string[]; // external sites, socials, Bandcamp, etc.
  status: "current" | "alumni";
}
```

Current Joint Ventures (seed data):

* Choice Scores
* Ryan Nicole
* Prospect Band
* Alphabet Rockers
* Sol Affirmations
* Soul Slappers

Agents should assume these are **core entities** and avoid renaming without human approval.

#### Blog posts

```ts
// Blog posts (events, profiles, recaps, etc.)
export interface BlogPost {
  slug: string;
  title: string;
  summary: string;
  body: string;            // MDX
  publishedAt: string;
  updatedAt?: string;
  categories: string[];    // ["event-recap", "artist-profile", "cohort-story", "announcement"]
  tags: string[];          // freeform tags
  heroImageId?: string;
  relatedProjects?: string[];   // Project slugs
  relatedJVs?: string[];        // JV slugs
  relatedPeople?: string[];     // Person IDs
}
```

#### People / artists / founders

```ts
// People / artists / founders
export interface Person {
  id: string;
  name: string;
  role: string;            // "artist", "founder", "DJ", "MC", "curator", etc.
  bio: string;
  imageId?: string;
  links?: {
    type: "website" | "instagram" | "x" | "soundcloud" | "spotify" | "other";
    url: string;
    label?: string;
  }[];
  associatedProjects?: string[];  // Project slugs
  associatedJVs?: string[];       // JV slugs
}
```

#### Events

```ts
// Events (used lightly – main schedule may live on OTW site)
export interface Event {
  id: string;
  title: string;
  description: string;
  startTime: string;
  endTime?: string;
  location: string;
  projectSlug?: string;       // e.g. "oakland-tech-week", "hiiiwav-fest"
  featuredPeople?: string[];  // Person IDs
  externalUrl?: string;       // ticketing, OTW site, etc.
}
```

Agents should preserve these relationships to power RAG, site navigation, recommendations, and fund storytelling (e.g. “this event is an expression of HiiiWAV 50 via OTW”).

---

## 4. Design & Visual Direction

### 4.1 General principles

* **Reference the existing HiiiWAV design guide** for:

  * Color palette
  * Typography
  * Spacing/scale

* HiiiWAV should look more like:

  * A **record label / creative house** (Warp, Ninja Tune, Soulection energy)
  * Less like a “clean nonprofit template” or charity brochure.

This applies **equally** to the HiiiWAV 50 Fund section:
It should feel like an extension of the label/house, not a generic institutional prospectus.

Agents **must not**:

* Introduce random color palettes.
* Replace the design system with a generic UI library theme.
* Over-visualize AI (no “futuristic AI stock” clichés unless explicitly requested).

### 4.2 Layout patterns

* **Hero sections**:

  * Big, clear typography.
  * Minimal copy above the fold.
  * Strong image or background gradient (aligned with brand guide).
  * Fund hero should clearly state:

    * What HiiiWAV 50 is.
    * Who it’s for (funders, impact investors, partners).
    * Primary CTA (connect / invest / sponsor).

* **Projects grid**:

  * Use **card/tile layout** for OTW, Code Vibes, HiiiWAV FEST, etc.
  * Each tile shows:

    * Project logo or cover image
    * Name + one-line description
    * Tag (festival, accelerator, joint venture, etc.)
    * Optional “Powered by HiiiWAV 50” indicator.

* **JV roster**:

  * Grid of cards: JV logo/image + description + link.
  * Emphasis on quality and curation (few, strong entries, not a long crowded list).

* **Blog**:

  * Clear list with images, categories, tags.
  * Easy filtering by project (OTW, Code Vibes, FEST, JV, etc.).
  * Highlight “From the HiiiWAV 50 ecosystem” where relevant.

### 4.3 Images & media

HiiiWAV has **lots of real photos** from previous events and artists. Use them.

Rules for agents:

* Prefer **real event/artist images** over generic stock.
* When designing new sections:

  * Always define a sane fallback (gradient + text) if image missing.
  * Maintain aspect ratios defined in the design guide (e.g., 16:9 hero, 1:1 tiles).

Where possible, agents should:

* Add image slots and components, but **not invent fake images**. Let humans choose actual assets.
* Use descriptive `alt` text to maintain accessibility.
* Ensure that the Fund, projects, and JVs share a consistent visual language (so the connection is obvious).

---

## 5. AI / Agent System

There are already two chatbots:

* One on **OaklandTechWeek.com**
* One on **hiiiwav.org**, connected to OpenAI

Goal: **deeper integration, shared understanding**, with HiiiWAV 50 as the umbrella story.

### 5.1 Global public concierge on hiiiwav.org

Route: e.g. `POST /api/assistant` (exact route may differ).

Core capabilities:

1. **Answer FAQs**:

   * About HiiiWAV, HiiiWAV 50, OTW, Code Vibes, HiiiWAV FEST, Joint Ventures, residencies, coworking, Bellevue Club, etc.
   * Source content from MDX/DB + OTW FAQs (synced or mirrored).

2. **Route users**:

   * “I’m an artist” → relevant project pages, application forms, blog posts.
   * “I’m a founder” → Code Vibes, OTW, collab forms.
   * “I’m a sponsor/funder/investor” → `/fund`, `/support`, deck links, contact forms.
   * “What is HiiiWAV 50?” → Fund page + summary explanation.

3. **Suggest content**:

   * Relevant blog posts, JV projects, and events based on query.
   * Prioritize content that clearly shows the **HiiiWAV 50 ecosystem**.

4. **Capture leads**:

   * For high-intent conversations, propose:

     * “Would you like to share your info so we can follow up?”
   * Then call an internal lead creation tool.

#### Recommended tools (pseudo-interfaces)

```ts
type Role =
  | "artist"
  | "founder"
  | "sponsor"
  | "funder"
  | "press"
  | "community"
  | "other";

interface CreateLeadInput {
  name?: string;
  email?: string;
  role: Role;
  source: "web-chat" | "meta-ads" | "landing-page" | "other";
  intent: string;          // e.g. "interested in Code Vibes cohort" or "learn about HiiiWAV 50 investing"
  notes?: string;
}

interface CreateLeadOutput {
  leadId: string;
  status: "created" | "failed";
}
```

```ts
interface SuggestOpportunitiesInput {
  role: Role;
  goals: string[];   // freeform descriptions
}

interface SuggestedOpportunity {
  type: "project" | "event" | "blog" | "joint-venture" | "fund";
  slug: string;
  title: string;
  url: string;
  reason: string;    // short explanation for user
}
```

Agents should call these tools (or their equivalents) instead of hardcoding behavior.

### 5.2 Oakland Tech Week integration

Even though OTW has its own chatbot and site, HiiiWAV’s concierge should:

* Understand:

  * OTW’s dates, themes, and HiiiWAV’s role.
* Provide:

  * A short explanation of OTW.
  * A link to `https://OaklandTechWeek.com`.
  * Highlight HiiiWAV-related OTW events (from shared data or manual curation).
  * For funder interest, **route back to HiiiWAV 50 / Fund** narratives and forms.

If technically feasible, agents may:

* Fetch a summarized OTW schedule from a shared API / JSON feed.
* Store OTW events in HiiiWAV’s `Event` model with `projectSlug = "oakland-tech-week"`.

### 5.3 Internal ops agent (`/ops`)

Features (for authenticated users only):

1. **Lead summary**:

   * Queries like:

     * “Show me sponsor leads from the last 7 days.”
     * “Summarize funder interest related to HiiiWAV 50.”
   * Output: list of leads with category, source (e.g. Meta ads, web-chat), and suggested priority.

2. **Follow-up drafting**:

   * Given a lead ID, generate draft email / DM.
   * Always mark as **draft**; do not send automatically without human approval.

3. **Content support**:

   * Generate first drafts for:

     * Blog recaps (from bullet notes + event info).
     * Social posts for OTW, Code Vibes, HiiiWAV FEST, HiiiWAV 50.
     * Artist / JV profiles from structured data.

4. **Analytics summarization**:

   * Once Pixel/analytics metrics are available, provide plain-language summaries, e.g.:

     * “Which Meta campaigns are driving the most leads for HiiiWAV 50?”
     * “Which landing page has the highest email signup rate?”

---

## 6. Blog & Content Strategy

### 6.1 Purpose

The blog is the **historical record** and **public memory** of:

* HiiiWAV events
* Artists and projects
* Code Vibes cohorts
* Residencies
* Joint Ventures milestones
* OTW and HiiiWAV FEST involvement
* How all of the above relate back to **HiiiWAV 50** and the long-term vision

### 6.2 Content types (inside `/blog`)

* **Event recap** – what happened, who played/spoke, photos, pull quotes.
* **Artist / JV profiles** – deeper dives on Choice Scores, Ryan Nicole, etc.
* **Cohort stories** – Code Vibes cohorts, alumni journeys, residency stories.
* **Announcements** – OTW panels, FEST dates, new JV partnerships, fund milestones.

Agents should:

* Autogenerate **draft posts** from structured data (event info, people, notes).
* Link posts to:

  * `relatedProjects`
  * `relatedJVs`
  * `relatedPeople`
  * (optionally) `relatedFund` or tag them as part of HiiiWAV 50 ecosystem.

This helps AI and UX cross-link content and recommend relevant pages, especially for funders trying to understand impact.

---

## 7. Meta Ads & Website Requirements

We have **$40k in Meta ad credits** to spend in ~30 days.

Agents should design the website so that ad campaigns can plug in easily and be measured clearly.

### 7.1 Landing pages

Each major initiative needs at least one focused landing page:

0. **HiiiWAV 50 (Fund)**

   * HiiiWAV 50 narrative: what it is, why it exists, how it works (endowment + real estate + full-spectrum capital).
   * Clear explanation of partner types: donors, lenders, impact investors, guarantors.
   * CTAs:

     * “Talk to us about HiiiWAV 50.”
     * Download overview / deck.
     * Join funder updates list.

1. **Oakland Tech Week + HiiiWAV involvement**

   * Highlight HiiiWAV’s programming, panels, performances, showcases.
   * Capture emails for:

     * People who want to stay informed.
     * Artists/founders interested in future opportunities.

2. **Code Vibes (agents accelerator)**

   * Clear explanation: what it is, who it’s for, what you get.
   * Simple application or “Get notified about next cohort” form.

3. **HiiiWAV FEST**

   * Festival description, vibe, highlights, artists.
   * CTAs:

     * Ticketing (if applicable).
     * “Apply to perform” / “Partner with FEST” / “Volunteer”.

4. **Joint Ventures**

   * Sponsor/funder-facing version of the JV page.
   * Emphasize outcomes, stories, and partnership models.
   * Connect back to HiiiWAV 50 and ecosystem narrative.

Landing pages must:

* Load fast, be mobile-first.
* Have a **single primary CTA** (apply / subscribe / learn more / book a call).
* Be easily editable so copy can be iterated by agents + humans.

### 7.2 Tracking

Agents must ensure:

* Meta Pixel installed site-wide (excluding `/ops` if necessary).
* UTMs on URLs used in ads:

  * `utm_source=meta`
  * `utm_medium=paid-social`
  * `utm_campaign=...`
* Basic events:

  * Page views
  * Lead form submissions
  * Email signup
  * Outbound click to OTW site (for specific campaigns)
  * Outbound click to decks or fund overview for HiiiWAV 50

### 7.3 Agent support for ads

Agents do **not** run ads directly but they should:

* Generate and refine:

  * Ad copy variants.
  * Headline/description options.
  * Landing page copy to match ads (message match).

* Map:

  * Each campaign → landing page.
  * Each landing page → clear conversion event (form, sign-up, download, call booked, etc.).

Output of AI should be reviewed by a human before being launched into Meta.

---

## 8. Constraints & Non-Goals

* **No low-code / no-code platforms**.
  We are **migrating from WordPress to Next.js**, and all new work should assume a Next.js, TypeScript-based stack.

* The site is **not** just a traditional nonprofit fundraising site:

  * We are a **creative + tech-forward label** that happens to use nonprofit structures.
  * HiiiWAV 50 should still feel like it lives inside a creative house, not a bank.

* AI should **amplify** human creativity and operations, not dominate the brand:

  * Don’t auto-generate large, generic AI imagery.
  * Don’t overwrite artist- or funder-facing language without human review.
  * Use AI to scaffold, summarize, and connect—not to flatten voice.

---

## 9. Implementation Checklist (for agents)

When adding or changing features:

1. **Check this doc**:

   * Does the change fit the IA and priorities?
   * Does it respect the design guide + label-like visual direction?
   * Does it clearly position HiiiWAV 50 as the umbrella story where relevant?

2. **Respect core entities**:

   * Fund, Projects, Joint Ventures, People, Blog Posts, Events.
   * HiiiWAV 50, OTW, Code Vibes, HiiiWAV FEST, and the JV roster are high-priority.

3. **Wire up AI thoughtfully**:

   * Use tools for leads, suggestions, and RAG over our content.
   * Don’t invent new tools without namespacing and documentation.
   * Make sure funders are routed through HiiiWAV 50 and appropriate capital paths.

4. **Support future ad campaigns**:

   * Landing pages have clear CTAs and tracking hooks.
   * Content is consistent with brand voice and purpose.
   * Fund and project pages can be easily A/B-tested (copy sections, CTAs, imagery).

If behavior conflicts with this document, agents should favor **this spec** and surface questions to humans.

```
```
