import { NextResponse } from 'next/server';
import sendEmail from '@/utils/sendEmail';

export async function POST(request: Request) {
  try {
    const { to, subject, text, attachments } = await request.json();

    // Validate required fields
    if (!to || !subject || !text || !attachments) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Validate attachments
    if (!Array.isArray(attachments) || attachments.some(att => !att.filename || !att.content)) {
      return NextResponse.json({ error: 'Invalid attachments format' }, { status: 400 });
    }

    // Call the function to send the email
    await sendEmail(to, subject, text, attachments);

    return NextResponse.json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
