import { unstable_cacheTag as cacheTag } from 'next/cache';

import { loadTournament } from '@/app/actions/tournament';
import { Alert } from '@/app/components/Alert';
import { Notifications } from '@/app/components/Notifications';
import { QRCodeOverlay } from '@/app/components/QRCodeOverlay';
import { InlinePokemonIdCheckForm } from '@/app/tournaments/[id]/pairings/InlinePokemonIdForm';
import { PageTabs } from '@/app/tournaments/[id]/pairings/PageTabs';

export default async function TournamentPairingsLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  'use cache';
  const { id } = await params;

  cacheTag('tournament:' + id);

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
        {children}
      </div>
    </>
  );
}
