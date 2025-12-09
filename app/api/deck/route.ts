import { NextResponse } from 'next/server';
import { renderToBuffer } from '@react-pdf/renderer';
import { DirectorPitchDeck } from '@/lib/pdf/deck-pdf';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Generate PDF buffer
    const pdfBuffer = await renderToBuffer(DirectorPitchDeck());
    
    // Return as downloadable PDF
    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="Director-Pitch-Deck.pdf"',
        'Content-Length': pdfBuffer.length.toString(),
      },
    });
  } catch (error) {
    console.error('PDF generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate PDF', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

