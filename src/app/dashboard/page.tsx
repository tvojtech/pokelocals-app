import { auth } from '@clerk/nextjs/server';
import { FileSymlink } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';

import { listTournaments } from '@/actions/tournament';
import { buttonVariants } from '@/components/ui/buttons/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

import { CreateTournamentButton } from './CreateTournamentButton';

export default async function DashboardPage() {
  const { userId, orgId } = await auth();

  if (!userId) {
    return redirect('/sign-in');
  }

  if (!orgId) {
    return redirect('/');
  }

  const organizationTournaments = await listTournaments({ organizationId: orgId });

  return (
    <div className="mx-auto max-w-4xl space-y-4">
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
    </div>
  );
}
