import {
  TournamentDetailPage,
  TournamentDetailPageProps,
} from "@/app/tournaments/[id]/TournamentDetailPage";

export default async function TournamentDetail(
  props: TournamentDetailPageProps
) {
  return <TournamentDetailPage {...props} />;
}
