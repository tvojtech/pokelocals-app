import { Metadata } from 'next';
import { Suspense } from 'react';

import { loadTournament, loadTournamentMetadata } from '@/actions/tournament';
import { InlinePokemonIdCheckForm } from '@/app/tournaments/[id]/pairings/InlinePokemonIdForm';
import { PageTabs } from '@/app/tournaments/[id]/pairings/PageTabs';
import { Notifications } from '@/components/Notifications';
import { QRCodeOverlay } from '@/components/QRCodeOverlay';
import { Alert, AlertDescription } from '@/components/ui/alert';

import { TournamentMenu } from './TournamentMenu';

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
    title: tournamentResult.data.name,
    description: 'Pairings for ' + tournamentResult.data.name,
    openGraph: {
      type: 'website',
      locale: 'en_US',
      siteName: 'POKÉ LOCALS',
      title: tournamentResult.data.name,
      description: 'Pairings for ' + tournamentResult.data.name,
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

  const [tournamentResult, tournamentMetadata] = await Promise.all([loadTournament(id), loadTournamentMetadata(id)]);

  return (
    <>
      {tournamentResult && (
        <h1 className="text-left text-xl font-medium md:text-center">{tournamentResult.data.name}</h1>
      )}

      <div className="mt-4">
        {(!tournamentResult && (
          <>
            <div className="mb-2 flex items-center justify-end">
              <Notifications />
              <QRCodeOverlay />
              <TournamentMenu tournament={tournamentMetadata} />
            </div>
            <InlinePokemonIdCheckForm />
            <Alert variant="warning" className="mt-2">
              <AlertDescription>Tournament not ready yet.</AlertDescription>
            </Alert>
          </>
        )) || (
          <div className="flex items-center justify-between">
            <PageTabs />
            <div className="flex items-center gap-2">
              <Notifications />
              <QRCodeOverlay />
              <TournamentMenu tournament={tournamentMetadata} />
            </div>
          </div>
        )}
        <div className="mt-4">
          <Suspense>{children}</Suspense>
        </div>
      </div>
    </>
  );
}
