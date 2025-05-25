export function getAllTournamentsCacheKey() {
  return 'all_tournaments';
}

export function getTournamentCacheKey(id: string) {
  return `single_tournament:${id}`;
}

export function getOrganizationTournamentsCacheKey(orgId: string) {
  return `org_tournaments:${orgId}`;
}
