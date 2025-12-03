import { openai } from '@ai-sdk/openai'
import { generateText } from 'ai'
import { NextResponse } from 'next/server'

export const runtime = 'edge'

export async function POST(req: Request) {
  try {
    const { type, content } = await req.json()
    
    let prompt = ''
    
    switch (type) {
      case 'seo-title':
        prompt = `Generate a compelling SEO title (max 60 characters) for this content:\n\n${content}`
        break
      case 'seo-description':
        prompt = `Generate an engaging SEO meta description (max 160 characters) for this content:\n\n${content}`
        break
      case 'excerpt':
        prompt = `Write a compelling excerpt (2-3 sentences) for this content:\n\n${content}`
        break
      case 'tags':
        prompt = `Generate 3-5 relevant tags for this content (comma-separated):\n\n${content}`
        break
      default:
        return NextResponse.json({ error: 'Invalid type' }, { status: 400 })
    }
    
    const { text } = await generateText({
      model: openai('gpt-4o'),
      prompt,
      temperature: 0.7,
    })
    
    return NextResponse.json({ result: text.trim() })
  } catch (error) {
    console.error('AI generation error:', error)
    return NextResponse.json({ error: 'Failed to generate content' }, { status: 500 })
  }
}

