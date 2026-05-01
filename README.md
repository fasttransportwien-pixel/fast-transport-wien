# Fast Transport Wien E.U. – Website & Bestellsystem

Eine vollständige, produktionsreife Next.js-Webanwendung für **Fast Transport Wien E.U.** mit:

- Mehrsprachiger Website (Deutsch + Englisch)
- Online-Bestellformular mit Live-Preisrechner
- Google-Maps-Integration (Autocomplete + Route + Distanz)
- Backend-Rabattlogik (Code `FTW20`, max. 100 € Rabatt – nicht im Frontend sichtbar)
- Admin-Login mit Dashboard, Auftragsverwaltung, Statusfluss & Preisanpassung
- Automatische E-Mails (Anfrage erhalten / Bestellung bestätigt)
- Automatischer PDF-Rechnungs-Generator im Format der bestehenden FTW-Rechnung
- Cookie-Banner, Impressum, Datenschutz, AGB

## Tech Stack

- **Next.js 14** (App Router, RSC)
- **TypeScript** strikt
- **Tailwind CSS** mit eigener FTW-Brand-Palette (Grün/Dunkelgrau/Weiß)
- **Prisma + SQLite** (für Local Dev), problemlos auf PostgreSQL umstellbar
- **NextAuth.js** (Credentials-Provider) – Admin-Auth mit bcrypt
- **next-intl** für Deutsch/Englisch
- **Nodemailer** für E-Mails
- **pdf-lib** für PDF-Rechnungen
- **Google Maps JS API** (Places + Directions)

---

## Lokales Setup

```bash
# 1) Dependencies installieren (Node 18+)
npm install

# 2) Umgebungsvariablen anlegen
cp .env.example .env
# Dann .env in einem Editor öffnen und mindestens folgende setzen:
#   - NEXTAUTH_SECRET   (z. B. mit `openssl rand -base64 32`)
#   - ADMIN_PASSWORD    (sicheres Passwort)
#   - SMTP_*            (echte SMTP-Daten, sonst werden E-Mails nur geloggt)
#   - NEXT_PUBLIC_GOOGLE_MAPS_API_KEY   (sonst läuft Maps im Fallback)

# 3) Datenbank initialisieren
npx prisma db push          # erstellt prisma/dev.db nach dem Schema
npm run db:seed             # legt Admin-User + Rabattcode an

# 4) Dev-Server starten
npm run dev
```

Anschließend öffnen: <http://localhost:3000/de> (oder `/en`).

Admin-Login: <http://localhost:3000/de/admin/login> mit den Werten aus `.env`
(`ADMIN_EMAIL` / `ADMIN_PASSWORD`).

---

## Wichtige Pfade

```
src/
├── app/
│   ├── layout.tsx                       # Root layout (lädt Inter font + globals.css)
│   ├── globals.css                      # Tailwind base + Brand-Komponentenklassen
│   ├── api/
│   │   ├── auth/[...nextauth]/route.ts  # NextAuth handler
│   │   ├── pricing/route.ts             # Live-Preis (POST)
│   │   ├── orders/route.ts              # Bestellung anlegen + E-Mails
│   │   ├── contact/route.ts             # Kontaktformular
│   │   ├── upload/route.ts              # Datei-Upload (10MB max, weiße Liste)
│   │   ├── admin/orders/[id]/route.ts   # Status/Preis ändern, Kunde benachrichtigen
│   │   ├── admin/orders/[id]/invoice/route.ts  # Rechnung erzeugen
│   │   └── invoices/[id]/pdf/route.ts   # PDF herunterladen
│   └── [locale]/                        # de / en Pages
│       ├── page.tsx                     # Startseite (Hero, Services, Why, Reviews, FAQ, CTA)
│       ├── leistungen/page.tsx          # Service-Übersicht
│       ├── auftrag/page.tsx             # Bestellformular + Maps + Live-Preis
│       ├── kontakt/page.tsx             # Kontakt + Form
│       ├── impressum/page.tsx           # Impressum (DE/EN)
│       ├── datenschutz/page.tsx         # Datenschutz (DE/EN)
│       ├── agb/page.tsx                 # AGB (DE/EN)
│       └── admin/
│           ├── layout.tsx               # Sidebar + Auth-Gate
│           ├── login/page.tsx           # Admin-Login
│           ├── page.tsx                 # Dashboard mit KPIs
│           ├── orders/page.tsx          # Bestellungen (Filter/Suche)
│           ├── orders/[id]/page.tsx     # Auftragsdetails + Editor + Rechnung
│           ├── invoices/page.tsx        # Rechnungs-Liste
│           └── customers/page.tsx       # Kunden-Aggregation
├── components/                          # UI-Komponenten (Header, Footer, Logo, Forms, …)
├── lib/
│   ├── pricing.ts                       # 🔒 Backend-only Preislogik
│   ├── invoice-pdf.ts                   # PDF-Layout (FTW-Format)
│   ├── email.ts                         # Nodemailer + Templates
│   ├── auth.ts                          # NextAuth-Optionen
│   ├── db.ts                            # Prisma-Singleton
│   ├── order-number.ts                  # FTW-YYYY-NNN Generator
│   ├── validators.ts                    # Zod-Schemas
│   ├── utils.ts                         # cn(), formatEuroCents()
│   ├── i18n.ts                          # next-intl getRequestConfig
│   └── i18n-config.ts                   # locales liste
├── messages/                            # Übersetzungen (de.json, en.json)
└── middleware.ts                        # next-intl localePrefix
```

---

## Preis- und Rabattlogik (BACKEND ONLY)

Die exakte Rabattmechanik ist absichtlich nur im Server-Code (`src/lib/pricing.ts`)
und in der `DiscountCode`-DB-Tabelle. Das Frontend bekommt nur:

```ts
{ subtotalGrossCents, discountCents, totalGrossCents, totalNetCents,
  totalVatCents, vatRate, numAddresses, appliedDiscount, discountCodeAccepted }
```

Standardregeln (über `.env` änderbar):

- Mindestpreis: **25 € inkl. MwSt** pro Auftrag
- Standardpreis: **25 € inkl. MwSt** pro Adresse
- Mit Code **FTW20**: effektiver Preis **20 € inkl. MwSt** pro Adresse
- Maximaler Rabatt: **100 €** pro Auftrag
- Zuschläge: **+10 €** bei > 10 kg, **+15 €** Express, **+20 €** Kühlung
- VAT: 20 %

---

## Status-Workflow

```
RECEIVED → IN_REVIEW → CONFIRMED → IN_PROGRESS → DELIVERED
                                       ↘ CANCELLED
```

Der Admin ändert den Status im Auftrags-Detail. Beim Setzen auf `CONFIRMED` mit
"Bestätigen & Kunden benachrichtigen" wird automatisch eine E-Mail mit dem finalen
Brutto-Preis verschickt.

---

## Rechnungen

Rechnungsnummern: **FTW-YYYY-NNN** (sequenziell pro Jahr, dreistellig zero-padded).

Die PDF-Datei wird von `src/lib/invoice-pdf.ts` erzeugt und enthält:

- "Rechnung" Headline mit grünem Trennstrich (Brand-Farbe)
- FTW-Logo (programmatisch gezeichnet, kein Bild-Asset nötig)
- Firmen-Block rechts: Adresse, Tel, E-Mail, UID, IBAN
- Kundendaten
- Leistungsbeschreibung als Liste (z. B. `59 Adressen – 88,50 €`)
- Netto / MwSt 20 % / **Gesamtbetrag** in Brand-Grün
- Zahlungsfrist + Grußformel

Format orientiert sich am beigelegten `FTW_Rechnung_FTW-2026-071.pdf`.

---

## Deployment

Empfohlene Hosting-Variante: **Vercel**.

```bash
# In Vercel Dashboard:
# 1) Repository importieren
# 2) Environment Variables setzen (siehe .env.example)
# 3) Database: SQLite ist nur für Dev – auf Vercel auf PostgreSQL wechseln:
#    a) provider = "postgresql" in prisma/schema.prisma
#    b) DATABASE_URL = postgres://...   (Neon, Supabase, Railway, ...)
#    c) `npx prisma migrate deploy` läuft automatisch im build-Skript
```

Der `build`-Skript (`npm run build`) führt `prisma generate && prisma migrate deploy && next build` aus,
sodass Migrationen beim Deployment angewendet werden.

---

## Tipps für die Praxis

1. **Google Maps API-Key absichern** – im Google Cloud Console restrict by HTTP referer auf die echte Domain.
2. **SMTP**: Bei Gmail wird ein App-Passwort benötigt; Alternativen: Brevo, Postmark, Mailgun.
3. **Backups**: Regelmäßiges Backup der Datenbank, vor allem `Order` & `Invoice`.
4. **DSGVO**: Datenschutz & Cookie-Banner sind generisch vorbereitet – bitte vom eigenen Anwalt prüfen lassen.
5. **Branding**: Echtes Logo-PNG/SVG kann unter `public/logo.svg` ersetzt werden – die Logo-React-Komponente nutzt eine vereinfachte Inline-Variante.

---

## Lizenz

Dieses Projekt wurde individuell für Fast Transport Wien E.U. erstellt.
