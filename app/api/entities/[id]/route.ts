import { NextResponse } from 'next/server'
import { db } from '@/db'
import { entities } from '@/db/schema'
import { eq } from 'drizzle-orm'

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const [entity] = await db.select().from(entities).where(eq(entities.id, parseInt(id)))
    
    if (!entity) {
      return NextResponse.json({ error: 'Entity not found' }, { status: 404 })
    }
    
    return NextResponse.json(entity)
  } catch (error) {
    console.error('Error fetching entity:', error)
    return NextResponse.json({ error: 'Failed to fetch entity' }, { status: 500 })
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await req.json()
    
    const [entity] = await db.update(entities)
      .set({
        slug: body.slug,
        name: body.name,
        type: body.type,
        bio: body.bio || null,
        shortBio: body.shortBio || null,
        image: body.image || null,
        website: body.website || null,
        socialLinks: body.socialLinks || null,
        genre: body.genre || null,
        role: body.role || null,
        active: body.active ?? true,
        updatedAt: new Date(),
      })
      .where(eq(entities.id, parseInt(id)))
      .returning()
    
    if (!entity) {
      return NextResponse.json({ error: 'Entity not found' }, { status: 404 })
    }
    
    return NextResponse.json(entity)
  } catch (error) {
    console.error('Error updating entity:', error)
    return NextResponse.json({ error: 'Failed to update entity' }, { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await db.delete(entities).where(eq(entities.id, parseInt(id)))
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting entity:', error)
    return NextResponse.json({ error: 'Failed to delete entity' }, { status: 500 })
  }
}

