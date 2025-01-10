import { redirect } from 'next/navigation';

import { TournamentPairingsPageProps } from '@/app/tournaments/[id]/pairings/TournamentPairingsPage';

export default async function TournamentPairings(
  props: TournamentPairingsPageProps
) {
  const { id } = await props.params;
  redirect(`/tournaments/${id}/pairings/my`);
}
