import "./globals.css";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react";

import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import { PokemonIdForm } from "@/app/components/PokemonIdForm";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PTCG Pairings",
  description:
    "Simple tool for distributing pairing information for PTCG tournaments",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-dvh bg-slate-50`}
      >
        <Suspense>
          <Header />
          <div className="flex-grow grid grid-cols-1 lg:grid-cols-[20rem_1fr] gap-4 h-full">
            <nav className="print:hidden hidden lg:block border-r p-4">
              <PokemonIdForm />
            </nav>
            <main className="container mx-auto px-4 py-8">{children}</main>
          </div>

          <Footer />
        </Suspense>
      </body>
    </html>
  );
}
