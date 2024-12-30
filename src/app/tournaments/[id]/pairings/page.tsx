import {
  TournamentPairingsPage,
  TournamentPairingsPageProps,
} from "@/app/tournaments/[id]/pairings/TournamentPairingsPage";

export default async function TournamentPairings(
  props: TournamentPairingsPageProps
) {
  return <TournamentPairingsPage {...props} />;
}
