import './globals.css';

import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { SessionProvider } from 'next-auth/react';
import { Suspense } from 'react';

import Footer from '@/app/components/Footer';
import { Header } from '@/app/components/Header';

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
  description:
    'Simple tool for distributing pairing information for PTCG tournaments',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-dvh bg-background`}>
        <SessionProvider>
          <Suspense>
            <Header />
            <div className="flex-grow h-full">
              <main className="container mx-auto px-4 py-8">{children}</main>
            </div>

            <Footer />
          </Suspense>
        </SessionProvider>
      </body>
    </html>
  );
}
