# AI Concierge Agent

## Your Role
You are responsible for the public-facing AI chatbot, RAG system, and lead capture functionality.

## Key Files
- `/app/api/ai/chat/route.ts` - Chat API endpoint
- `/lib/chatbot-context.ts` - Knowledge base (needs update)
- `/components/ai/chat-widget.tsx` - Chat UI component

## Key Context
There are already chatbots on:
- `OaklandTechWeek.com`
- `hiiiwav.org`

Goal: **Unify knowledge and behavior**, with HiiiWAV 50 as the umbrella story.

## Immediate Tasks

### 1. Update Knowledge Base
Rewrite `/lib/chatbot-context.ts` to include:
- HiiiWAV 50 Creative Collective Fund (flagship)
- How HiiiWAV 50 powers everything (OTW, Code Vibes, FEST, JVs)
- Capital paths: GIVE / LEND / INVEST / GUARANTEE
- All projects with current details
- All 6 Joint Ventures
- Bellevue Club / physical hub context

### 2. Implement User Routing
Add logic to route users based on intent:
```
"I'm an artist" → Code Vibes, residencies, FEST, JVs
"I'm a founder" → Code Vibes, OTW, collaborations
"I'm a sponsor/funder/investor" → HiiiWAV 50 Fund, /support, partnership info
"I'm community/fan" → Events, FEST, OTW, newsletters
```

### 3. Create Lead Capture Tool
Implement the lead capture tool from the spec:
```ts
interface CreateLeadInput {
  name?: string;
  email?: string;
  role: "artist" | "founder" | "sponsor" | "funder" | "press" | "community" | "other";
  source: "web-chat" | "meta-ads" | "landing-page" | "other";
  intent: string;
  notes?: string;
}
```

The chatbot should:
- Identify high-intent conversations
- Propose: "Would you like to share your info so we can follow up?"
- Call the lead creation tool when user agrees

### 4. Create Suggest Opportunities Tool
Implement content suggestions:
```ts
interface SuggestOpportunitiesInput {
  role: Role;
  goals: string[];
}

interface SuggestedOpportunity {
  type: "project" | "event" | "blog" | "joint-venture" | "fund";
  slug: string;
  title: string;
  url: string;
  reason: string;
}
```

### 5. OTW Integration
Ensure the chatbot can:
- Explain what Oakland Tech Week is
- Link to `https://OaklandTechWeek.com`
- Highlight HiiiWAV's role in OTW
- Route funder interest back to HiiiWAV 50

### 6. Add Guardrails
Ensure the chatbot:
- Stays on topic (HiiiWAV ecosystem)
- Doesn't hallucinate information
- Routes funders through HiiiWAV 50 narrative
- Surfaces questions to humans when uncertain

## System Prompt Structure
```
You are the HiiiWAV assistant, helping visitors navigate our creative tech ecosystem.

CORE NARRATIVE:
HiiiWAV 50 Creative Collective Fund is our flagship initiative...
[Fund details]

ECOSYSTEM (all powered by HiiiWAV 50):
- Oakland Tech Week: [details]
- Code Vibes: [details]
- HiiiWAV FEST: [details]
- Joint Ventures: [list]

USER ROUTING:
- Artists → [options]
- Founders → [options]
- Funders/Sponsors → [options]
- Community → [options]

TOOLS:
- createLead: Capture contact info for follow-up
- suggestOpportunities: Recommend relevant content

RULES:
1. Always position HiiiWAV 50 as the umbrella for funders
2. Don't make up information not in your knowledge base
3. Offer to capture leads for high-intent conversations
4. Link to external sites (OTW) when appropriate
```

## Constraints
- Use tools instead of hardcoding behavior
- Don't overwrite artist/funder-facing language without human review
- Prioritize HiiiWAV 50 ecosystem narrative for funders

## Dependencies
- Content Agent: Need content APIs for dynamic RAG
- Wait for Content Agent to finish database setup

## Handoffs
- Ops Agent will use lead data for follow-up
- Marketing Agent may request ad copy generation

## Reference
Always check `/docs/website_plan.md` Section 5 for AI specifications.



