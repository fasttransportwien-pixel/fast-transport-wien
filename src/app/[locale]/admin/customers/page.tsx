import { setRequestLocale, getTranslations } from 'next-intl/server';
import { prisma } from '@/lib/db';
import { requireAdmin } from '@/lib/admin-guard';

export default async function CustomersPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  await requireAdmin(params.locale);
  const t = await getTranslations({ locale: params.locale, namespace: 'admin' });

  // Aggregate from orders directly (we keep the Customer table but most leads come via orders)
  const grouped = await prisma.order.groupBy({
    by: ['customerEmail', 'customerName'],
    _count: { _all: true },
    _sum: { totalGrossCents: true, adminPriceCents: true },
    orderBy: { _count: { customerEmail: 'desc' } },
    take: 200,
  });

  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-extrabold text-ink-800">{t('customers')}</h1>
      <div className="card overflow-hidden">
        <table className="min-w-full divide-y divide-ink-100 text-sm">
          <thead className="bg-ink-50/60 text-left text-xs font-bold uppercase text-ink-500">
            <tr>
              <th className="px-5 py-3">Kunde</th>
              <th className="px-5 py-3">E-Mail</th>
              <th className="px-5 py-3 text-right">Aufträge</th>
              <th className="px-5 py-3 text-right">Umsatz</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-100">
            {grouped.length === 0 ? (
              <tr><td colSpan={4} className="px-5 py-10 text-center text-ink-400">{t('noResults')}</td></tr>
            ) : grouped.map((g, i) => {
              const sum = (g._sum.adminPriceCents ?? 0) || (g._sum.totalGrossCents ?? 0);
              return (
                <tr key={`${g.customerEmail}-${i}`} className="hover:bg-ink-50">
                  <td className="px-5 py-3 font-semibold text-ink-800">{g.customerName}</td>
                  <td className="px-5 py-3 text-ink-500">{g.customerEmail}</td>
                  <td className="px-5 py-3 text-right tabular-nums">{g._count._all}</td>
                  <td className="px-5 py-3 text-right font-semibold tabular-nums">{(sum / 100).toFixed(2)} €</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
