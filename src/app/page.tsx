import { auth } from '@clerk/nextjs/server';
import { FileSymlink } from 'lucide-react';
import Link from 'next/link';

import { listTournaments } from '@/actions/tournament';
import { CreateTournamentButton } from '@/app/tournaments/CreateTournamentButton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { buttonVariants } from '@/components/ui/buttons/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { requireOrganizerFlag } from '@/flags';

export default async function DashboardPage() {
  const { userId, orgId } = await auth();

  const isOrganizationRequired = await requireOrganizerFlag.run({
    identify: { userId: userId ?? 'anonymous' },
  });

  const tournaments = await listTournaments();

  const alertTitle = isOrganizationRequired
    ? 'To create tournaments, you need to be an organizer.'
    : "Starting in May, you'll need to be an organizer to create tournaments.";
  let alertMessage;
  if (!orgId) {
    if (!userId) {
      alertMessage = 'To become one, please sign in, go to profile page, and request the organizer role.';
    } else {
      alertMessage = 'To become one, go to profile page, and request the organizer role.';
    }
  }

  return (
    <div className="space-y-4">
      {!orgId && !isOrganizationRequired && (
        <Alert variant="warning">
          <AlertTitle>{alertTitle}</AlertTitle>
          <AlertDescription>{alertMessage}</AlertDescription>
        </Alert>
      )}
      {!orgId && isOrganizationRequired && (
        <Alert variant="warning">
          <AlertTitle>To create tournaments, you need to be an organizer.</AlertTitle>
          <AlertDescription>To become one, go to user profile page, and request the organizer role.</AlertDescription>
        </Alert>
      )}

      {!userId && !isOrganizationRequired && <CreateTournamentButton />}

      {userId && (
        <div className="max-w-2xl space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex flex-wrap items-center justify-between gap-2">
                My tournaments
                {(!isOrganizationRequired || (isOrganizationRequired && orgId)) && <CreateTournamentButton />}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tournaments?.map(tournament => (
                    <TableRow key={tournament.id}>
                      <TableCell>{tournament.data.name || 'New tournament'}</TableCell>
                      <TableCell>
                        <Link
                          href={`/tournaments/${tournament.id}/admin`}
                          prefetch={false}
                          className={buttonVariants({ variant: 'link', className: 'pl-0' })}>
                          Go to admin page
                          <FileSymlink className="h-4 w-4" />
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
