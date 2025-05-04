import { auth } from '@clerk/nextjs/server';
import { notFound } from 'next/navigation';

import { loadTournamentMetadata } from '@/actions/tournament/loadTournamentMetadata';
import { FileUpload } from '@/components/FileUpload';
import { OrganizationAvatar } from '@/components/OrganizationAvatar';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { requireOrganizerFlag } from '@/flags';

import { PageActions } from './PageActions';

export type TournamentAdminPageProps = {
  params: Promise<{ id: string }>;
};

export default async function TournamentAdminPage({ params }: TournamentAdminPageProps) {
  const { id } = await params;
  const { userId, orgId } = await auth();
  const tournamentResult = await loadTournamentMetadata(id);

  if (!tournamentResult) {
    return notFound();
  }

  const uploadedBy = tournamentResult.organizationId;

  if (uploadedBy !== orgId) {
    return (
      <div>
        <Alert variant="warning">
          <AlertDescription>You are not allowed to manage this tournament.</AlertDescription>
        </Alert>
      </div>
    );
  }

  const isOrganizationRequired = await requireOrganizerFlag.run({
    identify: { userId: userId ?? 'anonymous' },
  });

  if (!orgId && isOrganizationRequired) {
    return (
      <div>
        <Alert variant="warning">
          <AlertDescription>You need to be member of an organization to manage tournaments.</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-center gap-4">
        <OrganizationAvatar />
        <h1 className="text-2xl font-bold">{tournamentResult.name || 'New tournament'}</h1>
      </div>
      <div className="mx-auto flex max-w-2xl flex-col items-center justify-center space-y-4">
        <PageActions tournamentId={id} tournamentName={tournamentResult.name} />
        <FileUpload tournamentId={id} />
      </div>
    </div>
  );
}
