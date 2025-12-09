import { openai } from '@ai-sdk/openai'
import { streamText } from 'ai'
import { CHATBOT_SYSTEM_PROMPT } from '@/lib/director-knowledge'

export const runtime = 'edge'

export async function POST(req: Request) {
  const { messages } = await req.json()
  
  const result = streamText({
    model: openai('gpt-4o-mini'),
    messages,
    system: CHATBOT_SYSTEM_PROMPT,
    temperature: 0.7,
  })
  
  return result.toTextStreamResponse()
}

