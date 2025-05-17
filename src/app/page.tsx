import { auth } from '@clerk/nextjs/server';
import { FileSymlink, Handshake } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import { listTournaments } from '@/actions/tournament';
import { loadOrganization } from '@/actions/tournament/loadOrganization';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button, buttonVariants } from '@/components/ui/buttons/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

import { CreateTournamentButton } from './tournaments/CreateTournamentButton';

export default async function DashboardPage() {
  const { userId, orgId } = await auth();

  const tournaments = await listTournaments({});
  const organizationTournaments = orgId ? await listTournaments({ organizationId: orgId }) : [];
  const organizationIds = new Set(tournaments.map(tournament => tournament.organizationId));
  const organizations = (await Promise.all(Array.from(organizationIds).map(id => loadOrganization(id)))).reduce(
    (acc, organization) => ({ ...acc, [organization.id]: organization.name }),
    {} as Record<string, string>
  );

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      {orgId && (
        <Card>
          <CardHeader>
            <CardTitle className="flex flex-wrap items-center justify-between gap-2">
              Organization tournaments
              {userId && <CreateTournamentButton disabled={!orgId} />}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {organizationTournaments.length === 0 && <div className="text-center">No tournaments found.</div>}
            {organizationTournaments.length > 0 && (
              <div className="grid grid-cols-2 gap-0 gap-y-1">
                {organizationTournaments.map((tournament, idx) => (
                  <React.Fragment key={tournament.id}>
                    <div className="pl-2">{tournament.name || 'New tournament'}</div>
                    <div className="flex items-center justify-end gap-2 pr-2">
                      {orgId === tournament.organizationId && (
                        <Link
                          href={`/tournaments/${tournament.id}/admin`}
                          prefetch={false}
                          className={cn(buttonVariants({ variant: 'link' }), 'h-[unset] p-0')}>
                          Admin page
                          <FileSymlink className="h-4 w-4" />
                        </Link>
                      )}
                    </div>
                    {idx < organizationTournaments.length - 1 && (
                      <div className="col-span-2 border-t border-t-gray-200" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}
      <Card>
        <CardHeader>
          <CardTitle>Tournaments</CardTitle>
        </CardHeader>
        <CardContent>
          {tournaments.length === 0 && <div className="text-center">No tournaments found.</div>}
          {tournaments.length > 0 && (
            <>
              {tournaments.map((tournament, idx) => (
                <div key={tournament.id} className="grid grid-cols-2 gap-0 gap-y-1 md:grid-cols-3">
                  <div className="pl-2">{tournament.name || 'New tournament'}</div>
                  <div className="col-start-1 pl-2 text-muted-foreground md:col-start-2">
                    by {organizations[tournament.organizationId]}
                  </div>
                  <div className="col-start-2 row-start-1 flex items-start justify-end gap-2 pr-2 md:col-start-3">
                    <Link
                      href={`/tournaments/${tournament.id}/pairings`}
                      prefetch={false}
                      className={cn(buttonVariants({ variant: 'link' }), 'h-[unset] p-0')}>
                      Pairings
                      <Handshake className="h-4 w-4" />
                    </Link>
                  </div>
                  {idx < tournaments.length - 1 && (
                    <div className="col-span-2 border-t border-t-gray-200 md:col-span-3" />
                  )}
                </div>
              ))}
            </>
          )}
        </CardContent>
      </Card>
      {userId && !orgId && (
        <Alert variant="info">
          <AlertTitle>Want to organize a tournament?</AlertTitle>
          <AlertDescription>
            <p>You need to be an organizer.</p>
            <p>To become one:</p>
            <ul className="list-disc pl-4">
              <li>
                Please fill in the form in your{' '}
                <Button variant="link" className="p-0" asChild>
                  <Link href="/profile">profile</Link>
                </Button>{' '}
                and we&apos;ll create an organization for you or;
              </li>
              <li>if your LGS already has an organization, please ask your administrator to assign you to it.</li>
            </ul>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
