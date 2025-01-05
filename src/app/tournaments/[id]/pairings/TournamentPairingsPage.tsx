import { SearchParams } from 'next/dist/server/request/search-params';

import { loadTournament } from '@/app/actions/tournament';
import { Alert } from '@/app/components/Alert';
import { QRCodeOverlay } from '@/app/components/QRCodeOverlay';
import { PageTypes, PageTypesEnum } from '@/app/tournaments/[id]/PageTypes';
import { InlinePokemonIdCheckForm } from '@/app/tournaments/[id]/pairings/InlinePokemonIdForm';
import { MyInformation } from '@/app/tournaments/[id]/pairings/MyInformation';
import { Pairings } from '@/app/tournaments/[id]/pairings/Pairings';

export type TournamentPairingsPageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<SearchParams>;
};

export async function TournamentPairingsPage({
  params,
  searchParams,
}: TournamentPairingsPageProps) {
  const { id } = await params;
  const queryParams = await searchParams;
  const what = queryParams.w;

  const selectedPage: PageTypesEnum =
    Object.values(PageTypesEnum).find(
      pt => pt === (Array.isArray(what) ? what[0] : what)
    ) ?? PageTypesEnum['my-pairings'];

  const tournament = await loadTournament(id);

  return (
    <>
      {tournament && (
        <h1 className="text-3xl font-bold text-center">
          {tournament.data.name}
        </h1>
      )}
      <div className="max-w-lg mx-auto mt-8 space-y-10">
        {!tournament ? (
          <>
            <div className="flex justify-end items-center">
              <QRCodeOverlay />
            </div>
            <InlinePokemonIdCheckForm />
            <Alert type="warning" message="Pairings not published yet." />
          </>
        ) : (
          <>
            <PageTypes
              id={id}
              selectedPage={selectedPage}
              searchParams={queryParams}
            />
            {selectedPage === PageTypesEnum.pairings && (
              <Pairings tournament={tournament} />
            )}
            {selectedPage === PageTypesEnum['my-pairings'] && (
              <MyInformation tournament={tournament} />
            )}
            {selectedPage === PageTypesEnum.standings && <></>}
          </>
        )}
      </div>
    </>
  );
}
