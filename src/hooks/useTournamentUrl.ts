'use client';

import { useWindowLocation } from '@/app/hooks';

export function useTournamentMyPairingsUrl(tournamentId: string) {
  const location = useWindowLocation();
  if (!location) {
    return null;
  }
  return `${location.origin}/tournaments/${tournamentId}/pairings/my`;
}

export function useTournamentRosterUrl(tournamentId: string) {
  const location = useWindowLocation();
  if (!location) {
    return null;
  }
  return `${location.origin}/tournaments/${tournamentId}/pairings/roster`;
}
