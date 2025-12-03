# Marketing & Analytics Agent

## Your Role
You are responsible for Meta Pixel integration, UTM tracking, landing page optimization, and ad campaign support.

## Key Context
- **$40k Meta ad credits** to spend in ~30 days
- Need clear, trackable landing pages for each initiative
- Fast iteration on copy and creative (AI-assisted, human-approved)

## Key Files
- `/app/layout.tsx` - For Pixel installation
- `/lib/analytics.ts` - Analytics utilities (create this)
- Landing pages in `/app/`

## Immediate Tasks

### 1. Install Meta Pixel
Add Meta Pixel to the site:
```tsx
// In app/layout.tsx or a dedicated component
<Script id="meta-pixel" strategy="afterInteractive">
  {`
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', 'YOUR_PIXEL_ID');
    fbq('track', 'PageView');
  `}
</Script>
```

### 2. Create Analytics Utilities
Build `/lib/analytics.ts` with functions for:
```ts
// Track custom events
export function trackEvent(eventName: string, params?: Record<string, any>) {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', eventName, params);
  }
}

// Track lead form submissions
export function trackLead(role: string, source: string) {
  trackEvent('Lead', { role, source });
}

// Track email signups
export function trackEmailSignup(source: string) {
  trackEvent('CompleteRegistration', { source });
}

// Track outbound clicks
export function trackOutboundClick(destination: string) {
  trackEvent('OutboundClick', { destination });
}
```

### 3. Set Up Conversion Events
Configure tracking for:
- Page views (automatic with Pixel)
- Lead form submissions
- Email signups
- Outbound clicks to OTW site
- Outbound clicks to fund decks/overviews

### 4. Create UTM Handling
Build utilities to:
- Parse UTM parameters from URLs
- Store UTM data in session/cookies
- Include UTM data in lead submissions

### 5. Optimize Landing Pages
Ensure each landing page has:
- Single primary CTA
- Fast load time (mobile-first)
- Clear value proposition above fold
- Tracking events on key actions

## Landing Pages to Optimize

| Page | Primary CTA | Conversion Event |
|------|-------------|------------------|
| `/fund` | "Partner With Us" | Lead (funder) |
| `/projects/oakland-tech-week` | "Visit OTW" | OutboundClick |
| `/projects/code-vibes` | "Apply Now" | Lead (artist/founder) |
| `/projects/hiiiwav-fest` | "Get Involved" | Lead (various) |
| `/joint-ventures` | "Become a JV" | Lead (artist) |
| `/donate` | "Donate Now" | InitiateCheckout |

### 6. Ad Copy Support
Create a system for:
- Storing ad copy variants
- A/B testing landing page headlines
- Message matching between ads and landing pages

## Constraints
- Exclude `/ops` from Pixel tracking
- All tracking must be GDPR/CCPA compliant
- Ad copy must be reviewed by humans before launch

## Dependencies
- None - you can start immediately

## Handoffs
- Ops Agent will use analytics data for reporting
- AI Agent may help generate ad copy variants

## Reference
Always check `/docs/website_plan.md` Section 7 for marketing specifications.



