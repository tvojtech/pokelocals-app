import './globals.css';

import { Provider as RollbarProvider } from '@rollbar/react';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { SessionProvider } from 'next-auth/react';
import NextTopLoader from 'nextjs-toploader';
import { Suspense } from 'react';

import Footer from '@/app/components/Footer';
import { Header } from '@/app/components/Header';
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
  title: 'PTCG Pairings',
  description: 'Online pairings for your local PTCG tournament.',
  icons: {
    icon: '/images/favicon.svg',
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
        <link rel="icon" href="/images/favicon.svg" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-dvh bg-background`}>
        <div id="build-info" aria-hidden="true" className="hidden">
          COMMIT_REF: {process.env.COMMIT_REF}
          BUILD_ID: {process.env.BUILD_ID}
        </div>
        <SessionProvider>
          <RollbarProvider config={clientConfig}>
            <Suspense>
              <Header />
              <NextTopLoader showSpinner={false} color="hsl(var(--brand))" />
              <div className="flex-grow h-full">
                <main className="container mx-auto px-4 py-8">{children}</main>
              </div>
              <Footer />
            </Suspense>
          </RollbarProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
