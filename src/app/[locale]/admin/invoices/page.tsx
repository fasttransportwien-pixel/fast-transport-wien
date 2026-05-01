import { setRequestLocale, getTranslations } from 'next-intl/server';
import { prisma } from '@/lib/db';
import { formatDate, formatEuroCents } from '@/lib/utils';
import { requireAdmin } from '@/lib/admin-guard';

export default async function InvoicesPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  await requireAdmin(params.locale);
  const t = await getTranslations({ locale: params.locale, namespace: 'admin' });

  const invoices = await prisma.invoice.findMany({
    take: 200,
    orderBy: { issuedAt: 'desc' },
    include: { order: { select: { orderNumber: true, customerName: true } } },
  });

  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-extrabold text-ink-800">{t('invoices')}</h1>
      <div className="card overflow-hidden">
        <table className="min-w-full divide-y divide-ink-100 text-sm">
          <thead className="bg-ink-50/60 text-left text-xs font-bold uppercase text-ink-500">
            <tr>
              <th className="px-5 py-3">Rechnung</th>
              <th className="px-5 py-3">Auftrag</th>
              <th className="px-5 py-3">Kunde</th>
              <th className="px-5 py-3">Datum</th>
              <th className="px-5 py-3 text-right">Brutto</th>
              <th className="px-5 py-3 text-right">PDF</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-100">
            {invoices.length === 0 ? (
              <tr><td colSpan={6} className="px-5 py-10 text-center text-ink-400">{t('noResults')}</td></tr>
            ) : invoices.map((i) => (
              <tr key={i.id} className="hover:bg-ink-50">
                <td className="px-5 py-3 font-mono text-xs">{i.invoiceNumber}</td>
                <td className="px-5 py-3 font-mono text-xs text-ink-500">{i.order.orderNumber}</td>
                <td className="px-5 py-3">{i.customerName}</td>
                <td className="px-5 py-3 text-ink-500">{formatDate(i.issuedAt)}</td>
                <td className="px-5 py-3 text-right font-semibold tabular-nums">{formatEuroCents(i.grossCents)}</td>
                <td className="px-5 py-3 text-right">
                  <a href={`/api/invoices/${i.id}/pdf`} target="_blank" rel="noreferrer" className="text-brand-700 hover:underline">
                    PDF
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
