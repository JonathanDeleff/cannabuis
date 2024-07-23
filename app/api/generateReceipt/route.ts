import { NextResponse } from 'next/server';
import chromium from 'chrome-aws-lambda';
import puppeteer from 'puppeteer-core';

interface SaleItem {
  product_title: string;
  price: number;
  quantity: number;
}

interface SaleDetails {
  date: string;
  customerName: string;
  items: SaleItem[];
  totalCost: number;
}

const generateReceiptPdf = async (saleDetails: SaleDetails): Promise<Buffer> => {
  let browser = null;
  try {
    browser = await puppeteer.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
    });

    const page = await browser.newPage();

    await page.setContent(`
      <html>
        <head>
          <title>Receipt</title>
        </head>
        <body>
          <h1>Receipt</h1>
          <p>Date: ${saleDetails.date}</p>
          <p>Customer: ${saleDetails.customerName}</p>
          <p>Items:</p>
          <ul>
            ${saleDetails.items.map(item => `<li>${item.product_title} - $${item.price} x ${item.quantity}</li>`).join('')}
          </ul>
          <p>Total: $${saleDetails.totalCost}</p>
        </body>
      </html>
    `, { waitUntil: 'networkidle0' });

    const pdf = await page.pdf({
      format: 'a4',
      printBackground: true,
      timeout: 60000,
    });

    return pdf;
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error('Failed to generate PDF');
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};
export async function POST(request: Request) {
  try {
    const saleDetails: SaleDetails = await request.json();
    const pdfBuffer = await generateReceiptPdf(saleDetails);

    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="receipt.pdf"',
      },
    });
  } catch (error) {
    console.error('Failed to generate PDF:', error);
    return new NextResponse(JSON.stringify({ error: 'Failed to generate PDF' }), { status: 500 });
  }
}
