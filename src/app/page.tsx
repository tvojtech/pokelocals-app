import { auth } from '@clerk/nextjs/server';
import { FileSymlink } from 'lucide-react';
import Link from 'next/link';

import { listOrganizationTournaments } from '@/actions/tournament';
import { CreateTournamentButton } from '@/app/tournaments/CreateTournamentButton';
import { buttonVariants } from '@/components/ui/buttons/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';

export default async function DashboardPage() {
  const { orgId } = await auth();

  const tournaments = await listOrganizationTournaments();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center justify-between gap-2">
          Tournaments
          {orgId && <CreateTournamentButton />}
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
                <TableCell className={cn(tournament.expiresAt < new Date().toISOString() && 'text-muted-foreground')}>
                  {tournament.name || 'New tournament'}
                </TableCell>
                <TableCell>
                  {tournament.expiresAt > new Date().toISOString() && (
                    <Link
                      href={`/tournaments/${tournament.id}/admin`}
                      prefetch={false}
                      className={cn(buttonVariants({ variant: 'link' }), 'h-[unset] p-0')}>
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
  );
}
