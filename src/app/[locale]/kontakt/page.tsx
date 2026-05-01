import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Phone, Mail, MapPin } from 'lucide-react';
import { ContactForm } from '@/components/ContactForm';

export default async function ContactPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  const t = await getTranslations({ locale: params.locale, namespace: 'contact' });

  return (
    <section className="container-page py-16 md:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-extrabold text-ink-800 md:text-5xl">{t('title')}</h1>
        <p className="mt-4 text-base text-ink-500">{t('subtitle')}</p>
      </div>
      <div className="mt-12 grid gap-8 md:grid-cols-2">
        <div className="card p-6">
          <ul className="space-y-5 text-sm text-ink-700">
            <li className="flex items-start gap-3">
              <span className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                <Phone className="h-4 w-4" />
              </span>
              <span>
                <span className="block text-xs font-bold uppercase text-ink-400">{t('phoneLabel')}</span>
                <a href="tel:+436764507663" className="font-semibold text-ink-800 hover:text-brand-700">
                  +43 676 4507663
                </a>
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                <Mail className="h-4 w-4" />
              </span>
              <span>
                <span className="block text-xs font-bold uppercase text-ink-400">{t('emailLabel')}</span>
                <a href="mailto:fasttransportwien@gmail.com" className="font-semibold text-ink-800 hover:text-brand-700">
                  fasttransportwien@gmail.com
                </a>
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                <MapPin className="h-4 w-4" />
              </span>
              <span>
                <span className="block text-xs font-bold uppercase text-ink-400">{t('addressLabel')}</span>
                <span className="font-semibold text-ink-800">Walter/Jurmann/Gasse 5A/4/16, 1230 Wien</span>
              </span>
            </li>
          </ul>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
