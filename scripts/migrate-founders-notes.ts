/**
 * Founder's Note Migration Script
 * 
 * This script extracts founder's notes from WordPress newsletter pages and
 * migrates them to the new database, preserving:
 * - All text content
 * - Paragraph breaks
 * - Links (with original URLs)
 * - Images
 */

import { config } from 'dotenv'
import { resolve } from 'path'
config({ path: resolve(process.cwd(), '.env.local') })

import postgres from 'postgres'
import { drizzle } from 'drizzle-orm/postgres-js'
import { eq } from 'drizzle-orm'
import * as schema from '../db/schema'

const client = postgres(process.env.DATABASE_URL!)
const db = drizzle(client, { schema })
const { newsletters } = schema

// Newsletter sources - WordPress URLs mapped to issue numbers (CORRECTED ORDER)
// Issue numbers now match chronological order: #1 = oldest, #11 = newest
const NEWSLETTER_SOURCES: Record<number, string> = {
  11: 'https://hiiiwav.org/hiiiwav-2024/',           // Oct 2024 - "The Winners of AFRO AI MVP"
  10: 'https://hiiiwav.org/hiiiwav-2024/',           // Sep 2024 - "AI For Liberation" (same URL, different content)
  9: 'https://hiiiwav.org/hiiiwav-fest-24-recap/',   // Jun 2024 - "HiiiWAV FEST '24 Recap"
  8: 'https://hiiiwav.org/march-magic-afro-ai-mvp-hiiiwav-fest/', // Mar 2024
  7: 'https://hiiiwav.org/a-heartfelt-thanks-to-everyone/',       // Feb 2024
  6: 'https://hiiiwav.org/hiiiwavs-2024-blast-off/',              // Jan 2024
  5: 'https://hiiiwav.org/afro-ai-champs-epic-recap/',            // Dec 2023
  4: 'https://hiiiwav.org/get-ready-for-afro-ai-demo-day-23/',    // Nov 2023
  3: 'https://hiiiwav.org/hiiiwav-2023-hiiilights/',              // Sep 2023
  2: 'https://hiiiwav.org/hiiiwav-studio-secured/',               // Aug 2023
}

interface ExtractedLink {
  text: string
  href: string
}

interface FoundersNote {
  title: string
  greeting: string
  paragraphs: string[]
  signature: string[]
  links: ExtractedLink[]
  images: string[]
}

/**
 * Fetch HTML content from a URL
 */
async function fetchPage(url: string): Promise<string> {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status}`)
  }
  return response.text()
}

/**
 * Extract founder's note section from WordPress HTML
 */
function extractFoundersNoteHTML(html: string): string | null {
  // Try multiple patterns to find the founder's note section
  
  // Pattern 1: Newsletters with "Founder's Note:" heading
  const foundersNotePattern = /<h2[^>]*>Founder.s Note/i
  const foundersNoteMatch = html.match(foundersNotePattern)
  
  if (foundersNoteMatch && foundersNoteMatch.index !== undefined) {
    const startIndex = foundersNoteMatch.index
    const endMatch = html.slice(startIndex).match(/SHARE THIS NEWSLETTER/i)
    if (endMatch && endMatch.index !== undefined) {
      return html.slice(startIndex, startIndex + endMatch.index)
    }
  }
  
  // Pattern 2: Newsletters that start with "Dear HiiiWAV" (Family or Community)
  // Find the section containing the greeting and extract until "Bosko Kante"
  const dearHiiiwavPattern = /Dear HiiiWAV (Family|Community),?\s*(<\/p>|<\/div>)/i
  const dearMatch = html.match(dearHiiiwavPattern)
  
  if (dearMatch && dearMatch.index !== undefined) {
    // Find a reasonable start point (go back to find the section start)
    const searchStart = Math.max(0, dearMatch.index - 2000)
    const sectionStart = html.lastIndexOf('<section', dearMatch.index)
    const actualStart = sectionStart > searchStart ? sectionStart : dearMatch.index - 500
    
    // Find where the founder's letter ends (before main content sections or at signature)
    const fromStart = html.slice(actualStart)
    
    // Look for end patterns: either "SHARE THIS NEWSLETTER" or before a major section heading
    const endPatterns = [
      /SHARE THIS NEWSLETTER/i,
      /<h2[^>]*>.*?(Recap|Thank You|Gallery|Video|FEST|Supporter)/i
    ]
    
    let endIndex = fromStart.length
    for (const pattern of endPatterns) {
      const match = fromStart.match(pattern)
      if (match && match.index !== undefined && match.index < endIndex) {
        endIndex = match.index
      }
    }
    
    // Also look for "Bosko Kante" signature as potential end
    const signatureMatch = fromStart.match(/<p><strong>Bosko Kante<\/strong><\/p>/i)
    if (signatureMatch && signatureMatch.index !== undefined) {
      // Include the signature in the extraction
      endIndex = Math.min(endIndex, signatureMatch.index + signatureMatch[0].length + 200)
    }
    
    return fromStart.slice(0, endIndex)
  }
  
  return null
}

/**
 * Extract all links from HTML content
 */
function extractLinks(html: string): ExtractedLink[] {
  const links: ExtractedLink[] = []
  const linkRegex = /<a[^>]*href="([^"]*)"[^>]*>([^<]*)<\/a>/gi
  
  let match
  while ((match = linkRegex.exec(html)) !== null) {
    const href = match[1].replace(/&amp;/g, '&')
    const text = match[2].trim()
    
    // Skip empty links or navigation links
    if (text && !text.toLowerCase().includes('share this')) {
      links.push({ text, href })
    }
  }
  
  return links
}

/**
 * Extract images from HTML content
 */
function extractImages(html: string): string[] {
  const images: string[] = []
  const imgRegex = /<img[^>]*src="([^"]*)"[^>]*>/gi
  
  let match
  while ((match = imgRegex.exec(html)) !== null) {
    images.push(match[1])
  }
  
  return images
}

/**
 * Extract the title/subtitle from the founder's note heading
 */
function extractTitle(html: string): string {
  // Match "Founder's Note:" followed by optional <br> and the subtitle
  const titleMatch = html.match(/<h2[^>]*>Founder.s Note:?\s*<br\s*\/?>\s*([^<]+)<\/h2>/i)
  if (titleMatch) {
    return titleMatch[1].trim()
  }
  return ''
}

/**
 * Extract text content from HTML, preserving paragraph structure and ORDER
 */
function extractTextContent(html: string): string[] {
  const paragraphs: string[] = []
  const seenContent = new Set<string>()
  
  // Find all content blocks in order - both <p> tags and elementor-widget-container divs
  // This regex matches either a <p> tag OR an elementor div with plain text content
  const contentBlockRegex = /(?:<p[^>]*>([\s\S]*?)<\/p>)|(?:<div class="elementor-widget-container">\s*([^<]+)\s*<\/div>)/gi
  
  let match
  while ((match = contentBlockRegex.exec(html)) !== null) {
    // match[1] is content from <p> tags, match[2] is content from divs
    let content = (match[1] || match[2] || '').trim()
    
    // Skip empty content
    if (!content || content.replace(/&nbsp;/g, '').replace(/\s/g, '') === '') {
      continue
    }
    
    // Replace links with markdown format
    content = content.replace(
      /<a[^>]*href="([^"]*)"[^>]*>([^<]*)<\/a>/gi,
      (_, href, text) => `[${text}](${href.replace(/&amp;/g, '&')})`
    )
    
    // Remove remaining HTML tags
    content = content.replace(/<[^>]+>/g, '')
    
    // Decode HTML entities
    content = decodeHtmlEntities(content)
    
    // Skip very short fragments or duplicates
    if (content && content.length > 10) {
      const contentKey = content.slice(0, 50).toLowerCase()
      if (!seenContent.has(contentKey)) {
        seenContent.add(contentKey)
        paragraphs.push(content)
      }
    }
  }
  
  return paragraphs
}

/**
 * Decode common HTML entities
 */
function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/&quot;/g, '"')
    .replace(/&#8217;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#8211;/g, '–')
    .replace(/&#038;/g, '&')
    .replace(/&hellip;/g, '…')
    .replace(/&mdash;/g, '—')
    .replace(/&ndash;/g, '–')
    .replace(/&rsquo;/g, "'")
    .replace(/&lsquo;/g, "'")
    .replace(/&rdquo;/g, '"')
    .replace(/&ldquo;/g, '"')
    .trim()
}

/**
 * Extract signature (Bosko Kante, Founder and President, etc.)
 */
function extractSignature(html: string): string[] {
  const signature: string[] = []
  
  // Look for the signature section - usually bold text near the end
  const signatureMatch = html.match(/<p><strong>Bosko Kante<\/strong><\/p>\s*<p><strong>([^<]+)<\/strong><\/p>/i)
  
  if (signatureMatch) {
    signature.push('**Bosko Kante**')
    signature.push(`**${signatureMatch[1]}**`)
  } else {
    // Fallback
    signature.push('**Bosko Kante**')
    signature.push('**Founder and President, HiiiWAV**')
  }
  
  return signature
}

/**
 * Parse the founder's note into structured data
 */
function parseFoundersNote(html: string): FoundersNote {
  const title = extractTitle(html)
  const links = extractLinks(html)
  const images = extractImages(html)
  const paragraphs = extractTextContent(html)
  const signature = extractSignature(html)
  
  // The first paragraph should be the greeting (Dear HiiiWAV Family/Community)
  let greeting = 'Dear HiiiWAV Family,'
  if (paragraphs[0]?.toLowerCase().includes('dear hiiiwav')) {
    greeting = paragraphs.shift()!
  }
  
  // Remove signature paragraphs from content if they got included
  const filteredParagraphs = paragraphs.filter(p => 
    !p.includes('Bosko Kante') && 
    !p.includes('Founder and President')
  )
  
  return {
    title,
    greeting,
    paragraphs: filteredParagraphs,
    signature,
    links,
    images
  }
}

/**
 * Convert parsed founder's note to markdown format
 */
function toMarkdown(note: FoundersNote): string {
  const lines: string[] = []
  
  // Title
  if (note.title) {
    lines.push(`## ${note.title}`)
    lines.push('')
  }
  
  // Greeting
  lines.push(note.greeting)
  lines.push('')
  
  // Paragraphs with spacing
  for (const paragraph of note.paragraphs) {
    lines.push(paragraph)
    lines.push('')
    lines.push('&nbsp;')
    lines.push('')
  }
  
  // Remove the last &nbsp; since it's before signature
  if (lines.length > 2 && lines[lines.length - 2] === '&nbsp;') {
    lines.splice(lines.length - 2, 2)
    lines.push('')
  }
  
  // Signature
  for (const line of note.signature) {
    lines.push(line)
    lines.push('')
  }
  
  return lines.join('\n').trim()
}

/**
 * Validate the extracted content
 */
function validateFoundersNote(note: FoundersNote, originalHtml: string): string[] {
  const warnings: string[] = []
  
  // Check for minimum content
  if (note.paragraphs.length < 3) {
    warnings.push(`Warning: Only ${note.paragraphs.length} paragraphs extracted (expected at least 3)`)
  }
  
  // Check that all links from original are in the output
  const originalLinks = extractLinks(originalHtml)
  const markdownContent = toMarkdown(note)
  
  for (const link of originalLinks) {
    if (!markdownContent.includes(link.href)) {
      warnings.push(`Warning: Link "${link.text}" (${link.href}) not found in output`)
    }
  }
  
  // Check for common phrases that should be present
  const expectedPhrases = ['Dear HiiiWAV', 'Bosko']
  for (const phrase of expectedPhrases) {
    if (!markdownContent.includes(phrase)) {
      warnings.push(`Warning: Expected phrase "${phrase}" not found in output`)
    }
  }
  
  return warnings
}

/**
 * Process a single newsletter
 */
async function processNewsletter(issueNumber: number, url: string): Promise<void> {
  console.log(`\n${'='.repeat(60)}`)
  console.log(`Processing Newsletter #${issueNumber}`)
  console.log(`Source: ${url}`)
  console.log('='.repeat(60))
  
  try {
    // Fetch the page
    console.log('\n📥 Fetching page...')
    const html = await fetchPage(url)
    
    // Extract founder's note section
    console.log('🔍 Extracting founder\'s note section...')
    const foundersNoteHtml = extractFoundersNoteHTML(html)
    
    if (!foundersNoteHtml) {
      console.log('❌ Could not find founder\'s note section')
      return
    }
    
    // Parse the content
    console.log('📝 Parsing content...')
    const parsedNote = parseFoundersNote(foundersNoteHtml)
    
    // Convert to markdown
    const markdown = toMarkdown(parsedNote)
    
    // Validate
    console.log('\n✅ Validation:')
    const warnings = validateFoundersNote(parsedNote, foundersNoteHtml)
    
    if (warnings.length === 0) {
      console.log('  All checks passed!')
    } else {
      for (const warning of warnings) {
        console.log(`  ⚠️  ${warning}`)
      }
    }
    
    // Show extracted data summary
    console.log('\n📊 Extracted Data:')
    console.log(`  Title: ${parsedNote.title || '(none)'}`)
    console.log(`  Greeting: ${parsedNote.greeting}`)
    console.log(`  Paragraphs: ${parsedNote.paragraphs.length}`)
    console.log(`  Links: ${parsedNote.links.length}`)
    for (const link of parsedNote.links) {
      console.log(`    - "${link.text}" → ${link.href.slice(0, 60)}...`)
    }
    console.log(`  Images: ${parsedNote.images.length}`)
    
    // Preview the markdown
    console.log('\n📄 Preview (first 500 chars):')
    console.log('---')
    console.log(markdown.slice(0, 500) + (markdown.length > 500 ? '...' : ''))
    console.log('---')
    
    // Check if newsletter exists in database
    const [newsletter] = await db
      .select()
      .from(newsletters)
      .where(eq(newsletters.issueNumber, issueNumber))
    
    if (!newsletter) {
      console.log(`\n❌ Newsletter #${issueNumber} not found in database`)
      return
    }
    
    // Update the database
    console.log(`\n💾 Updating database for "${newsletter.title}"...`)
    await db
      .update(newsletters)
      .set({ 
        foundersNote: markdown,
        updatedAt: new Date()
      })
      .where(eq(newsletters.issueNumber, issueNumber))
    
    console.log('✅ Database updated successfully!')
    
  } catch (error) {
    console.error(`\n❌ Error processing newsletter #${issueNumber}:`, error)
  }
}

/**
 * Main function
 */
async function main() {
  console.log('🚀 Founder\'s Note Migration Tool')
  console.log('================================\n')
  
  const issueNumbers = Object.keys(NEWSLETTER_SOURCES).map(Number)
  console.log(`Found ${issueNumbers.length} newsletter(s) to process: #${issueNumbers.join(', #')}`)
  
  for (const issueNumber of issueNumbers) {
    await processNewsletter(issueNumber, NEWSLETTER_SOURCES[issueNumber])
  }
  
  console.log('\n' + '='.repeat(60))
  console.log('✨ Migration complete!')
  console.log('='.repeat(60))
  
  await client.end()
}

main().catch(console.error)
