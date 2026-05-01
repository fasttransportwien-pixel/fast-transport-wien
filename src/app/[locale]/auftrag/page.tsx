import { setRequestLocale, getTranslations } from 'next-intl/server';
import { OrderForm } from '@/components/OrderForm';
import { GoogleMapsLoader } from '@/components/GoogleMapsLoader';

export default async function OrderPage({
  params,
  searchParams,
}: {
  params: { locale: string };
  searchParams: { service?: string };
}) {
  setRequestLocale(params.locale);
  const t = await getTranslations({ locale: params.locale, namespace: 'order' });

  return (
    <section className="container-page py-12 md:py-16">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-3xl font-extrabold text-ink-800 md:text-4xl">{t('title')}</h1>
        <p className="mt-3 text-base text-ink-500">{t('subtitle')}</p>
      </div>
      <div className="mt-10">
        <GoogleMapsLoader />
        <OrderForm initialService={searchParams.service} />
      </div>
    </section>
  );
}
