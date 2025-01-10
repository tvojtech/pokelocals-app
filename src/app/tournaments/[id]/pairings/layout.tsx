import { unstable_cacheTag as cacheTag } from 'next/cache';
import Link from 'next/link';

import { loadTournament } from '@/app/actions/tournament';
import { Alert } from '@/app/components/Alert';
import { QRCodeOverlay } from '@/app/components/QRCodeOverlay';
import { InlinePokemonIdCheckForm } from '@/app/tournaments/[id]/pairings/InlinePokemonIdForm';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export enum PageTypes {
  my = 'my',
  all = 'all',
  roster = 'roster',
  standings = 'standings',
}

const pageTypeToTextMappping: Record<
  PageTypes,
  { title: string; slug: string }
> = {
  [PageTypes.my]: { title: 'My Pairings', slug: 'my' },
  [PageTypes.all]: { title: 'Pairings', slug: 'all' },
  [PageTypes.roster]: { title: 'Roster', slug: 'roster' },
  [PageTypes.standings]: { title: 'Standings', slug: 'standings' },
};

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

  const haveStandings = !!tournament?.standings;

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
              <QRCodeOverlay />
            </div>
            <InlinePokemonIdCheckForm />
            <Alert type="warning" message="Tournament not ready yet." />
          </>
        )) || (
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-5">
              {Object.keys(PageTypes)
                .filter(key => haveStandings || key !== PageTypes.standings)
                .map(key => (
                  <Link href={`/tournaments/${id}/pairings/${key}`} key={key}>
                    <Button variant="link" className={cn('text-xl p-0')}>
                      {pageTypeToTextMappping[key as PageTypes].title}
                    </Button>
                  </Link>
                ))}
            </div>
            <QRCodeOverlay />
          </div>
        )}
        {children}
      </div>
    </>
  );
}
