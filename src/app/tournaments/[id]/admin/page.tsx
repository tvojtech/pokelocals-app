import { loadTournament } from '@/app/actions/tournament';
import { FileUpload } from '@/components/FileUpload';
import { OrganizationAvatar } from '@/components/OrganizationAvatar';
import { RestrictedPage } from '@/components/RestrictedPage';

import { PageActions } from './PageActions';

export type TournamentAdminPageProps = {
  params: Promise<{ id: string }>;
};

export default async function TournamentAdminPage({ params }: TournamentAdminPageProps) {
  const { id } = await params;
  const tournament = await loadTournament(id);

  return (
    <RestrictedPage>
      <div className="space-y-6">
        <div className="flex items-center justify-center gap-4">
          <OrganizationAvatar />
          <h1 className="text-2xl font-bold">{tournament?.data.name ?? 'New tournament'}</h1>
        </div>
        <div className="mx-auto flex max-w-lg flex-col items-center justify-center space-y-4">
          <PageActions tournamentId={id} />
          <FileUpload tournamentId={id} />
        </div>
      </div>
    </RestrictedPage>
  );
}
