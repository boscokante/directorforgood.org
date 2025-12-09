import { anthropic } from '@ai-sdk/anthropic';
import { generateText } from 'ai';
import { NextResponse } from 'next/server';
import { getDeckContent, DeckContent } from '@/lib/deck-content';

const SYSTEM_PROMPT = `You are an AI assistant that helps edit pitch deck content. You receive the current deck content as JSON and a user instruction describing what changes to make.

Your job is to:
1. Understand the user's request
2. Return the modified deck content as valid JSON
3. Provide a brief description of what you changed

The deck structure has:
- cover: { title, tagline, subtagline, url }
- slides: array of slides, each with { id, title, subtitle?, sections?, highlight?, footnote?, image? }
- ask: { amount, items[] }

Each slide section has: { heading?, items[]?, text? }
Each slide image has: { type, placeholder, url? }

IMPORTANT RULES:
- Return ONLY valid JSON in your response
- Preserve the existing structure and IDs unless explicitly asked to change them
- When adding a new slide, generate a unique kebab-case id
- Keep the same formatting style as the existing content
- Be concise in titles and bullet points

Respond with a JSON object in this exact format:
{
  "success": true,
  "content": { ...the full updated deck content... },
  "description": "Brief description of changes made",
  "changes": ["List of specific changes made"]
}

If the request is unclear or cannot be fulfilled, respond with:
{
  "success": false,
  "error": "Explanation of why the request cannot be fulfilled"
}`;

export async function POST(request: Request) {
  try {
    const { instruction, currentContent } = await request.json();

    if (!instruction) {
      return NextResponse.json({ error: 'Instruction is required' }, { status: 400 });
    }

    // Get current content if not provided
    const deckContent = currentContent || getDeckContent();

    const { text } = await generateText({
      model: anthropic('claude-sonnet-4-20250514'),
      system: SYSTEM_PROMPT,
      prompt: `Current deck content:
\`\`\`json
${JSON.stringify(deckContent, null, 2)}
\`\`\`

User instruction: ${instruction}

Please provide the updated deck content as JSON.`,
      maxTokens: 8000,
    });

    // Parse the AI response
    let result;
    try {
      // Try to extract JSON from the response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        result = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('No JSON found in response');
      }
    } catch (parseError) {
      console.error('Failed to parse AI response:', text);
      return NextResponse.json({
        success: false,
        error: 'Failed to parse AI response. Please try rephrasing your request.',
        rawResponse: text,
      }, { status: 500 });
    }

    if (!result.success) {
      return NextResponse.json(result, { status: 400 });
    }

    // Validate the content structure
    if (!result.content || !result.content.cover || !result.content.slides || !result.content.ask) {
      return NextResponse.json({
        success: false,
        error: 'AI returned invalid deck structure',
      }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      content: result.content,
      description: result.description || 'Changes applied',
      changes: result.changes || [],
    });
  } catch (error) {
    console.error('Error in AI edit:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to process AI edit',
    }, { status: 500 });
  }
}
