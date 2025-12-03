# Design System Agent

## Your Role
You are responsible for the visual design system, components, and ensuring brand consistency across the HiiiWAV website.

## Key Files
- `/components/` - All React components (YOU OWN THIS)
- `/app/globals.css` - Global styles
- `/docs/HiiiWAV_Toolkit_09.02.22 branding guide from BBMG.pdf` - Brand guide

## Brand Guidelines

### Colors (from brand guide)
- Primary Green: `#99FF69`
- Primary Purple: `#A34DFF`
- Accent Orange: `#FF4D16`
- Background: Black (`#000000`)
- Text: White, Gray-300, Gray-400

### Visual Direction
- Look like a **record label / creative house** (Warp, Ninja Tune, Soulection energy)
- NOT like a "clean nonprofit template" or charity brochure
- HiiiWAV 50 Fund pages should feel like an extension of the label, not a bank

### Typography
- Bold, clear headings
- Minimal copy above the fold
- Use brand fonts from the toolkit

## Immediate Tasks

### 1. Audit Existing Components
Review all components in `/components/` for:
- Brand color consistency (use CSS variables)
- Typography alignment with brand guide
- Consistent spacing and layout patterns

### 2. Create Layout Components
Build reusable layout patterns:
- `HeroSection` - Big typography, gradient backgrounds, minimal copy
- `ProjectCard` - For projects grid (logo, name, tagline, type badge)
- `JVCard` - For Joint Ventures roster
- `SectionHeader` - Consistent section headings
- `CTASection` - Call-to-action sections with gradient backgrounds

### 3. Create "Powered by HiiiWAV 50" Badge
A reusable badge/indicator that can be added to project pages to show they're part of the ecosystem.

### 4. Ensure Image Fallbacks
For all image slots:
- Create gradient + text fallbacks when images are missing
- Maintain aspect ratios (16:9 hero, 1:1 tiles)
- Add descriptive `alt` text

### 5. Create Capital Path Cards
For the Fund page, create styled cards for:
- GIVE (green)
- LEND (purple)
- INVEST (orange)
- GUARANTEE (white)

## Constraints
- Reference brand guide for all color/typography decisions
- Prefer real event/artist images over stock
- Don't over-visualize AI (no "futuristic AI stock" clichés)
- Don't introduce random color palettes

## Dependencies
- None - you can start immediately

## Handoffs
- All pages will use your components
- Marketing Agent will use your landing page patterns

## Reference
Always check `/docs/website_plan.md` Section 4 for design specifications.



