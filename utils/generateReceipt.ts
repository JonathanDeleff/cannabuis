// utils/generateReceiptPdf.ts
import puppeteer from 'puppeteer';
import { SaleDetailsType } from '@/app/types/dashboardTypes/types';

export const generateReceiptPdf = async (saleDetails: SaleDetailsType): Promise<Buffer> => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setContent(`
    <html>
      <head>
        <title>Receipt</title>
      </head>
      <body>
        <h1>Receipt</h1>
        <p>Date: ${saleDetails.date}</p>
        <p>Customer: ${saleDetails.customer}</p>
        <p>Items:</p>
        <ul>
          ${saleDetails.items.map(item => `<li>${item.product_title} - $${item.sell_price}</li>`).join('')}
        </ul>
        <p>Total: $${saleDetails.total}</p>
      </body>
    </html>
  `);

  const pdf = await page.pdf({ format: 'A4' });
  await browser.close();

  return pdf;
};
