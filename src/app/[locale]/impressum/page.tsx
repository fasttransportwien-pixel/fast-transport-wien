import { setRequestLocale, getTranslations } from 'next-intl/server';

export default async function ImprintPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  const t = await getTranslations({ locale: params.locale, namespace: 'legal' });

  return (
    <section className="container-page py-16 md:py-20">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-extrabold text-ink-800 md:text-4xl">{t('imprintTitle')}</h1>
        <div className="prose mt-6 max-w-none text-ink-700">
          <p>
            <strong>Fast Transport Wien E.U.</strong>
            <br />
            Walter/Jurmann/Gasse 5A/4/16
            <br />
            1230 Wien, Österreich
          </p>
          <p>
            Tel: +43 676 4507663
            <br />
            E-Mail: fasttransportwien@gmail.com
          </p>
          <p>
            UID-Nummer: ATU82169528
            <br />
            Unternehmensgegenstand: Transport- und Kurierdienste
          </p>
          <p className="text-sm text-ink-500">
            Mitglied der Wirtschaftskammer Wien. Anwendbare Rechtsvorschriften: Gewerbeordnung
            (www.ris.bka.gv.at). Aufsichtsbehörde / Gewerbebehörde: Magistratisches Bezirksamt 23.
          </p>
          <p className="text-sm text-ink-500">
            Online-Streitbeilegung: Verbraucher haben die Möglichkeit, Beschwerden an die Online-
            Streitbeilegungsplattform der EU zu richten:
            <a className="text-brand-700" href="https://ec.europa.eu/odr"> ec.europa.eu/odr</a>.
          </p>
        </div>
      </div>
    </section>
  );
}
