import {
  TournamentPairingsPage,
  TournamentPairingsPageProps,
} from '@/app/tournaments/[id]/pairings/TournamentPairingsPage';

export const dynamic = 'force-dynamic';

export default async function TournamentPairings(
  props: TournamentPairingsPageProps
) {
  return <TournamentPairingsPage {...props} />;
}
