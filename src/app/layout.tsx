import './globals.css';

import { ClerkProvider } from '@clerk/nextjs';
import { Provider as RollbarProvider } from '@rollbar/react';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';
import { Suspense } from 'react';

import Footer from '@/components/Footer';
import { Header } from '@/components/Header';
import { PostHogProvider } from '@/posthog';
import { clientConfig } from '@/rollbar';

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
        <link
          rel="icon"
          href="/favicon-64x64.png"
          sizes="64x64"
          type="image/png"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-dvh bg-background`}>
        <div id="build-info" aria-hidden="true" className="hidden">
          COMMIT_REF: {process.env.COMMIT_REF}
          BUILD_ID: {process.env.BUILD_ID}
        </div>
        <ClerkProvider>
          <PostHogProvider>
            <RollbarProvider config={clientConfig}>
              <Suspense>
                <Header />
                <NextTopLoader showSpinner={false} color="hsl(var(--brand))" />
                <div className="flex-grow h-full">
                  <main className="container mx-auto px-4 py-8">
                    {children}
                  </main>
                </div>
                <Footer />
              </Suspense>
            </RollbarProvider>
          </PostHogProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
