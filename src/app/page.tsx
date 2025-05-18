import { auth } from '@clerk/nextjs/server';
import { Handshake } from 'lucide-react';
import Link from 'next/link';

import { listTournaments } from '@/actions/tournament';
import { loadOrganization } from '@/actions/tournament/loadOrganization';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { buttonVariants } from '@/components/ui/buttons/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

import { DismissableOrganizerAlert } from './__components/DismissableOrganizerAlert';
import { OrganizationDashboardAlert } from './__components/OrganizationDashboardAlert';

export default async function HomePage() {
  const { userId, orgId } = await auth();

  const tournaments = (await listTournaments({})).filter(tournament => tournament.uploaded);
  const organizationIds = new Set(tournaments.map(tournament => tournament.organizationId));
  const organizations = (await Promise.all(Array.from(organizationIds).map(id => loadOrganization(id)))).reduce(
    (acc, organization) => ({
      ...acc,
      [organization.id]: { name: organization.name, imageUrl: organization.imageUrl },
    }),
    {} as Record<string, { name: string; imageUrl: string }>
  );

  return (
    <div className="mx-auto max-w-4xl space-y-4">
      {userId && !orgId && <DismissableOrganizerAlert />}
      {orgId && <OrganizationDashboardAlert />}
      <Card>
        <CardHeader>
          <CardTitle>Recent tournaments</CardTitle>
        </CardHeader>
        <CardContent>
          {tournaments.length === 0 && <div className="text-center">No tournaments found.</div>}
          {tournaments.length > 0 && (
            <>
              {tournaments.map((tournament, idx) => (
                <div key={tournament.id} className="grid grid-cols-1 gap-0 gap-y-1 p-2 pb-0 md:grid-cols-3">
                  <div className="pl-2">{tournament.name || 'New tournament'}</div>
                  <div className="flex flex-row gap-2 pl-2 text-muted-foreground md:col-start-2">
                    <Avatar className="size-5">
                      <AvatarImage src={organizations[tournament.organizationId]?.imageUrl} />
                    </Avatar>
                    by {organizations[tournament.organizationId]?.name}
                  </div>
                  <div className="flex items-start gap-2 px-2 md:col-start-3 md:justify-end">
                    <Link
                      href={`/tournaments/${tournament.id}/pairings`}
                      prefetch={false}
                      className={cn(buttonVariants({ variant: 'link' }), 'h-[unset] p-0')}>
                      Pairings
                      <Handshake className="h-4 w-4" />
                    </Link>
                  </div>
                  {idx < tournaments.length - 1 && <div className="border-t border-t-gray-200 md:col-span-3" />}
                </div>
              ))}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
