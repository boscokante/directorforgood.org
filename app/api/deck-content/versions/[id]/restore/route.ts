import { NextResponse } from 'next/server';
import { db } from '@/db';
import { deckVersions } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { updateDeckContent, DeckContent } from '@/lib/deck-content';

// POST /api/deck-content/versions/[id]/restore - Restore a specific version
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const versionId = parseInt(id, 10);

    if (isNaN(versionId)) {
      return NextResponse.json({ error: 'Invalid version ID' }, { status: 400 });
    }

    // Get the version from the database
    const [version] = await db
      .select()
      .from(deckVersions)
      .where(eq(deckVersions.id, versionId))
      .limit(1);

    if (!version) {
      return NextResponse.json({ error: 'Version not found' }, { status: 404 });
    }

    // Restore the content
    const restoredContent = updateDeckContent(version.content as DeckContent);

    // Create a new version entry for this restore action
    await db.insert(deckVersions).values({
      content: restoredContent,
      description: `Restored from version #${versionId}`,
    });

    return NextResponse.json({
      success: true,
      content: restoredContent,
      message: `Restored from version #${versionId}`,
    });
  } catch (error) {
    console.error('Error restoring deck version:', error);
    return NextResponse.json({ error: 'Failed to restore version' }, { status: 500 });
  }
}
