import { NextResponse } from 'next/server'
import { db } from '@/db'
import { redirects } from '@/db/schema'
import { eq, and } from 'drizzle-orm'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const path = searchParams.get('path')

    if (!path) {
      return NextResponse.json(null)
    }

    const [redirect] = await db
      .select()
      .from(redirects)
      .where(and(eq(redirects.sourceUrl, path), eq(redirects.enabled, true)))
      .limit(1)

    if (redirect) {
      // Update hit count asynchronously (fire and forget)
      db.update(redirects)
        .set({
          hitCount: (redirect.hitCount || 0) + 1,
          lastHitAt: new Date(),
        })
        .where(eq(redirects.id, redirect.id))
        .then(() => {})
        .catch(() => {})

      return NextResponse.json({
        destinationUrl: redirect.destinationUrl,
        statusCode: redirect.statusCode,
      })
    }

    return NextResponse.json(null)
  } catch (error) {
    console.error('Error checking redirect:', error)
    return NextResponse.json(null)
  }
}

