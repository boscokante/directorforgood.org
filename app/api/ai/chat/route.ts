import { openai } from '@ai-sdk/openai'
import { streamText } from 'ai'

export const runtime = 'edge'

export async function POST(req: Request) {
  const { messages } = await req.json()
  
  const result = streamText({
    model: openai('gpt-4o'),
    messages,
    system: `You are a helpful assistant for HIIIWAV.org. 
    Answer questions about the site content, help users navigate, 
    and provide thoughtful responses based on context.`,
    temperature: 0.7,
  })
  
  return result.toTextStreamResponse()
}

