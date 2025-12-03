import { NextResponse } from 'next/server'
import { db } from '@/db'
import { redirects } from '@/db/schema'
import { eq } from 'drizzle-orm'

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const [redirect] = await db
      .select()
      .from(redirects)
      .where(eq(redirects.id, parseInt(id)))

    if (!redirect) {
      return NextResponse.json({ error: 'Redirect not found' }, { status: 404 })
    }

    return NextResponse.json(redirect)
  } catch (error) {
    console.error('Error fetching redirect:', error)
    return NextResponse.json({ error: 'Failed to fetch redirect' }, { status: 500 })
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await req.json()

    const sourceUrl = body.sourceUrl.startsWith('/') ? body.sourceUrl : `/${body.sourceUrl}`

    const [redirect] = await db
      .update(redirects)
      .set({
        sourceUrl,
        destinationUrl: body.destinationUrl,
        statusCode: body.statusCode || 301,
        enabled: body.enabled ?? true,
        notes: body.notes || null,
        updatedAt: new Date(),
      })
      .where(eq(redirects.id, parseInt(id)))
      .returning()

    if (!redirect) {
      return NextResponse.json({ error: 'Redirect not found' }, { status: 404 })
    }

    return NextResponse.json(redirect)
  } catch (error: any) {
    console.error('Error updating redirect:', error)
    if (error.code === '23505') {
      return NextResponse.json(
        { error: 'A redirect for this source URL already exists' },
        { status: 409 }
      )
    }
    return NextResponse.json({ error: 'Failed to update redirect' }, { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const [deleted] = await db
      .delete(redirects)
      .where(eq(redirects.id, parseInt(id)))
      .returning()

    if (!deleted) {
      return NextResponse.json({ error: 'Redirect not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting redirect:', error)
    return NextResponse.json({ error: 'Failed to delete redirect' }, { status: 500 })
  }
}

