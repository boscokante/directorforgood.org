# HiiiWAV Agent Instructions

This folder contains instruction files for different agents working on the HiiiWAV website. Each agent has a specific domain and set of responsibilities.

## How to Use

1. **Open a new Cursor Agent window** for each agent you want to run
2. **Attach the relevant instruction file** to that agent's context
3. **Also attach** `/docs/website_plan.md` and `/lib/types.ts` for shared context
4. **Give the agent its first task** from the "Immediate Tasks" section

## Agent Roster

| Agent | File | Focus Area | Can Run In Parallel? |
|-------|------|------------|---------------------|
| Content Infrastructure | `content-agent.md` | Data models, CMS, MDX | ✅ Yes |
| Design System | `design-agent.md` | Components, styling, brand | ✅ Yes |
| Marketing & Analytics | `marketing-agent.md` | Meta Pixel, landing pages, tracking | ✅ Yes |
| AI Concierge | `ai-agent.md` | Chatbot, RAG, lead capture | After Content |
| Internal Ops | `ops-agent.md` | /ops area, admin tools | After AI Concierge |

## Parallel Execution Strategy

### Phase 1 (Run Simultaneously)
- **Content Agent**: Set up database schema, seed data, MDX pipeline
- **Design Agent**: Audit and enhance components, ensure brand consistency
- **Marketing Agent**: Install Meta Pixel, set up tracking events

### Phase 2 (After Phase 1)
- **AI Agent**: Enhance chatbot with new content models and HiiiWAV 50 context

### Phase 3 (After Phase 2)
- **Ops Agent**: Build internal tools using AI and content infrastructure

## Shared Resources

All agents should reference:
- `/docs/website_plan.md` - Full product spec
- `/lib/types.ts` - TypeScript interfaces (source of truth for data models)
- `/docs/HiiiWAV_Toolkit_09.02.22 branding guide from BBMG.pdf` - Brand guide

## Conflict Resolution

If agents need to modify the same file:
1. Content Agent has priority for `/lib/` files
2. Design Agent has priority for `/components/` files
3. Marketing Agent has priority for tracking/analytics code
4. For page files, coordinate or work on different pages

## Communication

Agents should surface questions to humans when:
- Behavior conflicts with `/docs/website_plan.md`
- A change would affect another agent's domain
- New top-level routes or patterns are needed
- Artist/funder-facing copy needs approval



