import { auth } from '@clerk/nextjs/server';
import { Handshake } from 'lucide-react';
import Link from 'next/link';

import { listTournaments } from '@/actions/tournament';
import { loadOrganization } from '@/actions/tournament/loadOrganization';
import { buttonVariants } from '@/components/ui/buttons/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

import { DismissableOrganizerAlert } from './__components/DismissableOrganizerAlert';

export default async function HomePage() {
  const { userId, orgId } = await auth();

  const tournaments = await listTournaments({});
  const organizationIds = new Set(tournaments.map(tournament => tournament.organizationId));
  const organizations = (await Promise.all(Array.from(organizationIds).map(id => loadOrganization(id)))).reduce(
    (acc, organization) => ({ ...acc, [organization.id]: organization.name }),
    {} as Record<string, string>
  );

  return (
    <div className="mx-auto max-w-4xl space-y-4">
      {userId && !orgId && <DismissableOrganizerAlert />}
      <Card>
        <CardHeader>
          <CardTitle>Recent tournaments</CardTitle>
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
    </div>
  );
}
