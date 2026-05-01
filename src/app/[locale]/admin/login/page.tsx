import { setRequestLocale, getTranslations } from 'next-intl/server';
import { LoginForm } from '@/components/admin/LoginForm';

export default async function LoginPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  const t = await getTranslations({ locale: params.locale, namespace: 'admin' });

  return (
    <section className="container-page py-16 md:py-24">
      <div className="mx-auto max-w-md">
        <h1 className="text-2xl font-extrabold text-ink-800">{t('loginTitle')}</h1>
        <div className="mt-6 card p-6">
          <LoginForm locale={params.locale} />
        </div>
      </div>
    </section>
  );
}
