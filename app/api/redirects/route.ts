import { NextResponse } from 'next/server'
import { db } from '@/db'
import { redirects } from '@/db/schema'
import { desc, eq } from 'drizzle-orm'

export async function GET() {
  try {
    const allRedirects = await db
      .select()
      .from(redirects)
      .orderBy(desc(redirects.hitCount), desc(redirects.createdAt))

    return NextResponse.json(allRedirects)
  } catch (error) {
    console.error('Error fetching redirects:', error)
    return NextResponse.json({ error: 'Failed to fetch redirects' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()

    // Normalize source URL to ensure it starts with /
    const sourceUrl = body.sourceUrl.startsWith('/') ? body.sourceUrl : `/${body.sourceUrl}`

    const [redirect] = await db
      .insert(redirects)
      .values({
        sourceUrl,
        destinationUrl: body.destinationUrl,
        statusCode: body.statusCode || 301,
        enabled: body.enabled ?? true,
        notes: body.notes || null,
      })
      .returning()

    return NextResponse.json(redirect)
  } catch (error: any) {
    console.error('Error creating redirect:', error)
    if (error.code === '23505') {
      return NextResponse.json(
        { error: 'A redirect for this source URL already exists' },
        { status: 409 }
      )
    }
    return NextResponse.json({ error: 'Failed to create redirect' }, { status: 500 })
  }
}

