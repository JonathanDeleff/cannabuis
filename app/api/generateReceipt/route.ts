import { NextResponse } from 'next/server';
import { chromium } from 'playwright';

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
    browser = await chromium.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
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
          <p>Total: $${saleDetails.totalCost.toFixed(2)}</p>
        </body>
      </html>
    `, { waitUntil: 'networkidle' });

    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
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
