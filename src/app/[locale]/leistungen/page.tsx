import { setRequestLocale, getTranslations } from 'next-intl/server';
import { ServiceCard } from '@/components/ServiceCard';

const SERVICE_KINDS = [
  'PACKAGE',
  'FLOWERS',
  'DOCUMENTS',
  'MAGAZINES',
  'STORE_PICKUP',
  'EXPRESS',
  'COOLING',
  'BUSINESS',
];

export default async function ServicesPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  const t = await getTranslations({ locale: params.locale, namespace: 'services' });

  return (
    <section className="container-page py-16 md:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <span className="section-eyebrow">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-500" /> Wien
        </span>
        <h1 className="mt-3 text-4xl font-extrabold text-ink-800 md:text-5xl">{t('title')}</h1>
        <p className="mt-4 text-base text-ink-500">{t('subtitle')}</p>
      </div>
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICE_KINDS.map((k) => (
          <ServiceCard key={k} kind={k} />
        ))}
      </div>
    </section>
  );
}
