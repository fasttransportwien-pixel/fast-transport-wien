import Link from 'next/link';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ServiceCard } from '@/components/ServiceCard';
import { ArrowRight, Clock, ShieldCheck, Tag, Headphones, Star } from 'lucide-react';

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

export default async function HomePage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  const t = await getTranslations({ locale: params.locale, namespace: 'home' });
  const tn = await getTranslations({ locale: params.locale, namespace: 'nav' });
  const tc = await getTranslations({ locale: params.locale, namespace: 'common' });

  const reviews = (t.raw('reviews') as any[]) || [];
  const faq = (t.raw('faq') as any[]) || [];

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="hero-pattern absolute inset-0 -z-10 opacity-60" />
        <div className="container-page grid gap-10 py-20 md:grid-cols-2 md:py-28">
          <div className="flex flex-col justify-center">
            <span className="section-eyebrow">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
              {t('heroEyebrow')}
            </span>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight text-ink-800 md:text-5xl">
              {t('heroTitle')}
            </h1>
            <p className="mt-5 max-w-xl text-lg text-ink-500">{t('heroSubtitle')}</p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href={`/${params.locale}/auftrag`} className="btn-primary">
                {tc('ctaOrder')} <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href={`/${params.locale}/kontakt`} className="btn-secondary">
                {tc('ctaContact')}
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-ink-500">
              <span className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-brand-600" />
                {params.locale === 'de' ? 'Versichert & seriös' : 'Insured & trustworthy'}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-brand-600" />
                {params.locale === 'de' ? 'Same-Day & Express' : 'Same-day & express'}
              </span>
              <span className="flex items-center gap-2">
                <Tag className="h-4 w-4 text-brand-600" />
                {params.locale === 'de' ? 'Faire Festpreise' : 'Fair fixed prices'}
              </span>
            </div>
          </div>

          {/* Hero card — sample order quote */}
          <div className="relative">
            <div className="card relative overflow-hidden p-6 md:p-8">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-400 via-brand-500 to-brand-700" />
              <p className="text-xs font-bold uppercase tracking-wide text-brand-600">
                {params.locale === 'de' ? 'Beispielbestellung' : 'Sample quote'}
              </p>
              <h3 className="mt-2 text-lg font-bold text-ink-800">
                {params.locale === 'de'
                  ? '3 Lieferadressen · Express'
                  : '3 delivery stops · Express'}
              </h3>
              <ul className="mt-5 space-y-3 text-sm">
                <li className="flex items-start justify-between gap-3">
                  <span className="text-ink-600">
                    {params.locale === 'de' ? '3 × 25 € pro Adresse' : '3 × €25 per address'}
                  </span>
                  <span className="font-semibold text-ink-800">75,00 €</span>
                </li>
                <li className="flex items-start justify-between gap-3">
                  <span className="text-ink-600">
                    {params.locale === 'de' ? 'Express-Zuschlag' : 'Express surcharge'}
                  </span>
                  <span className="font-semibold text-ink-800">15,00 €</span>
                </li>
                <li className="flex items-start justify-between gap-3 text-brand-700">
                  <span>{params.locale === 'de' ? 'Rabatt FTW20' : 'Discount FTW20'}</span>
                  <span className="font-semibold">−15,00 €</span>
                </li>
                <li className="border-t border-ink-100 pt-3" />
                <li className="flex items-start justify-between gap-3">
                  <span className="text-sm font-bold text-ink-800">
                    {tc('total')} {tc('incVat')}
                  </span>
                  <span className="text-2xl font-extrabold text-brand-600">75,00 €</span>
                </li>
              </ul>
              <Link
                href={`/${params.locale}/auftrag`}
                className="btn-primary mt-7 w-full"
              >
                {tc('ctaOrder')}
              </Link>
              <p className="mt-3 text-center text-xs text-ink-400">
                {params.locale === 'de'
                  ? 'Spare bis zu 20% mit Code FTW20'
                  : 'Save up to 20% with code FTW20'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="border-y border-ink-100 bg-white">
        <div className="container-page flex flex-wrap items-center justify-center gap-x-10 gap-y-3 py-6 text-xs font-semibold uppercase tracking-wide text-ink-400">
          <span>{t('trustBar')}</span>
          <span aria-hidden>•</span>
          <span>Media for Med Magazine Service GmbH</span>
          <span aria-hidden>•</span>
          <span>Wiener Apotheken</span>
          <span aria-hidden>•</span>
          <span>Wiener Floristen</span>
          <span aria-hidden>•</span>
          <span>Eventagenturen</span>
        </div>
      </section>

      {/* SERVICES */}
      <section className="container-page py-20">
        <div className="mx-auto max-w-2xl text-center">
          <span className="section-eyebrow">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-500" /> {tn('services')}
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-ink-800 md:text-4xl">
            {params.locale === 'de'
              ? 'Was wir für dich liefern'
              : 'What we deliver for you'}
          </h2>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICE_KINDS.map((k) => (
            <ServiceCard key={k} kind={k} />
          ))}
        </div>
      </section>

      {/* WHY */}
      <section className="bg-ink-50/60 py-20">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-extrabold text-ink-800 md:text-4xl">{t('whyTitle')}</h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {[
              { key: 'fast', icon: Clock },
              { key: 'reliable', icon: ShieldCheck },
              { key: 'transparent', icon: Tag },
              { key: 'personal', icon: Headphones },
            ].map(({ key, icon: Icon }) => (
              <div key={key} className="card p-6">
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-ink-800">
                  {t(`whyItems.${key}.title` as any)}
                </h3>
                <p className="mt-2 text-sm text-ink-500">{t(`whyItems.${key}.body` as any)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="container-page py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold text-ink-800 md:text-4xl">{t('reviewsTitle')}</h2>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {reviews.map((r, i) => (
            <figure key={i} className="card p-6">
              <div className="flex items-center gap-1 text-brand-600">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <blockquote className="mt-3 text-sm text-ink-700">“{r.quote}”</blockquote>
              <figcaption className="mt-4">
                <div className="text-sm font-bold text-ink-800">{r.name}</div>
                <div className="text-xs text-ink-500">{r.role}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-ink-50/60 py-20">
        <div className="container-page mx-auto max-w-3xl">
          <h2 className="text-3xl font-extrabold text-ink-800 md:text-4xl">{t('faqTitle')}</h2>
          <div className="mt-8 space-y-3">
            {faq.map((f, i) => (
              <details key={i} className="card group p-5 open:shadow-md">
                <summary className="flex cursor-pointer list-none items-center justify-between text-base font-semibold text-ink-800">
                  {f.q}
                  <span className="text-brand-600 transition group-open:rotate-45">＋</span>
                </summary>
                <p className="mt-3 text-sm text-ink-600">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="container-page py-20">
        <div className="rounded-3xl bg-ink-800 p-10 text-white md:p-14">
          <div className="grid gap-6 md:grid-cols-3 md:items-center">
            <div className="md:col-span-2">
              <h2 className="text-3xl font-extrabold md:text-4xl">{t('ctaBanner.title')}</h2>
              <p className="mt-3 max-w-xl text-white/70">{t('ctaBanner.body')}</p>
            </div>
            <div className="flex md:justify-end">
              <Link href={`/${params.locale}/auftrag`} className="btn-primary text-base">
                {t('ctaBanner.cta')} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
