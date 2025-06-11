import { redirect } from 'next/navigation';

export default async function TournamentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return redirect(`/tournaments/${id}/pairings`);
}
