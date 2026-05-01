import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { buildInvoicePdf } from '@/lib/invoice-pdf';

export const runtime = 'nodejs';

export async function GET(_req: Request, ctx: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const invoice = await prisma.invoice.findUnique({
    where: { id: ctx.params.id },
    include: { order: true },
  });
  if (!invoice) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const items = [{ label: invoice.description, grossCents: invoice.grossCents }];

  // Build customer address lines
  const customerLines: string[] = [];
  if (invoice.order.customerCompany) customerLines.push(invoice.order.customerCompany);
  customerLines.push(invoice.customerAddress);

  const pdfBytes = await buildInvoicePdf({
    invoiceNumber: invoice.invoiceNumber,
    issuedAt: invoice.issuedAt,
    dueDays: invoice.dueDays,

    customer: {
      name: invoice.customerName,
      addressLines: customerLines.filter(Boolean),
    },

    company: {
      name: 'Fast Transport Wien E.U.',
      addressLines: ['Walter/Jurmann/Gasse 5A/4/16, 1230 Wien'],
      phone: '+43 676 4507663',
      email: 'fasttransportwien@gmail.com',
      uid: 'ATU82169528',
      iban: 'AT95 2011 1844 4323 3703',
    },

    items,
    netCents: invoice.netCents,
    vatCents: invoice.vatCents,
    grossCents: invoice.grossCents,
    locale: 'de',
  });

  return new NextResponse(Buffer.from(pdfBytes), {
    status: 200,
    headers: {
      'content-type': 'application/pdf',
      'content-disposition': `inline; filename="${invoice.invoiceNumber}.pdf"`,
      'cache-control': 'private, max-age=0, must-revalidate',
    },
  });
}
