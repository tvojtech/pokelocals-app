import './globals.css';

import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';

import Footer from '@/components/Footer';
import { Header } from '@/components/Header';
import { Toaster } from '@/components/ui/sonner';

import { Providers } from './providers';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    template: '%s | POKÉ LOCALS',
    default: 'POKÉ LOCALS',
  },
  description: 'Online pairings for your local Pokémon tournament.',
  openGraph: {
    title: {
      default: 'POKÉ LOCALS',
      template: '%s | POKÉ LOCALS',
    },
    type: 'website',
    locale: 'en_US',
    siteName: 'POKÉ LOCALS',
    images: 'https://app.pokelocals.online/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon-64x64.png" sizes="64x64" type="image/png" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} flex min-h-dvh flex-col bg-background antialiased`}>
        <div id="build-info" aria-hidden="true" className="hidden">
          COMMIT_REF: {process.env.COMMIT_REF}
          BUILD_ID: {process.env.BUILD_ID}
        </div>
        <Providers>
          <Header />
          <NextTopLoader showSpinner={false} color="hsl(var(--brand))" />
          <Toaster richColors position="top-right" swipeDirections={['left', 'right', 'bottom', 'top']} />
          <div className="flex h-full flex-grow">
            <main className="container mx-auto flex-grow px-4 py-8">{children}</main>
          </div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
