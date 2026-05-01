import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Fast Transport Wien E.U.',
  description:
    'Schnelle Transporte in Wien – zuverlässig, flexibel und persönlich. Kurier, Express, Blumenlieferung, Kühltransport und Firmenkunden.',
  icons: { icon: '/favicon.svg' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
