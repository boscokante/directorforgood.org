import { NextResponse } from 'next/server'
import { db } from '@/db'
import { newsletters } from '@/db/schema'
import { desc, eq } from 'drizzle-orm'

export async function GET() {
  try {
    const allNewsletters = await db
      .select()
      .from(newsletters)
      .orderBy(desc(newsletters.publishedAt))
    
    return NextResponse.json(allNewsletters)
  } catch (error) {
    console.error('Error fetching newsletters:', error)
    return NextResponse.json({ error: 'Failed to fetch newsletters' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    const [newNewsletter] = await db.insert(newsletters).values({
      slug: body.slug,
      title: body.title,
      subtitle: body.subtitle,
      excerpt: body.excerpt,
      content: body.content,
      coverImage: body.coverImage,
      issueNumber: body.issueNumber,
      publishedAt: new Date(body.publishedAt),
      published: body.published ?? true,
      seoTitle: body.seoTitle,
      seoDescription: body.seoDescription,
    }).returning()
    
    return NextResponse.json(newNewsletter, { status: 201 })
  } catch (error) {
    console.error('Error creating newsletter:', error)
    return NextResponse.json({ error: 'Failed to create newsletter' }, { status: 500 })
  }
}
