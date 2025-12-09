import { NextResponse } from 'next/server';
import { getDeckContent, updateDeckContent, resetDeckContent, DeckContent } from '@/lib/deck-content';
import { db } from '@/db';
import { deckVersions } from '@/db/schema';

export async function GET() {
  try {
    const content = getDeckContent();
    return NextResponse.json(content);
  } catch (error) {
    console.error('Error fetching deck content:', error);
    return NextResponse.json({ error: 'Failed to fetch content' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json() as { content?: Partial<DeckContent>; description?: string } | Partial<DeckContent>;
    
    // Support both { content, description } format and direct content format
    let contentToUpdate: Partial<DeckContent>;
    let description: string | undefined;
    
    if ('content' in body && typeof body.content === 'object') {
      contentToUpdate = body.content as Partial<DeckContent>;
      description = (body as { description?: string }).description;
    } else {
      contentToUpdate = body as Partial<DeckContent>;
    }
    
    const updatedContent = updateDeckContent(contentToUpdate);
    
    // Auto-save version to database
    try {
      await db.insert(deckVersions).values({
        content: updatedContent,
        description: description || `Manual save at ${new Date().toLocaleString()}`,
      });
    } catch (dbError) {
      // Log but don't fail the request if version save fails
      console.error('Failed to save version to database:', dbError);
    }
    
    return NextResponse.json(updatedContent);
  } catch (error) {
    console.error('Error updating deck content:', error);
    return NextResponse.json({ error: 'Failed to update content' }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    const content = resetDeckContent();
    
    // Save version before reset
    try {
      await db.insert(deckVersions).values({
        content: content,
        description: 'Reset to defaults',
      });
    } catch (dbError) {
      console.error('Failed to save version to database:', dbError);
    }
    
    return NextResponse.json(content);
  } catch (error) {
    console.error('Error resetting deck content:', error);
    return NextResponse.json({ error: 'Failed to reset content' }, { status: 500 });
  }
}

