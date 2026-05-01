import { setRequestLocale, getTranslations } from 'next-intl/server';

export default async function PrivacyPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  const t = await getTranslations({ locale: params.locale, namespace: 'legal' });
  const isDE = params.locale === 'de';

  return (
    <section className="container-page py-16 md:py-20">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-extrabold text-ink-800 md:text-4xl">{t('privacyTitle')}</h1>
        <div className="prose mt-6 max-w-none text-ink-700">
          {isDE ? (
            <>
              <h2>1. Verantwortlicher</h2>
              <p>
                Fast Transport Wien E.U., Walter/Jurmann/Gasse 5A/4/16, 1230 Wien,
                fasttransportwien@gmail.com.
              </p>
              <h2>2. Verarbeitete Daten</h2>
              <p>
                Wir verarbeiten ausschließlich die Daten, die du im Bestell- oder Kontaktformular
                angibst (Name, E-Mail, Telefon, Adressen, Anweisungen) sowie technisch notwendige
                Logdaten (IP-Adresse, Datum, Uhrzeit), damit unsere Website sicher funktioniert.
              </p>
              <h2>3. Zweck</h2>
              <p>
                Bearbeitung deiner Anfrage, Durchführung des Transportes, Rechnungslegung,
                Kommunikation, Erfüllung gesetzlicher Pflichten (z. B. Aufbewahrung von Belegen).
              </p>
              <h2>4. Empfänger</h2>
              <p>
                Daten werden grundsätzlich nicht an Dritte weitergegeben, außer an Steuerberater,
                Behörden und Hosting-Dienstleister im notwendigen Umfang.
              </p>
              <h2>5. Speicherdauer</h2>
              <p>
                Aufträge: 7 Jahre (Aufbewahrungspflicht §§ 132 BAO). Kontaktanfragen: 6 Monate.
              </p>
              <h2>6. Deine Rechte</h2>
              <p>
                Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit und
                Widerspruch nach DSGVO – jederzeit per E-Mail an uns.
              </p>
              <h2>7. Cookies</h2>
              <p>
                Wir verwenden ausschließlich technisch notwendige Cookies. Es findet kein Tracking
                und keine Werbung statt.
              </p>
            </>
          ) : (
            <>
              <h2>1. Controller</h2>
              <p>
                Fast Transport Wien E.U., Walter/Jurmann/Gasse 5A/4/16, 1230 Vienna,
                fasttransportwien@gmail.com.
              </p>
              <h2>2. Data we process</h2>
              <p>
                We only process data you enter in the order or contact form (name, email, phone,
                addresses, instructions) and technically required log data (IP address, date,
                time) so that our website works securely.
              </p>
              <h2>3. Purpose</h2>
              <p>
                Processing your request, performing the transport, invoicing, communication,
                fulfilling legal obligations (e.g. retention of receipts).
              </p>
              <h2>4. Recipients</h2>
              <p>
                Data is not shared with third parties, except with our tax advisor, authorities
                and hosting providers to the extent necessary.
              </p>
              <h2>5. Retention</h2>
              <p>
                Orders: 7 years (Austrian retention rules § 132 BAO). Contact requests: 6 months.
              </p>
              <h2>6. Your rights</h2>
              <p>
                Information, rectification, erasure, restriction, portability and objection under
                GDPR – just write to us.
              </p>
              <h2>7. Cookies</h2>
              <p>We only use technically required cookies. No tracking, no ads.</p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
