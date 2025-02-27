import { Metadata } from 'next';
import { Suspense } from 'react';

import { loadTournament } from '@/app/actions/tournament';
import { Alert } from '@/app/components/Alert';
import { Notifications } from '@/app/components/Notifications';
import { QRCodeOverlay } from '@/app/components/QRCodeOverlay';
import { InlinePokemonIdCheckForm } from '@/app/tournaments/[id]/pairings/InlinePokemonIdForm';
import { PageTabs } from '@/app/tournaments/[id]/pairings/PageTabs';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  const tournament = await loadTournament(id);

  if (!tournament) {
    return {};
  }

  return {
    title: tournament?.data.name,
    description: 'Pairings for ' + tournament?.data.name,
    openGraph: {
      type: 'website',
      locale: 'en_US',
      siteName: 'PTCG Pairings',
      title: tournament?.data.name,
      description: 'Pairings for ' + tournament?.data.name,
      images: 'https://ptcg-pairings.netlify.app/images/favicon.svg',
    },
  };
}

export default async function TournamentPairingsLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const tournament = await loadTournament(id);

  const showStandings = !!tournament?.standings;

  return (
    <>
      {tournament && (
        <h1 className="text-3xl font-bold md:text-center text-left">
          {tournament.data.name}
        </h1>
      )}

      <div className="max-w-lg mx-auto mt-8 space-y-10">
        {(!tournament && (
          <>
            <div className="flex justify-end items-center">
              <Notifications />
              <QRCodeOverlay />
            </div>
            <InlinePokemonIdCheckForm />
            <Alert type="warning" message="Tournament not ready yet." />
          </>
        )) || (
          <div className="flex justify-between items-center">
            <PageTabs showStandings={showStandings} />
            <div className="flex items-center gap-2">
              <Notifications />
              <QRCodeOverlay />
            </div>
          </div>
        )}
        <Suspense>{children}</Suspense>
      </div>
    </>
  );
}
