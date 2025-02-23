import { SquareArrowRight } from 'lucide-react';
import Link from 'next/link';

import { listTournaments } from '@/app/actions/tournament';
import { RestrictedPage } from '@/app/components/RestrictedPage';
import { TournamentsForm } from '@/app/tournaments/TournamentsForm';
import { buttonVariants } from '@/components/ui/button';

export const TournamentsPage: React.FC = async () => {
  const tournaments = await listTournaments();
  return (
    <RestrictedPage>
      <div className="space-y-4">
        <TournamentsForm />
        {tournaments?.length ? (
          <div>
            <h2 className="text-2xl font-bold">My tournaments</h2>
            {tournaments.map(tournament => (
              <div key={tournament.id} className="flex items-center gap-2">
                {tournament.data.name}
                <Link
                  href={`/tournaments/${tournament.id}/admin`}
                  className={buttonVariants({ variant: 'link' })}>
                  <SquareArrowRight />
                  Go to tournament admin page
                </Link>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </RestrictedPage>
  );
};
