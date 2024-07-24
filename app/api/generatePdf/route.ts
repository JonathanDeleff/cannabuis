import { NextResponse } from 'next/server';
import { Buffer } from 'buffer';

export async function POST(req: Request) {
  try {
    const { htmlContent } = await req.json();
    const pdfApiKey = process.env.PDFSHIFT_API_KEY; // Use environment variable directly here

    if (!pdfApiKey) {
      return NextResponse.json({ error: 'PDFShift API key is missing.' }, { status: 400 });
    }

    const pdfResponse = await fetch('https://api.pdfshift.io/v3/convert/pdf', {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + Buffer.from(`api:${pdfApiKey}`).toString('base64'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        source: htmlContent,
        // Additional options if needed
      }),
    });

    if (!pdfResponse.ok) {
      const errorText = await pdfResponse.text();
      return NextResponse.json({ error: `Failed to generate receipt PDF. Status: ${pdfResponse.status}, Response: ${errorText}` }, { status: pdfResponse.status });
    }

    const pdfArrayBuffer = await pdfResponse.arrayBuffer();
    const pdfBuffer = Buffer.from(pdfArrayBuffer);

    return NextResponse.json({ pdf: pdfBuffer.toString('base64') });
  } catch (error) {
    console.error('Error generating PDF:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
