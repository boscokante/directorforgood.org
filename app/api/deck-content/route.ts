import { NextResponse } from 'next/server';
import { getDeckContent, updateDeckContent, resetDeckContent, DeckContent } from '@/lib/deck-content';

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
    const body = await request.json() as Partial<DeckContent>;
    const updatedContent = updateDeckContent(body);
    return NextResponse.json(updatedContent);
  } catch (error) {
    console.error('Error updating deck content:', error);
    return NextResponse.json({ error: 'Failed to update content' }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    const content = resetDeckContent();
    return NextResponse.json(content);
  } catch (error) {
    console.error('Error resetting deck content:', error);
    return NextResponse.json({ error: 'Failed to reset content' }, { status: 500 });
  }
}

