import { auth } from '@clerk/nextjs/server';

import { loadTournament } from '@/actions/tournament';
import { Alert } from '@/components/Alert';
import { FileUpload } from '@/components/FileUpload';
import { OrganizationAvatar } from '@/components/OrganizationAvatar';
import { requireOrganizerFlag } from '@/flags';

import { PageActions } from './PageActions';

export type TournamentAdminPageProps = {
  params: Promise<{ id: string }>;
};

export default async function TournamentAdminPage({ params }: TournamentAdminPageProps) {
  const { id } = await params;
  const { userId, orgId } = await auth();
  const tournamentResult = await loadTournament(id);

  const uploadedBy = tournamentResult?.metadata.uploaded_by;

  if (uploadedBy !== userId && uploadedBy !== orgId) {
    return (
      <div>
        <Alert type="warning" message="You are not allowed to manage this tournament." />
      </div>
    );
  }

  const isOrganizationRequired = await requireOrganizerFlag.run({
    identify: { userId: userId ?? 'anonymous' },
  });

  if (!orgId && isOrganizationRequired) {
    return (
      <div>
        <Alert type="warning" message="You need to be part of an organization to manage tournaments." />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-center gap-4">
        <OrganizationAvatar />
        <h1 className="text-2xl font-bold">{tournamentResult?.tournament.data.name || 'New tournament'}</h1>
      </div>
      <div className="mx-auto flex max-w-lg flex-col items-center justify-center space-y-4">
        <PageActions tournamentId={id} />
        <FileUpload tournamentId={id} />
      </div>
    </div>
  );
}
