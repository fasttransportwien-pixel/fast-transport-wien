import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { Logo } from '@/components/Logo';
import { LayoutDashboard, ListOrdered, FileText, Users } from 'lucide-react';
import { SignOutButton } from '@/components/admin/SignOutButton';

export default async function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  setRequestLocale(params.locale);
  const t = await getTranslations({ locale: params.locale, namespace: 'admin' });
  const session = await getServerSession(authOptions);

  const base = `/${params.locale}/admin`;
  const items = [
    { href: `${base}`, label: t('dashboard'), icon: LayoutDashboard },
    { href: `${base}/orders`, label: t('orders'), icon: ListOrdered },
    { href: `${base}/invoices`, label: t('invoices'), icon: FileText },
    { href: `${base}/customers`, label: t('customers'), icon: Users },
  ];

  return (
    <div className="min-h-[60vh] bg-ink-50/40">
      <div className="container-page grid gap-6 py-8 md:grid-cols-[240px_1fr]">
        <aside className="card h-fit p-4">
          <div className="px-2 pb-3"><Logo /></div>
          {session ? (
            <>
              <nav className="space-y-1">
                {items.map(({ href, label, icon: Icon }) => (
                  <Link
                    key={href}
                    href={href}
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-ink-700 hover:bg-ink-100"
                  >
                    <Icon className="h-4 w-4 text-ink-400" />
                    {label}
                  </Link>
                ))}
              </nav>
              <div className="mt-4 border-t border-ink-100 pt-3 text-xs text-ink-500">
                {session.user?.email}
                <SignOutButton locale={params.locale} />
              </div>
            </>
          ) : (
            <p className="px-3 py-2 text-xs text-ink-500">Bitte einloggen.</p>
          )}
        </aside>
        <section>{children}</section>
      </div>
    </div>
  );
}
