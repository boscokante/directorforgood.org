import { NextResponse } from 'next/server'
import { db } from '@/db'
import { posts } from '@/db/schema'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    
    const [post] = await db.insert(posts).values({
      slug: body.slug,
      title: body.title,
      excerpt: body.excerpt || null,
      content: body.content,
      coverImage: body.coverImage || null,
      tags: body.tags || [],
      published: body.published || false,
      seoTitle: body.seoTitle || null,
      seoDescription: body.seoDescription || null,
      canonical: body.canonical || null,
    }).returning()
    
    return NextResponse.json(post)
  } catch (error) {
    console.error('Error creating post:', error)
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 })
  }
}




