import { auth } from '@clerk/nextjs/server';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { findTournamentPlayerDecklist } from '@/actions/decklists';
import { loadTournamentMetadata } from '@/actions/tournament';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/buttons/button';
import { getUserProfile } from '@/features/profile/actions';

import { DecklistEditor } from './DecklistEditor';

export default async function TournamentDecklistPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const [tournamentResult, { userId }, profile] = await Promise.all([
    loadTournamentMetadata(id),
    auth(),
    getUserProfile(),
  ]);

  if (!tournamentResult) {
    return notFound();
  }

  if (!userId) {
    return (
      <Alert variant="warning">
        <AlertDescription>You need to be logged in to be able to submit decklist.</AlertDescription>
      </Alert>
    );
  }

  if (!profile?.pokemonId) {
    return (
      <Alert variant="warning">
        <AlertDescription>
          You need to fill in your player profile to submit decklist.
          <Link href="/profile">
            <Button variant="link">Go to profile</Button>
          </Link>
        </AlertDescription>
      </Alert>
    );
  }

  const decklist = await findTournamentPlayerDecklist(id, userId);

  if (decklist && 'error' in decklist) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{decklist.error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <>
      <h1 className="text-left text-xl font-medium md:text-center">{tournamentResult.name}</h1>
      <DecklistEditor decklist={decklist} tournamentId={id} playerId={userId} playerPokemonId={profile.pokemonId} />
    </>
  );
}
