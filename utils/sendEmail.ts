import mailjet from 'node-mailjet';

const mailjetClient = mailjet.apiConnect(
  process.env.MAILJET_API_KEY || '',
  process.env.MAILJET_API_SECRET || ''
);

const sendEmail = async (
  to: string,
  subject: string,
  text: string,
  attachments: { filename: string; content: Buffer }[]
): Promise<void> => {
  if (!process.env.MAILJET_SENDER_EMAIL) {
    throw new Error('MAILJET_SENDER_EMAIL is not defined in environment variables');
  }

  try {
    const request = mailjetClient
      .post('send', { version: 'v3.1' })
      .request({
        Messages: [
          {
            From: {
              Email: process.env.MAILJET_SENDER_EMAIL,
              Name: 'Cannabuis Receipts',
            },
            To: [
              {
                Email: to,
              },
            ],
            Subject: subject,
            TextPart: text,
            Attachments: attachments.map(att => ({
              ContentType: 'application/pdf',
              Filename: att.filename,
              Base64Content: att.content.toString('base64'),
            })),
          },
        ],
      });

    const result = await request;
    console.log('Email sent successfully', result.body);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
};

export default sendEmail;
