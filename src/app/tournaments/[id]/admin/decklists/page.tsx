import { auth } from '@clerk/nextjs/server';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { loadTournamentMetadata } from '@/actions/tournament/loadTournamentMetadata';
import { OrganizationAvatar } from '@/components/OrganizationAvatar';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { buttonVariants } from '@/components/ui/buttons/button';
import { cn } from '@/lib/utils';

import { TournamentDecklists } from './TournamentDecklists';

export type TournamentAdminPageProps = {
  params: Promise<{ id: string }>;
};
export default async function DecklistsPage({ params }: TournamentAdminPageProps) {
  const { id } = await params;
  const { orgId } = await auth();
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

  if (!orgId) {
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
      <div className="grid grid-cols-3 gap-4">
        <div>
          <Link
            href={`/tournaments/${id}/admin`}
            className={cn('flex items-center gap-2', buttonVariants({ variant: 'outline' }))}>
            <ArrowLeft />
            Back to admin page
          </Link>
        </div>
        <div className="flex items-center justify-center gap-2">
          <OrganizationAvatar />
          <h1 className="text-2xl font-bold">{tournamentResult.name || 'New tournament'}</h1>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center space-y-4">
        <TournamentDecklists tournamentId={id} />
      </div>
    </div>
  );
}
