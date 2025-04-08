import { Metadata } from 'next';
import { Suspense } from 'react';

import { loadTournament } from '@/actions/tournament';
import { InlinePokemonIdCheckForm } from '@/app/tournaments/[id]/pairings/InlinePokemonIdForm';
import { PageTabs } from '@/app/tournaments/[id]/pairings/PageTabs';
import { Alert } from '@/components/Alert';
import { Notifications } from '@/components/Notifications';
import { QRCodeOverlay } from '@/components/QRCodeOverlay';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  const tournamentResult = await loadTournament(id);

  if (!tournamentResult) {
    return {};
  }

  return {
    title: tournamentResult.tournament.data.name,
    description: 'Pairings for ' + tournamentResult.tournament.data.name,
    openGraph: {
      type: 'website',
      locale: 'en_US',
      siteName: 'POKÉ LOCALS',
      title: tournamentResult.tournament.data.name,
      description: 'Pairings for ' + tournamentResult.tournament.data.name,
      images: 'https://app.pokelocals.online/favicon.svg',
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

  const tournamentResult = await loadTournament(id);

  const showStandings = !!tournamentResult?.tournament.standings;

  return (
    <>
      {tournamentResult && (
        <h1 className="text-left text-3xl font-bold md:text-center">{tournamentResult.tournament.data.name}</h1>
      )}

      <div className="mt-8">
        {(!tournamentResult && (
          <>
            <div className="mb-2 flex items-center justify-end">
              <Notifications />
              <QRCodeOverlay />
            </div>
            <InlinePokemonIdCheckForm />
            <Alert type="warning" message="Tournament not ready yet." className="mt-2" />
          </>
        )) || (
          <div className="flex items-center justify-between">
            <PageTabs showStandings={showStandings} />
            <div className="flex items-center gap-2">
              <Notifications />
              <QRCodeOverlay />
            </div>
          </div>
        )}
        <div className="mt-8">
          <Suspense>{children}</Suspense>
        </div>
      </div>
    </>
  );
}
