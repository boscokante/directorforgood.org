import { NextResponse } from 'next/server'
import { db } from '@/db'
import { entities } from '@/db/schema'
import { desc } from 'drizzle-orm'

export async function GET() {
  try {
    const allEntities = await db.select().from(entities).orderBy(desc(entities.createdAt))
    return NextResponse.json(allEntities)
  } catch (error) {
    console.error('Error fetching entities:', error)
    return NextResponse.json({ error: 'Failed to fetch entities' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    
    const [entity] = await db.insert(entities).values({
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
    }).returning()
    
    return NextResponse.json(entity)
  } catch (error) {
    console.error('Error creating entity:', error)
    return NextResponse.json({ error: 'Failed to create entity' }, { status: 500 })
  }
}

