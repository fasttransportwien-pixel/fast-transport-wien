import { setRequestLocale, getTranslations } from 'next-intl/server';

export default async function TermsPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  const t = await getTranslations({ locale: params.locale, namespace: 'legal' });
  const isDE = params.locale === 'de';

  return (
    <section className="container-page py-16 md:py-20">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-extrabold text-ink-800 md:text-4xl">{t('termsTitle')}</h1>
        <div className="prose mt-6 max-w-none text-ink-700">
          {isDE ? (
            <>
              <h2>1. Geltungsbereich</h2>
              <p>
                Diese AGB gelten für alle Transport- und Kurierleistungen der Fast Transport Wien
                E.U.
              </p>
              <h2>2. Vertragsschluss</h2>
              <p>
                Das Online-Formular ist kein verbindliches Angebot, sondern eine Anfrage. Der
                Vertrag kommt durch die schriftliche Bestätigung durch uns zustande.
              </p>
              <h2>3. Preise & Zahlung</h2>
              <p>
                Alle Preise verstehen sich inkl. 20% MwSt. Der Mindestpreis pro Auftrag beträgt
                25 € inkl. MwSt. Zahlbar innerhalb von 7 Tagen per IBAN-Überweisung.
              </p>
              <h2>4. Haftung</h2>
              <p>
                Wir haften für leichte Fahrlässigkeit nur bis zur Höhe des Auftragswerts; weitere
                Haftung im Rahmen des gesetzlich Zulässigen.
              </p>
              <h2>5. Stornierung</h2>
              <p>
                Stornierung bis 2 Stunden vor geplanter Abholung kostenfrei, danach 50% des
                Auftragswerts.
              </p>
              <h2>6. Rücktrittsrecht (Verbraucher)</h2>
              <p>
                Bei Auftragsdurchführung innerhalb von 14 Tagen entfällt das Rücktrittsrecht mit
                vollständiger Vertragserfüllung gemäß FAGG.
              </p>
              <h2>7. Gerichtsstand</h2>
              <p>Wien, Österreich.</p>
            </>
          ) : (
            <>
              <h2>1. Scope</h2>
              <p>These T&amp;Cs apply to all transport and courier services of Fast Transport Wien E.U.</p>
              <h2>2. Conclusion of contract</h2>
              <p>
                The online form is a request, not a binding offer. The contract is concluded once
                we send our written confirmation.
              </p>
              <h2>3. Prices & payment</h2>
              <p>
                All prices include 20% VAT. The minimum order value is €25 incl. VAT. Payable
                within 7 days via IBAN bank transfer.
              </p>
              <h2>4. Liability</h2>
              <p>
                For slight negligence we are liable only up to the value of the order. Further
                liability within the limits of applicable law.
              </p>
              <h2>5. Cancellation</h2>
              <p>
                Free cancellation up to 2 hours before scheduled pickup; afterwards 50% of the
                order value.
              </p>
              <h2>6. Right of withdrawal (consumers)</h2>
              <p>
                If the order is fully executed within 14 days, the right of withdrawal lapses on
                full performance under FAGG.
              </p>
              <h2>7. Place of jurisdiction</h2>
              <p>Vienna, Austria.</p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
