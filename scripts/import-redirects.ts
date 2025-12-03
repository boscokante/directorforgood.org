/**
 * Import redirects from a file
 * 
 * Usage:
 *   npx tsx scripts/import-redirects.ts <file> [format]
 * 
 * Examples:
 *   npx tsx scripts/import-redirects.ts redirects.json wordpress
 *   npx tsx scripts/import-redirects.ts redirects.csv csv
 *   npx tsx scripts/import-redirects.ts simple.json json
 * 
 * Formats:
 *   wordpress - WordPress Redirection plugin JSON export
 *   json      - Simple JSON: [{"source": "/old", "target": "/new", "code": 301}]
 *   csv       - CSV format: source,target,code (header optional)
 */

import { readFileSync } from 'fs'
import { db } from '../db'
import { redirects } from '../db/schema'
import 'dotenv/config'

interface ParsedRedirect {
  source: string
  target: string
  code: number
  notes?: string
}

async function main() {
  const [, , filePath, format = 'wordpress'] = process.argv

  if (!filePath) {
    console.error('Usage: npx tsx scripts/import-redirects.ts <file> [format]')
    console.error('Formats: wordpress, json, csv')
    process.exit(1)
  }

  console.log(`Reading ${filePath}...`)
  const fileContent = readFileSync(filePath, 'utf-8')

  let parsedRedirects: ParsedRedirect[] = []

  if (format === 'json') {
    const data = JSON.parse(fileContent)
    parsedRedirects = data.map((r: any) => ({
      source: r.source,
      target: r.target,
      code: r.code || 301,
      notes: r.notes,
    }))
  } else if (format === 'csv') {
    const lines = fileContent.trim().split('\n')
    const hasHeader = lines[0]?.toLowerCase().includes('source')
    const dataLines = hasHeader ? lines.slice(1) : lines

    parsedRedirects = dataLines.map((line) => {
      const parts = line.split(',').map((p) => p.trim().replace(/^["']|["']$/g, ''))
      return {
        source: parts[0],
        target: parts[1],
        code: parts[2] ? parseInt(parts[2]) : 301,
      }
    })
  } else if (format === 'wordpress') {
    const wpData = JSON.parse(fileContent)
    const wpRedirects = Array.isArray(wpData) ? wpData : wpData.redirects || []

    parsedRedirects = wpRedirects.map((r: any) => ({
      source: r.url || r.source_url || r.source,
      target: r.action_data?.url || r.target_url || r.target,
      code: r.action_code || r.status_code || 301,
      notes: r.title || undefined,
    }))
  } else {
    console.error(`Unknown format: ${format}`)
    process.exit(1)
  }

  // Filter invalid
  parsedRedirects = parsedRedirects.filter(
    (r) => r.source && r.target && r.source !== r.target
  )

  console.log(`Found ${parsedRedirects.length} valid redirects`)

  if (parsedRedirects.length === 0) {
    console.log('No redirects to import')
    process.exit(0)
  }

  // Prepare for insert
  const values = parsedRedirects.map((r) => ({
    sourceUrl: r.source.startsWith('/') ? r.source : `/${r.source}`,
    destinationUrl: r.target,
    statusCode: r.code,
    enabled: true,
    notes: r.notes || null,
  }))

  console.log('Importing...')

  const result = await db
    .insert(redirects)
    .values(values)
    .onConflictDoNothing({ target: redirects.sourceUrl })
    .returning()

  console.log(`✓ Imported ${result.length} redirects`)
  console.log(`  Skipped ${parsedRedirects.length - result.length} duplicates`)

  process.exit(0)
}

main().catch((err) => {
  console.error('Error:', err)
  process.exit(1)
})

