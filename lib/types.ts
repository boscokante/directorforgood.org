/**
 * HiiiWAV Website 2025 – Core Content Models
 * 
 * These interfaces are the canonical data models for the entire site.
 * All agents should work with these types.
 * 
 * @see /docs/website_plan.md for full specification
 */

// ============================================================================
// FUND - Umbrella for capital + governance (HiiiWAV 50)
// ============================================================================

export interface CapitalPath {
  id: string;
  kind: "give" | "lend" | "invest" | "guarantee" | "other";
  label: string;              // "Multi-year pledge", "Program-related investment", etc.
  minAmount?: number;
  description: string;
  ctaUrl?: string;
}

export interface Fund {
  slug: string;               // "hiiiwav-50"
  name: string;               // "HiiiWAV 50 Creative Collective Fund"
  tagline: string;
  description: string;        // long-form narrative / MDX
  heroImageId?: string;

  focusAreas: string[];       // ["artists", "real estate", "full-spectrum capital", ...]
  targetAmount?: number;      // e.g. 50000000 (USD)
  instruments?: string[];     // ["grants", "low-interest loans", "guarantees", "equity", "PRI"]

  capitalPaths?: CapitalPath[];

  // How the fund shows up across the ecosystem
  relatedProjects?: string[]; // Project slugs powered by the fund
  relatedJVs?: string[];      // JV slugs that are fund exemplars
}

// ============================================================================
// PROJECTS - OTW, Code Vibes, FEST, etc.
// ============================================================================

export type ProjectType = "festival" | "accelerator" | "residency" | "initiative" | "other";
export type ProjectStatus = "active" | "upcoming" | "archived";

export interface Project {
  slug: string;               // e.g. "oakland-tech-week"
  name: string;               // "Oakland Tech Week"
  type: ProjectType;
  isPrimary: boolean;         // OTW, Code Vibes, HiiiWAV FEST often true
  shortTagline: string;
  description: string;        // Rich text / MDX
  status: ProjectStatus;
  primaryUrl?: string;        // e.g. https://OaklandTechWeek.com
  heroImageId?: string;       // media library reference
  startDate?: string;         // ISO
  endDate?: string;           // ISO
  featuredCohorts?: string[]; // references to Cohort IDs
}

// ============================================================================
// JOINT VENTURES - Boutique, selective partnerships
// ============================================================================

export type JVStatus = "current" | "alumni";

export interface JointVenture {
  slug: string;
  name: string;               // e.g. "Choice Scores"
  partners: string[];         // key people/orgs
  description: string;        // emphasis on partnership, impact, story
  focusAreas: string[];       // e.g. ["music", "youth", "education"]
  heroImageId?: string;
  projectLinks?: string[];    // external sites, socials, Bandcamp, etc.
  status: JVStatus;
}

// Seed data - core JV entities (do not rename without human approval)
export const JOINT_VENTURES_SEED: JointVenture[] = [
  {
    slug: "choice-scores",
    name: "Choice Scores",
    partners: ["Kev Choice"],
    description: "Film scoring and music production studio led by acclaimed pianist and composer Kev Choice.",
    focusAreas: ["music", "film", "education"],
    status: "current",
  },
  {
    slug: "ryan-nicole",
    name: "Ryan Nicole",
    partners: ["Ryan Nicole"],
    description: "Vocalist, producer, and creative technologist building at the intersection of music and AI.",
    focusAreas: ["music", "AI", "production"],
    status: "current",
  },
  {
    slug: "prospect-band",
    name: "Prospect Band",
    partners: ["Prospect"],
    description: "Oakland-based band blending hip-hop, jazz, and soul with a message of community empowerment.",
    focusAreas: ["music", "community", "performance"],
    status: "current",
  },
  {
    slug: "alphabet-rockers",
    name: "Alphabet Rockers",
    partners: ["Alphabet Rockers"],
    description: "Grammy-nominated hip-hop group creating music for kids and families that celebrates diversity and justice.",
    focusAreas: ["music", "youth", "education", "social justice"],
    status: "current",
  },
  {
    slug: "sol-affirmations",
    name: "Sol Affirmations",
    partners: ["Sol Affirmations"],
    description: "Wellness and affirmation platform rooted in Black culture and healing traditions.",
    focusAreas: ["wellness", "culture", "healing"],
    status: "current",
  },
  {
    slug: "soul-slappers",
    name: "Soul Slappers",
    partners: ["Soul Slappers"],
    description: "Production collective and beat-making community pushing the boundaries of Bay Area sound.",
    focusAreas: ["music", "production", "community"],
    status: "current",
  },
];

// ============================================================================
// BLOG POSTS
// ============================================================================

export type BlogCategory = 
  | "event-recap" 
  | "artist-profile" 
  | "cohort-story" 
  | "announcement"
  | "fund-update";

export interface BlogPost {
  slug: string;
  title: string;
  summary: string;
  body: string;               // MDX
  publishedAt: string;
  updatedAt?: string;
  categories: BlogCategory[];
  tags: string[];             // freeform tags
  heroImageId?: string;
  relatedProjects?: string[]; // Project slugs
  relatedJVs?: string[];      // JV slugs
  relatedPeople?: string[];   // Person IDs
}

// ============================================================================
// PEOPLE / ARTISTS / FOUNDERS
// ============================================================================

export type LinkType = "website" | "instagram" | "x" | "soundcloud" | "spotify" | "other";

export interface PersonLink {
  type: LinkType;
  url: string;
  label?: string;
}

export interface Person {
  id: string;
  name: string;
  role: string;               // "artist", "founder", "DJ", "MC", "curator", etc.
  bio: string;
  imageId?: string;
  links?: PersonLink[];
  associatedProjects?: string[];  // Project slugs
  associatedJVs?: string[];       // JV slugs
}

// ============================================================================
// EVENTS
// ============================================================================

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

// ============================================================================
// LEADS (for AI concierge and ops)
// ============================================================================

export type LeadRole = 
  | "artist" 
  | "founder" 
  | "sponsor" 
  | "funder" 
  | "press" 
  | "community" 
  | "other";

export type LeadSource = 
  | "web-chat" 
  | "meta-ads" 
  | "landing-page" 
  | "other";

export interface CreateLeadInput {
  name?: string;
  email?: string;
  role: LeadRole;
  source: LeadSource;
  intent: string;             // e.g. "interested in Code Vibes cohort"
  notes?: string;
}

export interface CreateLeadOutput {
  leadId: string;
  status: "created" | "failed";
}

export interface SuggestOpportunitiesInput {
  role: LeadRole;
  goals: string[];            // freeform descriptions
}

export interface SuggestedOpportunity {
  type: "project" | "event" | "blog" | "joint-venture" | "fund";
  slug: string;
  title: string;
  url: string;
  reason: string;             // short explanation for user
}

// ============================================================================
// PROJECTS SEED DATA
// ============================================================================

export const PROJECTS_SEED: Project[] = [
  {
    slug: "oakland-tech-week",
    name: "Oakland Tech Week",
    type: "initiative",
    isPrimary: true,
    shortTagline: "Where culture meets innovation",
    description: "Oakland Tech Week brings together technologists, artists, founders, and community to celebrate Oakland's unique position at the intersection of culture and innovation.",
    status: "active",
    primaryUrl: "https://oaklandtechweek.com",
  },
  {
    slug: "code-vibes",
    name: "Code Vibes",
    type: "accelerator",
    isPrimary: true,
    shortTagline: "Agents are for artists. Agents are for activists. Agents are for all of us.",
    description: "Code Vibes is HiiiWAV's flagship program teaching creators, activists, and changemakers how to build AI-powered tools and software agents that serve their communities.",
    status: "active",
  },
  {
    slug: "hiiiwav-fest",
    name: "HiiiWAV FEST",
    type: "festival",
    isPrimary: true,
    shortTagline: "Oakland's creative tech festival",
    description: "HiiiWAV FEST is our signature festival celebrating the intersection of music, art, technology, and community. Live performances, panels, workshops, and more.",
    status: "active",
  },
];

// ============================================================================
// FUND SEED DATA
// ============================================================================

export const HIIIWAV_50_FUND: Fund = {
  slug: "hiiiwav-50",
  name: "HiiiWAV 50 Creative Collective Fund",
  tagline: "Full-spectrum capital for artist-founders",
  description: `
HiiiWAV 50 Creative Collective Fund is our flagship capital model designed to support a cohort of 50 artists with funding, housing, services, and ownership.

The fund combines:
- **Endowment capital** for long-term sustainability
- **Real estate** for artist housing and creative spaces
- **Full-spectrum capital** including grants, loans, investments, and guarantees

HiiiWAV 50 is the engine that powers everything we do. Oakland Tech Week, Code Vibes, HiiiWAV FEST, and our Joint Ventures are all expressions of this vision.
  `,
  focusAreas: ["artists", "real estate", "full-spectrum capital", "community ownership"],
  targetAmount: 50000000,
  instruments: ["grants", "low-interest loans", "guarantees", "equity", "program-related investments"],
  capitalPaths: [
    {
      id: "give",
      kind: "give",
      label: "Philanthropic Gift",
      description: "Tax-deductible donations to support artists directly through grants and programming.",
      ctaUrl: "/donate",
    },
    {
      id: "lend",
      kind: "lend",
      label: "Low-Interest Loan",
      description: "Provide patient capital at below-market rates to fund real estate and artist services.",
      minAmount: 100000,
    },
    {
      id: "invest",
      kind: "invest",
      label: "Program-Related Investment",
      description: "Impact-first investments from foundations seeking both social return and capital preservation.",
      minAmount: 250000,
    },
    {
      id: "guarantee",
      kind: "guarantee",
      label: "Loan Guarantee",
      description: "Backstop our real estate and artist loans to unlock additional capital from traditional lenders.",
      minAmount: 500000,
    },
  ],
  relatedProjects: ["oakland-tech-week", "code-vibes", "hiiiwav-fest"],
  relatedJVs: ["choice-scores", "ryan-nicole", "prospect-band", "alphabet-rockers", "sol-affirmations", "soul-slappers"],
};



