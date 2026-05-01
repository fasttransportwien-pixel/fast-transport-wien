import { setRequestLocale, getTranslations } from 'next-intl/server';
import { prisma } from '@/lib/db';
import { formatEuroCents, formatDate } from '@/lib/utils';
import Link from 'next/link';
import { StatusPill } from '@/components/admin/StatusPill';
import { requireAdmin } from '@/lib/admin-guard';

export default async function OrdersListPage({
  params,
  searchParams,
}: {
  params: { locale: string };
  searchParams: { status?: string; q?: string };
}) {
  setRequestLocale(params.locale);
  await requireAdmin(params.locale);
  const t = await getTranslations({ locale: params.locale, namespace: 'admin' });

  const where: any = {};
  if (searchParams.status) where.status = searchParams.status;
  if (searchParams.q) {
    where.OR = [
      { orderNumber: { contains: searchParams.q } },
      { customerName: { contains: searchParams.q } },
      { customerEmail: { contains: searchParams.q } },
    ];
  }

  const orders = await prisma.order.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    take: 100,
    select: {
      id: true, orderNumber: true, customerName: true, customerEmail: true,
      status: true, totalGrossCents: true, adminPriceCents: true, createdAt: true,
    },
  });

  const statuses = ['', 'RECEIVED', 'IN_REVIEW', 'CONFIRMED', 'IN_PROGRESS', 'DELIVERED', 'CANCELLED'];

  return (
    <div className="space-y-5">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-extrabold text-ink-800">{t('orders')}</h1>
        <form className="flex items-center gap-2" action="" method="GET">
          <input
            name="q"
            defaultValue={searchParams.q || ''}
            placeholder={t('search')}
            className="input h-9 w-56 py-1.5 text-sm"
          />
          <select name="status" defaultValue={searchParams.status || ''} className="select h-9 w-44 py-1.5 text-sm">
            {statuses.map((s) => (
              <option key={s} value={s}>{s || `– ${t('filters')} –`}</option>
            ))}
          </select>
          <button className="btn-secondary h-9 py-1.5 text-sm" type="submit">↻</button>
        </form>
      </header>

      <div className="card overflow-hidden">
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
            {orders.length === 0 ? (
              <tr><td colSpan={5} className="px-5 py-12 text-center text-ink-400">{t('noResults')}</td></tr>
            ) : orders.map((o) => (
              <tr key={o.id} className="hover:bg-ink-50">
                <td className="px-5 py-3 font-mono text-xs">
                  <Link className="text-brand-700 hover:underline" href={`/${params.locale}/admin/orders/${o.id}`}>
                    {o.orderNumber}
                  </Link>
                </td>
                <td className="px-5 py-3">
                  <div className="font-semibold text-ink-800">{o.customerName}</div>
                  <div className="text-xs text-ink-500">{o.customerEmail}</div>
                </td>
                <td className="px-5 py-3"><StatusPill status={o.status} locale={params.locale} /></td>
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
