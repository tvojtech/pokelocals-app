import {
  TournamentAdminPage,
  TournamentAdminPageProps,
} from '@/app/tournaments/[id]/admin/TournamentAdminPage';

export default async function TournamentDetail(
  props: TournamentAdminPageProps
) {
  return <TournamentAdminPage {...props} />;
}
