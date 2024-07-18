import { NextApiRequest, NextApiResponse } from 'next';
import { generateReceiptPdf } from '@/utils/generateReceipt';
import { sendEmail } from '@/utils/nodemailer';
import { SaleDetailsType } from '@/app/types/dashboardTypes/types';

export async function POST(req: NextApiRequest, res: NextApiResponse) {
    const saleDetails: SaleDetailsType = req.body;

    try {
      const pdf = await generateReceiptPdf(saleDetails);

      await sendEmail(
        saleDetails.customerEmail,
        'Your Receipt',
        'Please find your receipt attached.',
        [{ filename: 'receipt.pdf', content: pdf }]
      );

      res.status(200).json({ message: 'Receipt sent successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error sending receipt', error });
    }
};
