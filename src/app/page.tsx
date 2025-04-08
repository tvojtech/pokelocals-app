import { auth } from '@clerk/nextjs/server';
import { SquareArrowRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import { listTournaments } from '@/actions/tournament';
import { CreateTournamentButton } from '@/app/tournaments/CreateTournamentButton';
import { Alert } from '@/components/Alert';
import { RestrictedPage } from '@/components/RestrictedPage';
import { buttonVariants } from '@/components/ui/buttons/button';
import { requireOrganizerFlag } from '@/flags';

export default async function DashboardPage() {
  const { userId, orgId } = await auth();

  const isOrganizationRequired = await requireOrganizerFlag.run({
    identify: { userId: userId ?? 'anonymous' },
  });

  const tournaments = await listTournaments();

  const alertTitle = "To create tournaments in the future, you'll need to be an organizer.";
  let alertMessage;
  if (!orgId) {
    if (!userId) {
      alertMessage = 'To become one, please sign in, go to profile page, and request the organizer role.';
    } else {
      alertMessage = 'To become one, go to profile page, and request the organizer role.';
    }
  }

  return (
    <RestrictedPage>
      <div className="space-y-4">
        {!orgId && !isOrganizationRequired && (
          <Alert
            type="warning"
            message={
              <>
                <h2 className="text-lg font-bold">{alertTitle}</h2>
                <p>{alertMessage}</p>
              </>
            }
          />
        )}
        {!orgId && isOrganizationRequired && (
          <Alert
            type="warning"
            message={
              <>
                <h2 className="text-lg font-bold">To create tournaments, you need to be an organizer.</h2>
                <p>To become one, go to user profile page, and request the organizer role.</p>
              </>
            }
          />
        )}

        {((isOrganizationRequired && orgId) || !isOrganizationRequired) && <CreateTournamentButton />}
        {tournaments?.length ? (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">My tournaments</h2>
            <div className="grid grid-cols-[max-content_max-content] gap-2">
              {tournaments.map(tournament => (
                <React.Fragment key={tournament.id}>
                  <div className="flex items-center pl-4">{tournament.data.name || 'New tournament'}</div>
                  <Link
                    href={`/tournaments/${tournament.id}/admin`}
                    prefetch={false}
                    className={buttonVariants({ variant: 'link' })}>
                    <SquareArrowRight />
                    Go to tournament admin page
                  </Link>
                  <div className="col-span-2 border-b border-b-secondary"></div>
                </React.Fragment>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </RestrictedPage>
  );
}
