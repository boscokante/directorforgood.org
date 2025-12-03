import { NextResponse } from 'next/server'
import { db } from '@/db'
import { redirects } from '@/db/schema'

interface ImportRedirect {
  source: string
  target: string
  code?: number
  notes?: string
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { redirectsList, format } = body as {
      redirectsList: ImportRedirect[] | string
      format: 'json' | 'csv' | 'wordpress'
    }

    let parsedRedirects: ImportRedirect[] = []

    if (format === 'json') {
      // Direct JSON array
      parsedRedirects = Array.isArray(redirectsList)
        ? redirectsList
        : JSON.parse(redirectsList as string)
    } else if (format === 'csv') {
      // CSV format: source,target,code(optional)
      const lines = (redirectsList as string).trim().split('\n')
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
      // WordPress Redirection plugin JSON export format
      const wpData = typeof redirectsList === 'string' ? JSON.parse(redirectsList) : redirectsList
      
      // Handle both array format and object with redirects property
      const wpRedirects = Array.isArray(wpData) ? wpData : wpData.redirects || []
      
      parsedRedirects = wpRedirects.map((r: any) => ({
        source: r.url || r.source_url || r.source,
        target: r.action_data?.url || r.target_url || r.target,
        code: r.action_code || r.status_code || 301,
        notes: r.title || r.notes || undefined,
      }))
    }

    // Filter out invalid redirects
    parsedRedirects = parsedRedirects.filter(
      (r) => r.source && r.target && r.source !== r.target
    )

    if (parsedRedirects.length === 0) {
      return NextResponse.json(
        { error: 'No valid redirects found in import data' },
        { status: 400 }
      )
    }

    // Prepare values for insert
    const values = parsedRedirects.map((r) => ({
      sourceUrl: r.source.startsWith('/') ? r.source : `/${r.source}`,
      destinationUrl: r.target,
      statusCode: r.code || 301,
      enabled: true,
      notes: r.notes || null,
    }))

    // Use onConflictDoNothing to skip duplicates
    const result = await db
      .insert(redirects)
      .values(values)
      .onConflictDoNothing({ target: redirects.sourceUrl })
      .returning()

    return NextResponse.json({
      imported: result.length,
      skipped: parsedRedirects.length - result.length,
      total: parsedRedirects.length,
    })
  } catch (error) {
    console.error('Error importing redirects:', error)
    return NextResponse.json(
      { error: 'Failed to import redirects. Check the format of your data.' },
      { status: 500 }
    )
  }
}

