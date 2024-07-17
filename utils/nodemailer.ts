import nodemailer from 'nodemailer';

export const sendEmail = async (
  to: string,
  subject: string,
  text: string,
  attachments: { filename: string; content: Buffer }[]
): Promise<void> => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAILERUSER,
      pass: process.env.MAILERPASS,
    },
  });

  const mailOptions = {
    from: 'your-email@gmail.com',
    to,
    subject,
    text,
    attachments,
  };

  await transporter.sendMail(mailOptions);
};
