import { setRequestLocale, getTranslations } from 'next-intl/server';
import { prisma } from '@/lib/db';
import { formatEuroCents, formatDate } from '@/lib/utils';
import Link from 'next/link';
import { StatusPill } from '@/components/admin/StatusPill';
import { requireAdmin } from '@/lib/admin-guard';

export default async function AdminDashboard({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  await requireAdmin(params.locale);

  const t = await getTranslations({ locale: params.locale, namespace: 'admin' });

  const [openOrders, inProgress, deliveredMonth, revenueMonthAgg, latest] = await Promise.all([
    prisma.order.count({ where: { status: { in: ['RECEIVED', 'IN_REVIEW'] } } }),
    prisma.order.count({ where: { status: 'IN_PROGRESS' } }),
    prisma.order.count({
      where: {
        status: 'DELIVERED',
        updatedAt: { gte: monthStart() },
      },
    }),
    prisma.order.aggregate({
      _sum: { totalGrossCents: true, adminPriceCents: true },
      where: {
        status: { in: ['CONFIRMED', 'IN_PROGRESS', 'DELIVERED'] },
        createdAt: { gte: monthStart() },
      },
    }),
    prisma.order.findMany({
      take: 8,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        orderNumber: true,
        customerName: true,
        status: true,
        totalGrossCents: true,
        adminPriceCents: true,
        createdAt: true,
      },
    }),
  ]);

  const revenueMonth =
    (revenueMonthAgg._sum.adminPriceCents ?? 0) || (revenueMonthAgg._sum.totalGrossCents ?? 0);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-extrabold text-ink-800">{t('dashboard')}</h1>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Kpi label={t('kpiOpenOrders')} value={String(openOrders)} />
        <Kpi label={t('kpiInProgress')} value={String(inProgress)} />
        <Kpi label={t('kpiDeliveredMonth')} value={String(deliveredMonth)} />
        <Kpi label={t('kpiRevenueMonth')} value={formatEuroCents(revenueMonth)} accent />
      </div>

      <div className="card overflow-hidden">
        <div className="flex items-center justify-between p-5">
          <h2 className="text-base font-bold text-ink-800">{t('newest')}</h2>
          <Link href={`/${params.locale}/admin/orders`} className="text-sm font-semibold text-brand-700 hover:text-brand-800">
            {t('viewAll')} →
          </Link>
        </div>
        <table className="min-w-full divide-y divide-ink-100 text-sm">
          <thead className="bg-ink-50/60 text-left text-xs font-bold uppercase text-ink-500">
            <tr>
              <th className="px-5 py-3">#</th>
              <th className="px-5 py-3">Kunde</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3">Datum</th>
              <th className="px-5 py-3 text-right">Betrag</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-100">
            {latest.length === 0 ? (
              <tr><td colSpan={5} className="px-5 py-8 text-center text-ink-400">{t('noResults')}</td></tr>
            ) : latest.map((o) => (
              <tr key={o.id} className="hover:bg-ink-50">
                <td className="px-5 py-3 font-mono text-xs">
                  <Link className="text-brand-700 hover:underline" href={`/${params.locale}/admin/orders/${o.id}`}>
                    {o.orderNumber}
                  </Link>
                </td>
                <td className="px-5 py-3">{o.customerName}</td>
                <td className="px-5 py-3"><StatusPill status={o.status as any} locale={params.locale} /></td>
                <td className="px-5 py-3 text-ink-500">{formatDate(o.createdAt)}</td>
                <td className="px-5 py-3 text-right font-semibold tabular-nums">
                  {formatEuroCents(o.adminPriceCents ?? o.totalGrossCents)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Kpi({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="card p-5">
      <p className="text-xs font-bold uppercase tracking-wide text-ink-400">{label}</p>
      <p className={'mt-2 text-2xl font-extrabold ' + (accent ? 'text-brand-600' : 'text-ink-800')}>{value}</p>
    </div>
  );
}

function monthStart() {
  const d = new Date();
  return new Date(d.getFullYear(), d.getMonth(), 1);
}
