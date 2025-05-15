import { auth } from '@clerk/nextjs/server';
import { FileSymlink } from 'lucide-react';
import Link from 'next/link';

import { listTournaments } from '@/actions/tournament';
import { CreateTournamentButton } from '@/app/tournaments/CreateTournamentButton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { buttonVariants } from '@/components/ui/buttons/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';

export default async function DashboardPage() {
  const { userId, orgId } = await auth();

  const tournaments = await listTournaments();

  return (
    <div className="space-y-4">
      {!orgId && (
        <Alert variant="warning">
          <AlertTitle>To create tournaments, you need to be an organizer.</AlertTitle>
          <AlertDescription>
            {userId
              ? 'To become one, go to user profile page, and request the organizer role.'
              : 'To become one, please sign in, go to profile page, and request the organizer role.'}
          </AlertDescription>
        </Alert>
      )}

      {orgId && (
        <div className="max-w-2xl space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex flex-wrap items-center justify-between gap-2">
                Organization tournaments
                <CreateTournamentButton />
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
                  {tournaments.map(tournament => (
                    <TableRow key={tournament.id}>
                      <TableCell
                        className={cn(tournament.expiresAt < new Date().toISOString() && 'text-muted-foreground')}>
                        {tournament.name || 'New tournament'}
                      </TableCell>
                      <TableCell>
                        {tournament.expiresAt > new Date().toISOString() && (
                          <Link
                            href={`/tournaments/${tournament.id}/admin`}
                            prefetch={false}
                            className={buttonVariants({ variant: 'link', className: 'pl-0' })}>
                            Go to admin page
                            <FileSymlink className="h-4 w-4" />
                          </Link>
                        )}
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
